/*
  Ao implementar Composition Pattern:
  
  1) Criar a pasta 'Gunsmith';
  2) O 'bloco' para escolha de attachment deve ser colocado em um componente separado, para ser reutilizado por cada camada;
  3) Manter em mente a separação dos componentes em server e client components, lembrando que o objetivo é obter o menor bundle possível pós-build;
  4) Seguir o template de camadas a seguir:

  Gunsmith.Title

  Gunsmith.Weapon
  Gunsmith.Weapon.Model
  Gunsmith.Weapon.Optic
  Gunsmith.Weapon.TopSight
  Gunsmith.Weapon.CantedSight
  Gunsmith.Weapon.Barrel
  Gunsmith.Weapon.Underbarrel
  Gunsmith.Weapon.SideRail
  Gunsmith.Weapon.Magazine

  Gunsmith.Weapon.GunStats
  Gunsmith.Weapon.RangeGraph
 */

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
import { GunsmithAttachmentContainer } from './GunsmithAttachmentContainer'
import { GunsmithAttachmentSlot } from './GunsmithAttachmentSlot'
import { GunsmithContainer } from './GunsmithContainer'
import { GunsmithTitle } from './GunsmithTitle'

export const Gunsmith = ({ weaponName }: IGunsmith) => {
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
      (weaponDataItem) => weaponDataItem.name === weaponName
    )
  }

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
    <GunsmithContainer>
      <GunsmithTitle weaponName={getWeapon()!.name} />

      <GunsmithAttachmentContainer>
        <div className="flex gap-16">
          <GunsmithAttachmentSlot
            slotType="optic"
            selectedAttachment={() => attachments.optic!}
            onClick={(e: any) => handleAttachments(e)}
            attachmentOptions={attachmentData.attachments.optic}
          />

          <GunsmithAttachmentSlot
            slotType="topSight"
            selectedAttachment={() => attachments.topSight!}
            onClick={(e: any) => handleAttachments(e)}
            attachmentOptions={attachmentData.attachments.topSight}
          />

          <GunsmithAttachmentSlot
            slotType="cantedSight"
            selectedAttachment={() => attachments.cantedSight!}
            onClick={(e: any) => handleAttachments(e)}
            attachmentOptions={attachmentData.attachments.cantedSight}
          />

          <GunsmithAttachmentSlot
            slotType="barrel"
            selectedAttachment={() => attachments.barrel!}
            onClick={(e: any) => handleAttachments(e)}
            attachmentOptions={attachmentData.attachments.barrel}
          />
        </div>

        <Image
          src={getWeapon()!.image}
          alt={getWeapon()!.name}
          width={700}
          height={700}
          quality={100}
        />

        <div className="flex gap-16">
          <GunsmithAttachmentSlot
            slotType="magazine"
            selectedAttachment={() => attachments.magazine!}
            onClick={(e: any) => handleAttachments(e)}
            attachmentOptions={attachmentData.attachments.magazine}
          />

          <GunsmithAttachmentSlot
            slotType="underbarrel"
            selectedAttachment={() => attachments.underbarrel!}
            onClick={(e: any) => handleAttachments(e)}
            attachmentOptions={attachmentData.attachments.underbarrel}
          />

          <GunsmithAttachmentSlot
            slotType="sideRail"
            selectedAttachment={() => attachments.sideRail!}
            onClick={(e: any) => handleAttachments(e)}
            attachmentOptions={attachmentData.attachments.sideRail}
          />
        </div>
      </GunsmithAttachmentContainer>
    </GunsmithContainer>
  )
}
