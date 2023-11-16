import { useId } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import data from '../json/weapons.json'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export const WeaponryTable = () => {
  const ID = useId()

  const weaponry = data.weapons.map((weapon) => {
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
      <TableRow key={id}>
        <TableCell>
          <Image src={image} alt={name} width={200} height={200} />
        </TableCell>

        <TableCell className="font-medium">
          <Link href={`/weapons/${adjustedWeaponPageName}`}>{name}</Link>
        </TableCell>

        <TableCell>{category}</TableCell>

        <TableCell>{damage}</TableCell>

        <TableCell>{fireRate}</TableCell>

        <TableCell>{capacity}</TableCell>

        <TableCell>
          {firingMode.map((item) => {
            return (
              <span className="flex" key={ID}>
                {item}
              </span>
            )
          })}
        </TableCell>

        <TableCell>{reloadTime}</TableCell>

        <TableCell>{drawSpeed}</TableCell>
      </TableRow>
    )
  })

  return (
    <Table className="max-w-[100rem] mx-auto">
      <TableCaption>Firearms available.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Damage</TableHead>
          <TableHead>Fire rate</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Firing Mode</TableHead>
          <TableHead>Reload Time</TableHead>
          <TableHead>Draw Speed</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>{weaponry}</TableBody>
    </Table>
  )
}
