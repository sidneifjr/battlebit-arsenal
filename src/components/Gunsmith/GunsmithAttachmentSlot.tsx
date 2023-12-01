import Link from 'next/link'
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
  attachmentOptions: Attachment[]
  onClick: (e: string) => void
}

export const GunsmithAttachmentSlot = ({
  slotType,
  attachmentOptions,
  onClick,
}: GunsmithAttachmentSlot) => {
  return (
    <div className="rounded-full flex flex-col flex-1">
      <small className="capitalize mb-2">{slotType}</small>

      <Select data-slot={slotType} onValueChange={(e) => onClick(e)}>
        <SelectTrigger className="w-44 rounded-xl border-white">
          <SelectValue className="capitalize" placeholder={'-'} />
        </SelectTrigger>

        <SelectContent>
          {attachmentOptions.map((option: Option) => {
            return (
              <SelectItem key={option.id} value={option.name}>
                <Link href={`&optic=${option.name}`}>{option.name}</Link>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
