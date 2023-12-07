'use client'

import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'

import { Gunsmith } from '.'

import attachmentData from '../../json/attachments.json'
import weaponData from '../../json/weapons.json'
import { Button } from '../ui/button'

interface GunsmithProps {
  weaponName: string
}

interface AttachmentsItem {
  name: string
  urlName: string
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
  const weaponNameWithoutURLParams = weaponName.replace(/%.*/, '') // remove os parâmetros de attachments presentes na URL.

  // A referência deve ser mantida, pois será necessária para resetar aos valores iniciais, após as modificações nos stats provenientes dos attachments.
  const originalWeapon = weaponData.weapons.find(
    (weaponDataItem) => weaponDataItem.pageName === weaponNameWithoutURLParams
  ) as WeaponInfo

  const [blueprintName, setBlueprintName] = useState<string>('')

  const [weapon, setWeapon] = useState(originalWeapon)

  const [attachments, setAttachments] = useState<Attachments>()

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

  const handleBlueprint = (el: FormEvent) => {
    el.preventDefault()

    const form = el.target
    const formInput = form.elements['blueprint']
    const formInputValue = formInput.value.toLowerCase()

    /**
     * Permitir o armazenamento da blueprint apenas quando:
     *
     * 1) Um nome for definido para o mesmo.
     * 2) Acessórios foram selecionados.
     */
    if (formInputValue && attachments !== undefined) {
      const blueprintName = `${formInputValue}`
      const blueprintWeapon = `${JSON.stringify(weapon.pageName)}`
      const blueprintAttachments = `${JSON.stringify(attachments)}`

      localStorage.setItem('blueprintName', blueprintName)
      localStorage.setItem('blueprintWeapon', blueprintWeapon)
      localStorage.setItem('blueprintAttachments', blueprintAttachments)
    }
  }

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
  }, [weaponName])

  return (
    <Gunsmith.Root>
      <Gunsmith.Title weaponName={weapon.name} />

      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
        {blueprintName && (
          <span className="text-4xl capitalize text-cyan-400 pt-12 block">
            {blueprintName}
          </span>
        )}

        <Gunsmith.AttachmentContainer>
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
            src={weapon.icon}
            alt={weapon.name}
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
        </Gunsmith.AttachmentContainer>

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

        <Gunsmith.Stats stats={weapon} />

        {weapon.rangeData && (
          <Gunsmith.RangeGraph rangeData={weapon.rangeData} />
        )}
      </div>
    </Gunsmith.Root>
  )
}
