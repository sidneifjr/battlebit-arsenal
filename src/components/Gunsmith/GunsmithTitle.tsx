import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface GunsmithTitle {
  weaponName: string
}

export const GunsmithTitle = ({ weaponName }: GunsmithTitle) => {
  const router = useRouter()

  return (
    <div className="flex">
      <div className="text-3xl border-b-2 pb-2 flex gap-2 flex-1">
        <Button
          className="mr-2"
          variant={'outline'}
          onClick={() => router.back()}
        >
          {'<'}
        </Button>
        <span>Gunsmith</span> / <strong>{weaponName}</strong>
      </div>
    </div>
  )
}
