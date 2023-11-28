import { ReactNode } from 'react'

interface GunsmithAttachmentContainer {
  children: ReactNode
}

export const GunsmithAttachmentContainer = ({
  children,
}: GunsmithAttachmentContainer) => {
  return (
    <div className="flex-1 pt-32 flex flex-col items-center">{children}</div>
  )
}
