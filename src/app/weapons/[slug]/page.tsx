import { GunsmithComponent } from '@/components/Gunsmith/Gunsmith'

interface WeaponProps {
  params: {
    slug: string
    searchParams: {}
  }
}

export async function generateMetadata({ params }: WeaponProps) {
  return {
    title: `${params.slug} | Gunsmith`,
  }
}

export default function GunsmithPage({ params }: Readonly<WeaponProps>) {
  return <GunsmithComponent weaponName={params.slug} />
}
