'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Gunsmith } from '.'
import { GunsmithStats } from './GunsmithStats'

import attachmentData from '../../json/attachments.json'
import weaponData from '../../json/weapons.json'

interface GunsmithProps {
  weaponName: string
}

interface AttachmentsItem {
  name: string
  statModifier: []
}

interface Attachments {
  optic?: AttachmentsItem
  topSight?: AttachmentsItem
  cantedSight?: AttachmentsItem
  barrel?: AttachmentsItem
  magazine?: AttachmentsItem
  underbarrel?: AttachmentsItem
  sideRail?: AttachmentsItem
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
  runningSpeed: number
}

export const GunsmithComponent = ({ weaponName }: GunsmithProps) => {
  // Não deve ser alterado, pois é necessário para resetar os valores iniciais após as modificações nos stats provenientes dos attachments.
  const originalWeapon = weaponData.weapons.find(
    (weaponDataItem) => weaponDataItem.pageName === weaponName
  ) as WeaponInfo

  const [weapon, setWeapon] = useState(originalWeapon)

  const [attachments, setAttachments] = useState<Attachments>({
    optic: {
      name: '-',
      statModifier: [],
    },
    topSight: {
      name: '-',
      statModifier: [],
    },
    cantedSight: {
      name: '-',
      statModifier: [],
    },
    barrel: {
      name: '-',
      statModifier: [],
    },
    magazine: {
      name: '-',
      statModifier: [],
    },
    underbarrel: {
      name: '-',
      statModifier: [],
    },
    sideRail: {
      name: '-',
      statModifier: [],
    },
  })

  const getAttachmentsFromCategory = (category: string) => {
    return attachmentData.attachments.filter(
      (item) => item.category === category
    )
  }

  const handleAttachments = (e: any) => {
    const myAttachment = attachmentData.attachments.find(
      (item) => item.name === e
    )

    setAttachments((prev) => ({
      ...prev,
      [myAttachment!.category]: myAttachment,
    }))

    setWeapon((prev) => {
      const updatedWeapon = { ...prev }

      const attachmentStatModifiers = myAttachment?.statModifier

      if (attachmentStatModifiers !== 'none') {
        attachmentStatModifiers?.forEach(
          (item: { stat: string; modifier: number }) => {
            const attachmentStat = item.stat
            const attachmentModifier = item.modifier

            updatedWeapon[attachmentStat] += attachmentModifier // soma o valor atual de uma estatística específica, com um dos modificadores provenientes do acessório selecionado.
          }
        )
      }

      return updatedWeapon
    })
  }

  return (
    <Gunsmith.Root>
      <Gunsmith.Title weaponName={weapon.name} />

      <div className="flex">
        <GunsmithStats stats={weapon} />

        <Gunsmith.AttachmentContainer>
          <div className="flex gap-16">
            <Gunsmith.AttachmentSlot
              slotType="optic"
              selectedAttachment={() => attachments.optic!.name}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={getAttachmentsFromCategory('optic')}
            />

            <Gunsmith.AttachmentSlot
              slotType="topSight"
              selectedAttachment={() => attachments.topSight!.name}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={getAttachmentsFromCategory('topSight')}
            />

            <Gunsmith.AttachmentSlot
              slotType="cantedSight"
              selectedAttachment={() => attachments.cantedSight!.name}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={getAttachmentsFromCategory('cantedSight')}
            />

            <Gunsmith.AttachmentSlot
              slotType="barrel"
              selectedAttachment={() => attachments.barrel!.name}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={getAttachmentsFromCategory('barrel')}
            />
          </div>

          <Image
            className="my-4"
            src={weapon.icon}
            alt={weapon.name}
            width={480}
            height={170}
            quality={100}
          />

          <div className="flex gap-16">
            <Gunsmith.AttachmentSlot
              slotType="magazine"
              selectedAttachment={() => attachments.magazine!.name}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={getAttachmentsFromCategory('magazine')}
            />

            <Gunsmith.AttachmentSlot
              slotType="underbarrel"
              selectedAttachment={() => attachments.underbarrel!.name}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={getAttachmentsFromCategory('underbarrel')}
            />

            <Gunsmith.AttachmentSlot
              slotType="sideRail"
              selectedAttachment={() => attachments.sideRail!.name}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={getAttachmentsFromCategory('sideRail')}
            />
          </div>
        </Gunsmith.AttachmentContainer>
      </div>

      {weapon.rangeData && <Gunsmith.RangeGraph rangeData={weapon.rangeData} />}
    </Gunsmith.Root>
  )
}
