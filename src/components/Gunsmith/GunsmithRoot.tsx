import { ReactNode } from 'react'

interface IGunsmithRoot {
  children: ReactNode
}

export const GunsmithRoot = ({ children }: IGunsmithRoot) => {
  return (
    <section className="min-h-screen max-w-full p-4 flex flex-col flex-1">
      {children}
    </section>
  )
}
