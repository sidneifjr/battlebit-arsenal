import { ReactNode } from 'react'

interface GunsmithRoot {
  children: ReactNode
}

export const GunsmithRoot = ({ children }: GunsmithRoot) => {
  return (
    <section className="min-h-screen max-w-full p-4 flex flex-col flex-1">
      {children}
    </section>
  )
}
