import { useState } from 'react'
import { MotionWrapper } from '../motion-wrapper'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface Option {
  id: string
  name: string
}

interface Attachment {
  id: string
  name: string
}

interface GunsmithAttachmentSlot {
  slotType: string
  selectedAttachment: () => string
  attachmentOptions: Attachment[]
  onClick: (e: any) => void
}

export const GunsmithAttachmentSlot = ({
  slotType,
  selectedAttachment,
  attachmentOptions,
  onClick,
}: GunsmithAttachmentSlot) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  const handleDropdown = () => {
    setIsDropdownActive((prev) => !prev)
  }

  const validateSelectedAttachmentValue = () => {
    return selectedAttachment ? selectedAttachment() !== '-' : ''
  }

  return (
    <div
      className="min-w-[9rem] relative flex gap-2 cursor-pointer"
      onClick={handleDropdown}
    >
      <span
        className={`w-12 h-12 border-2 rounded-xl transition ${
          validateSelectedAttachmentValue()
            ? 'bg-cyan-500 border-cyan-500'
            : 'border-white'
        }`}
      ></span>

      <div className="rounded-full flex flex-col flex-1">
        <strong className="min-w-[144px] h-[24px]">
          {selectedAttachment ? selectedAttachment() : '-'}
        </strong>

        <small className="capitalize">{slotType}</small>
      </div>

      {isDropdownActive ? (
        <MotionWrapper
          initial={{ y: '25%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
          exit={{ y: '-25%', opacity: 0 }}
          style={{
            width: '100%',
            position: 'absolute',
            top: '100%',
            zIndex: 10,
          }}
        >
          <Select data-slot={slotType} onValueChange={(e) => onClick(e)}>
            <SelectTrigger className="w-[200px] rounded-xl border-white">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>

            <SelectContent>
              {attachmentOptions.map((option: Option) => {
                return (
                  <SelectItem key={option.id} value={option.name}>
                    {option.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </MotionWrapper>
      ) : (
        ''
      )}
    </div>
  )
}
