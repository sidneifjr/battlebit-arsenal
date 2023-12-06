import Image from 'next/image'

import { TTKCalculator } from '../ttk-calculator'

import weaponsData from '../../json/weapons.json'

interface Stats {
  stats: {
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
}

export const GunsmithStats = ({ stats }: Stats) => {
  // Removendo stats que não serão úteis.
  const {
    id,
    name,
    pageName,
    category,
    icon,
    image,
    rangeData,
    firingMode,
    ...statsWithoutUndesirables
  } = stats

  const getKeyValuePairsFromStats = Object.entries(statsWithoutUndesirables)

  const getWeaponsFromCategory = weaponsData.weapons.filter((item) => {
    return item.category === category
  })

  const getStatAverages = () => {
    const getReloadSpeed = getWeaponsFromCategory.reduce(
      (accumulator: number, currentValue: number) => {
        return Number(accumulator) + Number(currentValue.reloadTime)
      },
      []
    )

    const getAimDownTime = getWeaponsFromCategory.reduce(
      (accumulator: number, currentValue: number) => {
        return Number(accumulator) + Number(currentValue.aimDownTime)
      },
      []
    )

    const getDrawSpeed = getWeaponsFromCategory.reduce(
      (accumulator: number, currentValue: number) => {
        return Number(accumulator) + Number(currentValue.drawSpeed)
      },
      []
    )

    const averageReloadSpeed = getReloadSpeed / getWeaponsFromCategory.length
    const averageAimDownTime = getAimDownTime / getWeaponsFromCategory.length
    const averageDrawSpeed = getDrawSpeed / getWeaponsFromCategory.length

    if (
      stats.reloadTime > averageReloadSpeed &&
      stats.aimDownTime > averageAimDownTime &&
      stats.drawSpeed > averageDrawSpeed
    ) {
      return (
        <p className="text-2xl text-center py-4 flex justify-center gap-2">
          Recommended class:{' '}
          <span className="flex items-center gap-2">
            <Image
              src="/classes/assault-icon.webp"
              width={30}
              height={30}
              alt="assault"
            />
            Assault
          </span>
        </p>
      )
    } else {
      return (
        <p className="text-2xl text-center py-4 flex justify-center gap-2">
          Recommended class:{' '}
          <span className="flex items-center gap-2">
            <Image
              src="/classes/medic-icon.webp"
              width={30}
              height={30}
              alt="assault"
            />
            Medic
          </span>{' '}
          /
          <span className="flex items-center gap-2">
            <Image
              src="/classes/engineer-icon.webp"
              width={30}
              height={30}
              alt="assault"
            />
            Engineer
          </span>
        </p>
      )
    }
  }

  /**
    Quando houver alteração no valor de um stat, aplicar uma alteração na cor ou um "risco" no valor antigo.

    1) Eu poderia comparar o valor inicial com o novo valor da propriedade específica. ("Time Travel" abordado nos docs do React seria uma opção).
    2) Então, buscar pelo stat correspondente a partir do "ref" na ul.
  */
  // useEffect(() => {
  //   console.log(stats)
  // }, [stats])

  return (
    <div className="w-full pt-16">
      {/* {stats.category === "Light Support Gun" || stats.category === "Light Machine Gun" || stats.category === "Sniper Rifle" ? {getStatAverages()} : ''} */}

      {getStatAverages()}

      <strong className="pb-2 block">Stats</strong>

      <ul>
        {getKeyValuePairsFromStats.map(
          ([key, value]) =>
            key !== 'rangeData' && (
              <li key={key} className="pb-2">
                <p className="pb-1 capitalize block">
                  <span>{key}</span>: <span>{value.toFixed(2)}</span>
                </p>

                <div className="h-0.5 max-w-[100%] bg-gray-500 rounded-xl">
                  <div
                    className="bg-white h-full"
                    style={{
                      width: `${value < 100 ? value : value / 12}%`,
                    }}
                  ></div>
                </div>
              </li>
            )
        )}
      </ul>

      <TTKCalculator
        damage={stats.damage}
        fireRate={stats.fireRate}
        category={stats.category}
      />
    </div>
  )
}
