import { useState } from 'react'
import { MotionWrapper } from '../motion-wrapper'

interface IOption {
  id: string
  name: string
}

interface IAttachment {
  id: string
  name: string
}

interface IGunsmithAttachmentSlot {
  slotType: string
  selectedAttachment: () => string
  attachmentOptions: IAttachment[]
  onClick: (e: any) => void
}

export const GunsmithAttachmentSlot = ({
  slotType,
  selectedAttachment,
  attachmentOptions,
  onClick,
}: IGunsmithAttachmentSlot) => {
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
          style={{ width: '100%', position: 'absolute', bottom: 0, zIndex: 10 }}
        >
          <ul
            className="w-full bg-black rounded-xl border-2 absolute top-[100%]"
            data-slot={slotType}
          >
            {attachmentOptions.map((option: IOption) => {
              return (
                <li
                  key={option.id}
                  className="block hover:bg-white hover:text-black transition"
                >
                  <a className="py-1 px-2 block" href="#" onClick={onClick}>
                    {option.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </MotionWrapper>
      ) : (
        ''
      )}
    </div>
  )
}
