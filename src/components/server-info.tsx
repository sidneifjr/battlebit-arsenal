interface DataProps {
  Name: string
  Map: string
  MapSize: string
  Gamemode: string
  Region: string
  Players: number
  QueuePlayers: number
  MaxPlayers: number
  Hz: number
  DayNight: string
  IsOfficial: boolean
  HasPassword: boolean
  AntiCheat: string
  Build: string
}

interface Data {
  data: DataProps[]
}

export const ServerInfo = (data: Data) => {
  const getTotalPlayerCount = () => {
    if (data.data === undefined) {
      return 0
    }

    const totalPlayers = data.data.reduce(
      (accumulator: number, item: DataProps) => accumulator + item.Players,
      0
    )

    return totalPlayers
  }

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <h1 className="text-4xl text-center mt-8">
        There are <span className="text-cyan-400">{getTotalPlayerCount()}</span>{' '}
        players currently <span className="text-cyan-400">in game</span>.
      </h1>
    </div>
  )
}
