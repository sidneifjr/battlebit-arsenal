import Image from 'next/image'
import Link from 'next/link'

import data from '../json/weapons.json'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MotionWrapper } from './motion-wrapper'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export const WeaponryList = () => {
  const weaponCards = data.weapons.map((weapon) => {
    const {
      id,
      pageName,
      name,
      image,
      category,
      damage,
      fireRate,
      capacity,
      firingMode,
      reloadTime,
      drawSpeed,
    } = weapon

    const adjustedWeaponPageName = pageName.replace(/\s/g, '-').toLowerCase()

    return (
      <Card key={id} className="flex-[25%]">
        <CardHeader className="relative">
          <div className="flex gap-4">
            <Link href={`/weapons/${adjustedWeaponPageName}`}>
              <Image src={image} alt={name} width={200} height={200} />
            </Link>

            <div className="flex flex-col gap-0.5 flex-1">
              <CardTitle>{name}</CardTitle>

              <CardDescription>{category}</CardDescription>

              <CardDescription className="flex">
                {firingMode.join(', ')}
              </CardDescription>

              <div className="flex gap-4">
                <Link
                  className="max-w-fit mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-cyan-500 text-primary-foreground shadow hover:bg-cyan-500/80 h-9 px-4 py-2"
                  href={`/weapons/${adjustedWeaponPageName}`}
                >
                  Customize
                </Link>

                <Button className="max-w-fit mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                  Add to Loadout
                </Button>
              </div>
            </div>
          </div>

          <Separator className="absolute right-0 bottom-0 left-0 bg-white" />
        </CardHeader>

        <CardContent className="pt-4 flex flex-col gap-1">
          <p>
            <strong>Damage:</strong> {damage}
          </p>

          <p>
            <strong>Fire Rate:</strong> {fireRate}
          </p>

          <p>
            <strong>Capacity:</strong> {capacity}
          </p>

          <p>
            <strong>Reload time:</strong> {reloadTime}
          </p>

          <p>
            <strong>Draw speed:</strong> {drawSpeed}
          </p>
        </CardContent>

        {/* <CardFooter className="py-4 relative">
          <Separator className="absolute right-0 top-0 left-0 bg-white" />

          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    )
  })

  return (
    <MotionWrapper
      initial={{ y: '25%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
      exit={{ y: '-25%', opacity: 0 }}
      style={{ width: '100%', margin: '0 auto' }}
    >
      <div className="w-full max-w-[100rem] mx-auto flex gap-4 flex-wrap">
        {weaponCards}
      </div>
    </MotionWrapper>
  )
}
