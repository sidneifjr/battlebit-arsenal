import { ReactNode } from 'react'

interface IGunsmithAttachmentContainer {
  children: ReactNode
}

export const GunsmithAttachmentContainer = ({
  children,
}: IGunsmithAttachmentContainer) => {
  return (
    <div className="min-h-screen flex-1 pt-32 flex flex-col items-center">
      {children}
    </div>
  )
}
