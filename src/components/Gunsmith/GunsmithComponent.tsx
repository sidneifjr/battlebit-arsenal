'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Gunsmith } from '.'

import attachmentData from '../../json/attachments.json'
import weaponData from '../../json/weapons.json'

import { replaceWhiteSpaceWithDash } from '@/utils/replaceWhiteSpaceWithDash'
import { useRouter, useSearchParams } from 'next/navigation'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  // console.log(searchParams.get('optic'))

  const weaponNameWithoutURLParams = weaponName.replace(/%.*/, '') // remove os parâmetros de attachments presentes na URL.

  // A referência deve ser mantida, pois será necessária para resetar aos valores iniciais, após as modificações nos stats provenientes dos attachments.
  const originalWeapon = weaponData.weapons.find(
    (weaponDataItem) => weaponDataItem.pageName === weaponNameWithoutURLParams
  ) as WeaponInfo

  const getAttachmentFromURL = attachmentData.attachments.find(
    (item) => item.urlName === searchParams.get('optic')
  )

  const [weapon, setWeapon] = useState(originalWeapon)

  const [attachments, setAttachments] = useState<Attachments>({
    optic: {
      name: '-',
      urlName: '-',
      statModifier: [],
    },
    topSight: {
      name: '-',
      urlName: '-',
      statModifier: [],
    },
    cantedSight: {
      name: '-',
      urlName: '-',
      statModifier: [],
    },
    barrel: {
      name: '-',
      urlName: '-',
      statModifier: [],
    },
    magazine: {
      name: '-',
      urlName: '-',
      statModifier: [],
    },
    underbarrel: {
      name: '-',
      urlName: '-',
      statModifier: [],
    },
    sideRail: {
      name: '-',
      urlName: '-',
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

  useEffect(() => {
    // const params = [
    //   {
    //     base: '&optic=',
    //     value: attachments.optic!.name,
    //   },
    //   {
    //     base: '&topSight=',
    //     value: attachments.topSight!.name,
    //   },
    //   {
    //     base: '&cantedSight=',
    //     value: attachments.cantedSight!.name,
    //   },
    //   {
    //     base: '&barrel=',
    //     value: attachments.barrel!.name,
    //   },
    //   {
    //     base: '&magazine=',
    //     value: attachments.magazine!.name,
    //   },
    //   {
    //     base: '&underbarrel=',
    //     value: attachments.underbarrel!.name,
    //   },
    //   {
    //     base: '&siderail=',
    //     value: attachments.sideRail!.name,
    //   },
    // ]

    // let urlParams = ''

    // params.forEach((param) => {
    //   console.log(param.base, param.value)

    //   return urlParams.concat(
    //     `${param.base}${replaceWhiteSpaceWithDash(param.value)}`
    //   )
    // })

    // console.log(urlParams)

    const opticParams = `&optic=${replaceWhiteSpaceWithDash(
      attachments.optic!.urlName
    )}`

    const topSightParams = `&topSight=${replaceWhiteSpaceWithDash(
      attachments.topSight!.urlName
    )}`

    const cantedSightParams = `&cantedSight=${replaceWhiteSpaceWithDash(
      attachments.cantedSight!.urlName
    )}`

    const barrelParams = `&barrel=${replaceWhiteSpaceWithDash(
      attachments.barrel!.urlName
    )}`

    const magazineParams = `&magazine=${replaceWhiteSpaceWithDash(
      attachments.magazine!.urlName
    )}`

    const underbarrelParams = `&underbarrel=${replaceWhiteSpaceWithDash(
      attachments.underbarrel!.urlName
    )}`

    const siderailParams = `&siderail=${replaceWhiteSpaceWithDash(
      attachments.sideRail!.urlName
    )}`

    router.push(
      `?attachments${opticParams}${topSightParams}${cantedSightParams}${barrelParams}${magazineParams}${underbarrelParams}${siderailParams}`,
      {
        scroll: false, // evita scroll para o topo, ao alterar a URL.
      }
    )

    // if (
    //   opticParams !== '?optic=-' &&
    //   topSightParams !== '&topSight=-' &&
    //   cantedSightParams !== '&cantedSight=-' &&
    //   barrelParams !== '&barrel=-' &&
    //   magazineParams !== '&magazine=-' &&
    //   underbarrelParams !== '&underbarrel=-' &&
    //   siderailParams !== '&siderail=-'
    // ) {
    // }
  }, [attachments, getAttachmentFromURL, router])

  return (
    <Gunsmith.Root>
      <Gunsmith.Title weaponName={weapon.name} />

      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
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

        <Gunsmith.Stats stats={weapon} />

        {weapon.rangeData && (
          <Gunsmith.RangeGraph rangeData={weapon.rangeData} />
        )}
      </div>
    </Gunsmith.Root>
  )
}
