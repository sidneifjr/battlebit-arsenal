import Image from 'next/image'

import weaponsData from '../json/weapons.json'

interface ClassSuggestion {
  category: string
  reloadTime: number
  aimDownTime: number
}

/**
 * Muitas armas podem ser utilizadas por várias classes. Dentre tais classes, considere que:
 *
 * - Assault é destinado à infantaria ofensiva, portanto possui vários bônus: +25% Reload Speed, +20% Aim Down Time e +25% Draw Speed.
 * - Medic é responsável por curar e reviver companheiros durante o fogo cruzado, então agilidade é importante.
 * - Engineer é versátil e, dependendo do loadout, tem o potencial de ser mais ágil que o Medic, porém com menos HP.
 *
 * Assim, é necessário:
 *
 * 1) Calcular o valor médio de um atributo, em uma mesma categoria.
 * 2) As armas que estiverem acima da média devem ser sugeridas Assault, devido aos bônus mencionados serem mais benéficos.
 * 3) Porém, existem armas que podem ser equipadas SOMENTE por uma classe (LMGs, Light Support Guns e Snipers). Para tais casos, não haverá recomendação.
 * 4) Além disso, usar um Extended Magazine altera o Reload Speed e Aim Down Time do armamento, o que será refletido na recomendação.
 */

export const ClassSuggestion = (stats: ClassSuggestion) => {
  const getWeaponsFromCategory = weaponsData.weapons.filter((item) => {
    return item.category === stats.category
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

    const averageReloadSpeed = getReloadSpeed / getWeaponsFromCategory.length
    const averageAimDownTime = getAimDownTime / getWeaponsFromCategory.length

    if (
      stats.reloadTime > averageReloadSpeed &&
      stats.aimDownTime > averageAimDownTime
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
        <p className="text-2xl text-center py-6 pb-6 flex justify-center gap-2">
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

  return getStatAverages()
}
