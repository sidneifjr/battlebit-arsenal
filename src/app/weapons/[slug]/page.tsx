import { Gunsmith } from '@/components/Gunsmith/gunsmith'
import { Metadata } from 'next'

interface WeaponProps {
  params: {
    slug: string
    searchParams: {}
  }
}

export const metadata: Metadata = {
  title: 'Gunsmith',
}

export default function GunsmithPage({ params }: Readonly<WeaponProps>) {
  return <Gunsmith weaponName={params.slug} />
}
