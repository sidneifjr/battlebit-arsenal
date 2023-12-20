'use client'

import Image from 'next/image'

import { useEffect } from 'react'

import { Gunsmith } from '.'

import WeaponData from '../../json/weapons.json'

import { useLoadout } from '@/contexts/loadout-context'

import { Button } from '../ui/button'

interface GunsmithProps {
  weaponName: string
}

interface WeaponInfo {
  id: number
  name: string
  pageName: string
  category: string
  icon: string
  image: string
  rangeData: number[]
  firingMode: string[]
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
  movementSpeed: number
}

export const GunsmithComponent = ({ weaponName }: GunsmithProps) => {
  const {
    weapon,
    setWeapon,
    attachments,
    setAttachments,
    handleAttachments,
    getAttachmentsFromCategory,
    blueprintName,
    setBlueprintName,
    handleBlueprint,
  } = useLoadout()

  const weaponNameWithoutURLParams = weaponName.replace(/%.*/, '') // remove os parâmetros de attachments presentes na URL.

  // A referência deve ser mantida, pois será necessária para resetar aos valores iniciais, após as modificações nos stats provenientes dos attachments.
  const originalWeapon = WeaponData.weapons.find(
    (WeaponDataItem) => WeaponDataItem.pageName === weaponNameWithoutURLParams
  ) as WeaponInfo

  useEffect(() => {
    setWeapon(originalWeapon)
  }, [originalWeapon, setWeapon])

  useEffect(() => {
    if (localStorage.length) {
      // Para evitar que uma blueprint aplique seus anexos em outro armamento além do desejado, ao navegar entre as páginas.
      const lastSavedWeapon = localStorage
        .getItem('blueprintWeapon')
        ?.replace(/['"]+/g, '')

      if (lastSavedWeapon === weaponName) {
        const lastSavedName = localStorage.getItem('blueprintName')
        const lastSavedAttachments = localStorage.getItem(
          'blueprintAttachments'
        )

        setBlueprintName(lastSavedName!)
        setAttachments(JSON.parse(lastSavedAttachments!))
      }
    }
  }, [weaponName, setAttachments, setBlueprintName])

  return (
    <Gunsmith.Root>
      <Gunsmith.Title weaponName={weapon?.name} />

      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
        {blueprintName && (
          <span className="text-4xl capitalize text-cyan-400 pt-12 block">
            {blueprintName}
          </span>
        )}

        <div className="flex-1 pt-12 flex flex-col items-center">
          <div className="flex gap-16">
            <Gunsmith.AttachmentSlot
              value={attachments?.optic}
              slotType="optic"
              attachmentOptions={getAttachmentsFromCategory('optic')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              value={attachments?.topSight}
              slotType="topSight"
              attachmentOptions={getAttachmentsFromCategory('topSight')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              value={attachments?.cantedSight}
              slotType="cantedSight"
              attachmentOptions={getAttachmentsFromCategory('cantedSight')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              value={attachments?.barrel}
              slotType="barrel"
              attachmentOptions={getAttachmentsFromCategory('barrel')}
              onClick={(e: any) => handleAttachments(e)}
            />
          </div>

          <Image
            className="my-4"
            src={weapon?.icon}
            alt={weapon?.name}
            width={480}
            height={170}
            quality={100}
          />

          <div className="flex gap-16">
            <Gunsmith.AttachmentSlot
              value={attachments?.magazine}
              slotType="magazine"
              attachmentOptions={getAttachmentsFromCategory('magazine')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              value={attachments?.underbarrel}
              slotType="underbarrel"
              attachmentOptions={getAttachmentsFromCategory('underbarrel')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              value={attachments?.sideRail}
              slotType="sideRail"
              attachmentOptions={getAttachmentsFromCategory('sideRail')}
              onClick={(e: any) => handleAttachments(e)}
            />
          </div>
        </div>

        <form
          onSubmit={(el) => handleBlueprint(el)}
          className="pt-16 flex gap-4"
        >
          <input
            name="blueprint"
            type="text"
            placeholder="Your blueprint alias..."
            className="w-full font-normal text-black pl-4"
          />

          <Button className="rounded-xl">Save blueprint</Button>
        </form>

        {weapon ? <Gunsmith.Stats stats={weapon} /> : ''}

        {weapon?.rangeData && (
          <Gunsmith.RangeGraph rangeData={weapon?.rangeData} />
        )}
      </div>
    </Gunsmith.Root>
  )
}
