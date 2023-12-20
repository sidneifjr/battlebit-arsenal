'use client'

import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import AttachmentData from '../json/attachments.json'

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

interface LoadoutProviderProps {
  children: ReactNode
}

interface LoadoutContextProps {
  weapon: WeaponInfo
  setWeapon: Dispatch<SetStateAction<WeaponInfo>>
  attachments: Attachments
  setAttachments: Dispatch<SetStateAction<Attachments>>
  getAttachmentsFromCategory: (category: string) => any
  handleAttachments: (e: string) => void
  blueprintName: string
  setBlueprintName: Dispatch<SetStateAction<string>>
  handleBlueprint: (el: FormEvent) => void
}

const LoadoutContext = createContext({} as LoadoutContextProps)

export function LoadoutProvider({ children }: Readonly<LoadoutProviderProps>) {
  const [weapon, setWeapon] = useState<WeaponInfo>()
  const [attachments, setAttachments] = useState<Attachments>()
  const [blueprintName, setBlueprintName] = useState<string>('')

  const handleAttachments = (e: any) => {
    const myAttachment = AttachmentData.attachments.find(
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

  const getAttachmentsFromCategory = (category: string) => {
    return AttachmentData.attachments.filter(
      (item) => item.category === category
    )
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

  return (
    <LoadoutContext.Provider
      value={{
        weapon,
        setWeapon,
        attachments,
        setAttachments,
        handleAttachments,
        getAttachmentsFromCategory,
        blueprintName,
        setBlueprintName,
        handleBlueprint,
      }}
    >
      {children}
    </LoadoutContext.Provider>
  )
}

export const useLoadout = () => useContext(LoadoutContext)
