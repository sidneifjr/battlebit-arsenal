import { ReactNode } from 'react'

interface IGunsmithContainer {
  children: ReactNode
}

export const GunsmithContainer = ({ children }: IGunsmithContainer) => {
  return (
    <section className="max-w-full p-4 flex flex-col flex-1">
      {children}
    </section>
  )
}
