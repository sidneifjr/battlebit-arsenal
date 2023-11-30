'use client'

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { useState } from 'react'
import { Separator } from './ui/separator'

interface WeaponInfo {
  id: number
  name: string
  pageName: string
  category: string
  icon: string
  image: string
  damage: number
  lightArmorDamage: number
  heavyArmorDamage: number
  verticalRecoil: number
  horizontalRecoil: number
  firstShotKick: number
  velocity: number
  accuracy: number
  soundSpread: number
  muzzleFlashScale: number
  control: number
  aimDownTime: number
  movementSpeed: number
  capacity: number
  firingMode: string[]
  fireRate: number
  reloadTime: number
  drawSpeed: number
  rangeData?: number[]
  boltActionSpeed?: number
  map(
    arg0: (weapon: any) => import('react').JSX.Element
  ): import('react').ReactNode
  toSorted(compareByName: (a: any, b: any) => any): WeaponInfo
}

export const WeaponryList = () => {
  const [weapons, setWeapons] = useState<WeaponInfo>(data.weapons)

  const handleSelect = (value: string) => {
    switch (value) {
      case 'Alphabetical': {
        const compareByName = (a: any, b: any) => {
          return a.name.localeCompare(b.name)
        }

        setWeapons((prev) => prev.toSorted(compareByName))
        break
      }

      case 'Damage': {
        const compareByDamage = (a: any, b: any) => {
          return b.damage - a.damage // ordem crescente
          // return a.damage - b.damage // ordem decrescente
        }

        setWeapons((prev) => prev.toSorted(compareByDamage))
        break
      }

      case 'Fire Rate': {
        const compareByFireRate = (a: any, b: any) => {
          return b.fireRate - a.fireRate
        }

        setWeapons((prev) => prev.toSorted(compareByFireRate))
        break
      }

      case 'Capacity': {
        const compareByCapacity = (a: any, b: any) => {
          return b.capacity - a.capacity
        }

        setWeapons((prev) => prev.toSorted(compareByCapacity))
        break
      }

      case 'Reload Time': {
        const compareByReloadTime = (a: any, b: any) => {
          return a.reloadTime - b.reloadTime
        }

        setWeapons((prev) => prev.toSorted(compareByReloadTime))
        break
      }

      default: {
        return
      }
    }
  }

  return (
    <MotionWrapper
      initial={{ y: '25%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
      exit={{ y: '-25%', opacity: 0 }}
      style={{ width: '100%', margin: '0 auto' }}
    >
      <div className="w-full max-w-[100rem] mx-auto mb-4 flex justify-end">
        <Select onValueChange={(e) => handleSelect(e)}>
          <SelectTrigger className="w-[200px] rounded-xl border-white">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Alphabetical">Alphabetical</SelectItem>
            <SelectItem value="Damage">Damage</SelectItem>
            <SelectItem value="Fire Rate">Fire Rate</SelectItem>
            <SelectItem value="Capacity">Capacity</SelectItem>
            <SelectItem value="Reload Time">Reload Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full max-w-[100rem] mx-auto flex gap-4 flex-wrap">
        {weapons.map((weapon) => {
          const {
            id,
            name,
            pageName,
            icon,
            image,
            category,
            firingMode,
            rangeData,
            ...rest
          } = weapon

          const getKeyValuePairsFromStats = Object.entries(rest)

          return (
            <Card key={weapon.id} className="flex-[calc(33.33%-1rem)]">
              <CardHeader className="relative">
                <div className="flex gap-4">
                  <Link
                    href={`/weapons/${weapon.pageName
                      .replace(/\s/g, '-')
                      .toLowerCase()}`}
                  >
                    <Image
                      src={weapon.icon}
                      alt={weapon.name}
                      width={200}
                      height={100}
                      quality={100}
                    />
                  </Link>

                  <div className="flex flex-col gap-0.5 flex-1">
                    <CardTitle>{weapon.name}</CardTitle>

                    <CardDescription>{weapon.category}</CardDescription>

                    <CardDescription className="flex">
                      {weapon.firingMode.join(', ')}
                    </CardDescription>

                    <div className="flex gap-4">
                      <Link
                        className="max-w-fit mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-cyan-500 text-primary-foreground shadow hover:bg-cyan-500/80 h-9 px-4 py-2"
                        href={`/weapons/${weapon.pageName
                          .replace(/\s/g, '-')
                          .toLowerCase()}`}
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

              {/* Como disponho os parágrafos, de forma a ficarem como antes? Talvez CSS Grid Layout resolva. */}
              <CardContent className="pt-4 flex gap-2 justify-between">
                <div className="flex flex-wrap justify-center gap-1">
                  {getKeyValuePairsFromStats.map(([key, value]) => {
                    return (
                      <p key={key} className="text-sm">
                        <strong className="capitalize">{key}:</strong> {value}
                      </p>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </MotionWrapper>
  )
}
