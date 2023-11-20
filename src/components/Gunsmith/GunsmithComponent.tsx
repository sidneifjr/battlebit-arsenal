'use client'

import Image from 'next/image'
import { useState } from 'react'

interface IGunsmith {
  weaponName: string
}

interface IAttachments {
  optic?: string
  topSight?: string
  cantedSight?: string
  barrel?: string
  magazine?: string
  underbarrel?: string
  sideRail?: string
}

import attachmentData from '../../json/attachments.json'
import weaponData from '../../json/weapons.json'

import { Gunsmith } from '.'
import { GunsmithStats } from './GunsmithStats'

export const GunsmithComponent = ({ weaponName }: IGunsmith) => {
  const [attachments, setAttachments] = useState<IAttachments>({
    optic: '-',
    topSight: '-',
    cantedSight: '-',
    barrel: '-',
    magazine: '-',
    underbarrel: '-',
    sideRail: '-',
  })

  const getWeapon = () => {
    return weaponData.weapons.find(
      (weaponDataItem) => weaponDataItem.pageName === weaponName
    )
  }

  // @ts-expect-error
  // prettier-ignore
  const {damage, lightArmorDamage, heavyArmorDamage, fireRate, reloadTime, verticalRecoil, horizontalRecoil, firstShotKick, velocity, accuracy, soundSpread, muzzleFlashScale, control, aimDownTime, runningSpeed, capacity, drawSpeed} = getWeapon()

  const handleAttachments = (e: any) => {
    e.preventDefault()

    const attachmentSelected = e.target?.innerText
    const attachmentSlot = e.target?.closest('ul').dataset.slot

    switch (attachmentSlot) {
      case 'optic':
        let opticAttachmentFromJSON = attachmentData.attachments.optic.find(
          (attachmentsItem) => attachmentsItem.name === attachmentSelected
        )

        setAttachments((prevState) => ({
          ...prevState,
          optic: opticAttachmentFromJSON!.name,
        }))

        break

      case 'topSight':
        let topSightAttachmentFromJSON =
          attachmentData.attachments.topSight.find(
            (attachmentsItem) => attachmentsItem.name === attachmentSelected
          )

        setAttachments((prevState) => ({
          ...prevState,
          topSight: topSightAttachmentFromJSON!.name,
        }))

        break

      case 'cantedSight':
        let cantedSightAttachmentFromJSON =
          attachmentData.attachments.cantedSight.find(
            (attachmentsItem) => attachmentsItem.name === attachmentSelected
          )

        setAttachments((prevState) => ({
          ...prevState,
          cantedSight: cantedSightAttachmentFromJSON!.name,
        }))

        break

      case 'barrel':
        let barrelAttachmentFromJSON = attachmentData.attachments.barrel.find(
          (attachmentsItem) => attachmentsItem.name === attachmentSelected
        )

        setAttachments((prevState) => ({
          ...prevState,
          barrel: barrelAttachmentFromJSON!.name,
        }))

        break

      case 'magazine':
        let magazineAttachmentFromJSON =
          attachmentData.attachments.magazine.find(
            (attachmentsItem) => attachmentsItem.name === attachmentSelected
          )

        setAttachments((prevState) => ({
          ...prevState,
          magazine: magazineAttachmentFromJSON!.name,
        }))

        break

      case 'underbarrel':
        let underbarrelAttachmentFromJSON =
          attachmentData.attachments.underbarrel.find(
            (attachmentsItem) => attachmentsItem.name === attachmentSelected
          )

        setAttachments((prevState) => ({
          ...prevState,
          underbarrel: underbarrelAttachmentFromJSON!.name,
        }))

        break

      case 'sideRail':
        let sideRailAttachmentFromJSON =
          attachmentData.attachments.sideRail.find(
            (attachmentsItem) => attachmentsItem.name === attachmentSelected
          )

        setAttachments((prevState) => ({
          ...prevState,
          sideRail: sideRailAttachmentFromJSON!.name,
        }))

        break
    }
  }

  return (
    <Gunsmith.Root>
      <Gunsmith.Title weaponName={getWeapon()!.name} />

      <div className="flex">
        <GunsmithStats
          stats={{
            damage,
            lightArmorDamage,
            heavyArmorDamage,
            fireRate,
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
            capacity,
            drawSpeed,
          }}
        />

        <Gunsmith.AttachmentContainer>
          <div className="flex gap-16">
            <Gunsmith.AttachmentSlot
              slotType="optic"
              selectedAttachment={() => attachments.optic!}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={attachmentData.attachments.optic}
            />

            <Gunsmith.AttachmentSlot
              slotType="topSight"
              selectedAttachment={() => attachments.topSight!}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={attachmentData.attachments.topSight}
            />

            <Gunsmith.AttachmentSlot
              slotType="cantedSight"
              selectedAttachment={() => attachments.cantedSight!}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={attachmentData.attachments.cantedSight}
            />

            <Gunsmith.AttachmentSlot
              slotType="barrel"
              selectedAttachment={() => attachments.barrel!}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={attachmentData.attachments.barrel}
            />
          </div>

          <Image
            className="my-4"
            src={getWeapon()!.icon}
            alt={getWeapon()!.name}
            width={480}
            height={170}
            quality={100}
          />

          <div className="flex gap-16">
            <Gunsmith.AttachmentSlot
              slotType="magazine"
              selectedAttachment={() => attachments.magazine!}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={attachmentData.attachments.magazine}
            />

            <Gunsmith.AttachmentSlot
              slotType="underbarrel"
              selectedAttachment={() => attachments.underbarrel!}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={attachmentData.attachments.underbarrel}
            />

            <Gunsmith.AttachmentSlot
              slotType="sideRail"
              selectedAttachment={() => attachments.sideRail!}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={attachmentData.attachments.sideRail}
            />
          </div>
        </Gunsmith.AttachmentContainer>
      </div>
    </Gunsmith.Root>
  )
}
