import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from './ui/button'

interface Calculator {
  damage: number
  fireRate: number
  category: string
}

/**
 * Cálculo do Time To Kill (TTK):
 *
 * 1) A firerate representa o RPM (rounds per minute) da arma. É necessário dividir tal valor por 60, para então obtermos a quantidade de disparos por segundo.
 * 2) Ao calcular com o expoente -1, obtemos quantos segundos levam para um disparo ser efetuado.
 * 3) Então, tais segundos são multiplicados pela quantidade de disparos necessários para eliminar um alvo.
 * */
export const TTKCalculator = ({ damage, fireRate, category }: Calculator) => {
  const [health, setHealth] = useState<number>(100)
  const healthOptions = [100, 125, 150, 175]

  const evaluateFR = Math.pow(fireRate / 60, -1)
  const evaluateDmg = Math.ceil(health / damage) - 1

  const headshotMultiplier = (category: string) => {
    switch (category) {
      case 'Sniper Rifle': {
        return 1.9
      }

      case 'Submachine Gun': {
        return 1.2
      }

      case 'Sidearm': {
        return 1.2
      }

      default: {
        return 1.5
      }
    }
  }

  const timeToKill = (evaluateFR * evaluateDmg * 1000).toFixed(1)

  const handleHealth = (amount: number) => {
    setHealth(amount)
  }

  return (
    <div className="text-center pt-8">
      <div className="mb-4 flex justify-center gap-4">
        {healthOptions.map((item: number) => {
          return (
            <Button
              key={uuidv4()}
              className="bg-white text-black font-bold py-2 px-4 hover:bg-slate-200/90 transition"
              onClick={() => handleHealth(item)}
            >
              {item} HP
            </Button>
          )
        })}
      </div>

      <p>
        At point-blank range, your potential TTK at{' '}
        <span className="text-cyan-400">{health} HP</span> is:{' '}
      </p>

      <span className="text-4xl text-cyan-400 py-4 block">{timeToKill}ms</span>

      <p>Headshot multiplier: {headshotMultiplier(category)}</p>
    </div>
  )
}
