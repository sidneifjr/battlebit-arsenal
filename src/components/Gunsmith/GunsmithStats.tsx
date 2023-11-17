import { v4 as uuidv4 } from 'uuid'
import { Progress } from '../ui/progress'

interface IStats {
  stats: {
    damage: number
    lightArmorDamage: number
    heavyArmorDamage: number
    capacity: number
    fireRate: number
    reloadTime: number
    drawSpeed: number
  }
}

export const GunsmithStats = ({ stats }: IStats) => {
  const getKeyValuePairsFromStats = Object.entries(stats)

  return (
    <div className="max-w-xs pt-32">
      <strong>Stats</strong>

      {/**
       * 1) Pegar apenas as propriedades relevantes, as estatísticas da arma.
       *
       * Talvez o componente pai deva passar apenas essas propriedades.
       *
       * 2) Animar as barras de stats, ao entrar na página ou entrar no viewport do usuário.
       */}
      <ul>
        {getKeyValuePairsFromStats.map(([key, value]) => (
          <li key={uuidv4()} className="pb-2">
            <span className="pb-1 capitalize block">
              {key}: {value}
            </span>

            <Progress value={value < 100 ? value : value / 12} />
          </li>
        ))}
      </ul>
    </div>
  )
}
