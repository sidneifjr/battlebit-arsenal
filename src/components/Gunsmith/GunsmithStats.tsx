import { TTKCalculator } from '../ttk-calculator'

import { ClassSuggestion } from '../class-suggestion'

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
  } = stats // Removendo stats que não serão úteis.

  const getKeyValuePairsFromStats = Object.entries(statsWithoutUndesirables)

  /**
    Quando houver alteração no valor de um stat, aplicar uma alteração na cor ou um "risco" no valor antigo.

    1) Eu poderia comparar o valor inicial com o novo valor da propriedade específica. ("Time Travel" abordado nos docs do React seria uma opção).
    2) Então, buscar pelo stat correspondente a partir do "ref" na ul.
  */
  // useEffect(() => {
  //   console.log(stats)
  // }, [stats])

  return (
    <div className="w-full pt-8">
      {/* {stats.category === "Light Support Gun" || stats.category === "Light Machine Gun" || stats.category === "Sniper Rifle" ? {getStatAverages()} : ''} */}

      <ClassSuggestion stats={stats} />

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
