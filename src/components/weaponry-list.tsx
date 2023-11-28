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
  pageName: string
  name: string
  icon: string
  category: string
  damage: number
  lightArmorDamage: number
  heavyArmorDamage: number
  capacity: number
  fireRate: number
  reloadTime: number
  drawSpeed: number
  verticalRecoil: number
  horizontalRecoil: number
  firstShotKick: number
  velocity: number
  accuracy: number
  soundSpread: number
  muzzleFlashScale: number
  control: number
  aimDownTime: number
  runningSpeed: number
  boltActionSpeed?: number
}

export const WeaponryList = () => {
  const [weapons, setWeapons] = useState(data.weapons)

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

  const weaponCards = weapons.map((weapon) => {
    const {
      id,
      pageName,
      name,
      icon,
      category,
      damage,
      fireRate,
      capacity,
      firingMode,
      reloadTime,
      verticalRecoil,
      horizontalRecoil,
      firstShotKick,
      velocity,
      accuracy,
      soundSpread,
      muzzleFlashScale,
      control,
      aimDownTime,
      runningSpeed,
    } = weapon

    const adjustedWeaponPageName = pageName.replace(/\s/g, '-').toLowerCase()

    return (
      <Card key={id} className="flex-[25%]">
        <CardHeader className="relative">
          <div className="flex gap-4">
            <Link href={`/weapons/${adjustedWeaponPageName}`}>
              <Image
                src={icon}
                alt={name}
                width={200}
                height={100}
                quality={100}
              />
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

        <CardContent className="pt-4 flex gap-2 justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              <strong>Damage:</strong> {damage}
            </p>

            <p className="text-sm">
              <strong>Fire Rate:</strong> {fireRate}
            </p>

            <p className="text-sm">
              <strong>Vertical recoil:</strong> {verticalRecoil}
            </p>

            <p className="text-sm">
              <strong>Horizontal recoil:</strong> {horizontalRecoil}
            </p>

            <p className="text-sm">
              <strong>First shot kick:</strong> {firstShotKick}
            </p>

            <p className="text-sm">
              <strong>Capacity:</strong> {capacity}
            </p>

            <p className="text-sm">
              <strong>Reload time:</strong> {reloadTime}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm">
              <strong>Velocity:</strong> {velocity}
            </p>

            <p className="text-sm">
              <strong>Accuracy:</strong> {accuracy}
            </p>

            <p className="text-sm">
              <strong>Sound Spread:</strong> {soundSpread}
            </p>

            <p className="text-sm">
              <strong>Muzzle flash scale:</strong> {muzzleFlashScale}
            </p>

            <p className="text-sm">
              <strong>Control:</strong> {control}
            </p>

            <p className="text-sm">
              <strong>Aim down time:</strong> {aimDownTime}
            </p>

            <p className="text-sm">
              <strong>Running speed:</strong> {runningSpeed}
            </p>
          </div>
        </CardContent>
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
        {weaponCards}
      </div>
    </MotionWrapper>
  )
}
