import { v4 as uuidv4 } from 'uuid'

interface IStats {
  stats: {
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
}

export const GunsmithStats = ({ stats }: IStats) => {
  const getKeyValuePairsFromStats = Object.entries(stats)

  return (
    <div className="max-w-xs pt-16">
      <strong className="pb-2 block">Stats</strong>

      {/**
       * Animar as barras de stats, ao entrar na página ou entrar no viewport do usuário.
       */}
      <ul>
        {getKeyValuePairsFromStats.map(([key, value]) => (
          <li key={uuidv4()} className="pb-2">
            <span className="pb-1 capitalize block">
              {key}: {value.toFixed(2)}
            </span>

            {/**
             * Definir max e min value, semelhante a um input de range.
             */}

            <div className="h-1 max-w-[100%] bg-gray-500 rounded-xl">
              <div
                className="bg-white h-full"
                style={{ width: `${value < 100 ? value : value / 12}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
