import { ServerInfo } from '@/components/server-info'
import { WeaponryTable } from '@/components/weaponry-table'

export default async function Home() {
  const serverURL = 'https://publicapi.battlebit.cloud/Servers/GetServerList'

  const getServersData = await fetch(serverURL).then((response) =>
    response.json()
  )

  return (
    <main className="flex flex-col gap-3">
      <ServerInfo data={getServersData} />

      <WeaponryTable />
    </main>
  )
}
