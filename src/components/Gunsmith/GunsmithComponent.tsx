'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Gunsmith } from '.'

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
  movementSpeed: number
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
        <Gunsmith.Stats stats={weapon} />

        <Gunsmith.AttachmentContainer>
          <div className="flex gap-16">
            <Gunsmith.AttachmentSlot
              slotType="optic"
              attachmentOptions={getAttachmentsFromCategory('optic')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              slotType="topSight"
              attachmentOptions={getAttachmentsFromCategory('topSight')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              slotType="cantedSight"
              attachmentOptions={getAttachmentsFromCategory('cantedSight')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              slotType="barrel"
              attachmentOptions={getAttachmentsFromCategory('barrel')}
              onClick={(e: any) => handleAttachments(e)}
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
              attachmentOptions={getAttachmentsFromCategory('magazine')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              slotType="underbarrel"
              attachmentOptions={getAttachmentsFromCategory('underbarrel')}
              onClick={(e: any) => handleAttachments(e)}
            />

            <Gunsmith.AttachmentSlot
              slotType="sideRail"
              attachmentOptions={getAttachmentsFromCategory('sideRail')}
              onClick={(e: any) => handleAttachments(e)}
            />
          </div>
        </Gunsmith.AttachmentContainer>
      </div>

      {weapon.rangeData && <Gunsmith.RangeGraph rangeData={weapon.rangeData} />}
    </Gunsmith.Root>
  )
}
