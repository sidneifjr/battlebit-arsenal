'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IGunsmith {
  weaponName: string
}

interface IOptic {
  name: string
  statModifier: []
}

interface ISideRail {
  name: string
  statModifier: []
}

interface IMagazine {
  name: string
  statModifier: []
}

interface IAttachments {
  optic?: IOptic
  topSight?: string
  cantedSight?: string
  barrel?: string
  magazine?: IMagazine
  underbarrel?: string
  sideRail?: ISideRail
}

interface IWeaponInfo {
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
}

import attachmentData from '../../json/attachments.json'
import weaponData from '../../json/weapons.json'

import { Gunsmith } from '.'
import { GunsmithStats } from './GunsmithStats'

export const GunsmithComponent = ({ weaponName }: IGunsmith) => {
  const gun = weaponData.weapons.find(
    (weaponDataItem) => weaponDataItem.pageName === weaponName
  )

  const [originalWeapon, setOriginalWeapon] = useState<IWeaponInfo>(gun!) // Este estado deve ser mantido como referência para os cálculos; sendo o valor original, não deve ser alterado.
  const [weapon, setWeapon] = useState<IWeaponInfo>(gun!) // Este é para exibir o valor alterado e atualizado em tela.

  const [attachments, setAttachments] = useState<IAttachments>({
    optic: {
      name: '-',
      statModifier: [],
    },
    topSight: '-',
    cantedSight: '-',
    barrel: '-',
    magazine: {
      name: '-',
      statModifier: [],
    },
    underbarrel: '-',
    sideRail: {
      name: '-',
      statModifier: [],
    },
  })

  const {
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
  } = weapon

  // Toda vez que os attachments forem alterados, os valores da arma serão recalculados para exibir o novo valor em tela.
  useEffect(() => {
    const applyModifiers = (originalValues: IWeaponInfo, modifiers: any[]) => {
      if (modifiers !== undefined) {
        return modifiers.reduce(
          (
            modifiedValues: { [x: string]: any },
            modifier: { stat: any; modifier: any }
          ) => {
            const { stat, modifier: statModifier } = modifier

            modifiedValues[stat] += statModifier
            return modifiedValues
          },
          { ...originalValues }
        )
      } else {
        return originalValues
      }
    }

    const updateWeaponStats = () => {
      const { optic, magazine, sideRail } = attachments

      if (optic !== undefined && optic.name !== '-') {
        const updatedWeapon = applyModifiers(originalWeapon, optic.statModifier)

        setWeapon(updatedWeapon)
      }

      if (magazine !== undefined && magazine.name !== '-') {
        const updatedWeapon = applyModifiers(
          originalWeapon,
          magazine.statModifier
        )

        setWeapon(updatedWeapon)
      }

      if (sideRail !== undefined && sideRail.name !== '-') {
        const updatedWeapon = applyModifiers(
          originalWeapon,
          sideRail.statModifier
        )

        setWeapon(updatedWeapon)
      }
    }

    updateWeaponStats()
  }, [attachments, originalWeapon])

  const handleAttachments = (e: any) => {
    e.preventDefault()

    const attachmentSelected = e.target?.innerText
    const attachmentSlot = e.target?.closest('ul').dataset.slot

    switch (attachmentSlot) {
      case 'optic':
        let opticAttachmentFromJSON = attachmentData.attachments.optic.find(
          (attachmentsItem) => attachmentsItem.name === attachmentSelected
        )

        if (opticAttachmentFromJSON?.statModifier !== 'none') {
          setAttachments((prevState) => ({
            ...prevState,

            optic: {
              name: opticAttachmentFromJSON!.name,
              statModifier: opticAttachmentFromJSON?.statModifier.map(
                (item: { stat: any; modifier: any }) => ({
                  stat: item.stat,
                  modifier: item.modifier,
                })
              ),
            },
          }))
        } else {
          setAttachments((prevState) => ({
            ...prevState,

            optic: {
              name: opticAttachmentFromJSON!.name,
            },
          }))
        }

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

        if (magazineAttachmentFromJSON?.statModifier !== 'none') {
          setAttachments((prevState) => ({
            ...prevState,

            magazine: {
              name: magazineAttachmentFromJSON!.name,
              statModifier: magazineAttachmentFromJSON?.statModifier.map(
                (item: { stat: any; modifier: any }) => ({
                  stat: item.stat,
                  modifier: item.modifier,
                })
              ),
            },
          }))
        } else {
          setAttachments((prevState) => ({
            ...prevState,

            magazine: {
              name: magazineAttachmentFromJSON!.name,
            },
          }))
        }

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

        if (sideRailAttachmentFromJSON?.statModifier !== 'none') {
          setAttachments((prevState) => ({
            ...prevState,

            sideRail: {
              name: sideRailAttachmentFromJSON!.name,
              statModifier: sideRailAttachmentFromJSON?.statModifier.map(
                (item: { stat: any; modifier: any }) => ({
                  stat: item.stat,
                  modifier: item.modifier,
                })
              ),
            },
          }))
        } else {
          setAttachments((prevState) => ({
            ...prevState,

            sideRail: {
              name: sideRailAttachmentFromJSON!.name,
            },
          }))
        }

        break
    }
  }

  return (
    <Gunsmith.Root>
      <Gunsmith.Title weaponName={weapon.name} />

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
              selectedAttachment={() => attachments.optic!.name}
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
              selectedAttachment={() => attachments.sideRail!.name}
              onClick={(e: any) => handleAttachments(e)}
              attachmentOptions={attachmentData.attachments.sideRail}
            />
          </div>
        </Gunsmith.AttachmentContainer>
      </div>
    </Gunsmith.Root>
  )
}
