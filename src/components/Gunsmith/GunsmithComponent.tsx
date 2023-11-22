'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Gunsmith } from '.'
import { GunsmithStats } from './GunsmithStats'

import attachmentData from '../../json/attachments.json'
import weaponData from '../../json/weapons.json'

interface IGunsmith {
  weaponName: string
}

interface IAttachments {
  optic?: {
    name: string
    statModifier: []
  }

  topSight?: string
  cantedSight?: string
  barrel?: string

  magazine?: {
    name: string
    statModifier: []
  }

  underbarrel?: string

  sideRail?: {
    name: string
    statModifier: []
  }
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
  // Meu erro é aplicar os valores de todos os attachments toda vez que eu seleciono um novo; valores de attachment já aplicados não devem ser aplicados novamente.
  useEffect(() => {
    const updateWeaponStats = () => {
      const { optic, magazine, sideRail } = attachments

      const returnUpdatedWeapon = (attachmentType: IOptic | undefined) => {
        if (attachmentType !== undefined && attachmentType.name !== '-') {
          setWeapon((prevState) => {
            const updatedWeapon = attachmentType.statModifier.reduce(
              (accumulatedWeapon, modifier) => {
                const { stat, modifier: statModifier } = modifier

                // Atualizar a propriedade correspondente da arma com o modificador
                if (accumulatedWeapon[stat] !== undefined) {
                  accumulatedWeapon[stat] += statModifier
                }

                return accumulatedWeapon
              },
              { ...prevState }
            )

            return updatedWeapon
          })
        }
      }

      returnUpdatedWeapon(optic)
      returnUpdatedWeapon(magazine)
      returnUpdatedWeapon(sideRail)
    }

    updateWeaponStats()
  }, [attachments, originalWeapon])

  const handleAttachments = (e: any) => {
    e.preventDefault()

    const attachmentSelected = e.target?.innerText
    const attachmentSlot = e.target?.closest('ul').dataset.slot

    const applyAttachmentToSlot = (attachmentCategory: string) => {
      const string = attachmentData.attachments[attachmentCategory] // bracket notation com 'attachmentCategory' é importante, pois ele é uma variável.

      let attachmentFromJSON = string.find(
        (attachmentsItem) => attachmentsItem.name === attachmentSelected
      )

      if (attachmentFromJSON?.statModifier !== 'none') {
        setAttachments((prevState) => ({
          ...prevState,

          [attachmentCategory]: {
            name: attachmentFromJSON.name,
            statModifier: attachmentFromJSON?.statModifier.map(
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

          // Usar computed property name é necessário, pois attachmentCategory é uma variável.
          [attachmentCategory]: {
            name: attachmentFromJSON.name,
          },
        }))
      }
    }

    switch (attachmentSlot) {
      case 'optic':
        applyAttachmentToSlot('optic')

        break

      case 'topSight':
        applyAttachmentToSlot('topSight')

        break

      case 'cantedSight':
        applyAttachmentToSlot('cantedSight')

        break

      case 'barrel':
        applyAttachmentToSlot('barrel')

        break

      case 'magazine':
        applyAttachmentToSlot('magazine')

        break

      case 'underbarrel':
        applyAttachmentToSlot('underbarrel')

        break

      case 'sideRail':
        applyAttachmentToSlot('sideRail')

        break

      default:
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
