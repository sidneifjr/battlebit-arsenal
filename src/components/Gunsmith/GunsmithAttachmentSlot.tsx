import { useState } from 'react'

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
        className={`w-12 h-12 border-2 border-white transition ${
          validateSelectedAttachmentValue() ? 'bg-lime-400 border-lime-400' : ''
        }`}
      ></span>

      <div className="flex flex-col flex-1">
        <strong className="min-w-[144px] h-[24px]">
          {selectedAttachment ? selectedAttachment() : '-'}
        </strong>

        <small className="capitalize">{slotType}</small>
      </div>

      {isDropdownActive ? (
        <ul
          className="bg-black w-full border-2 py-1 px-2 absolute top-[100%]"
          data-slot={slotType}
        >
          {attachmentOptions.map((option: IOption) => {
            return (
              <li key={option.id}>
                <a className="py-1 block" href="#" onClick={onClick}>
                  {option.name}
                </a>
              </li>
            )
          })}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}
