import { ServerInfo } from '@/components/server-info'
import { WeaponryTable } from '@/components/weaponry-table'

export default async function Home() {
  const serverURL = 'https://publicapi.battlebit.cloud/Servers/GetServerList'

  let getServersData

  try {
    getServersData = await fetch(serverURL, { cache: 'no-store' }).then(
      (response) => response.json()
    )
  } catch (err) {
    console.error(
      'Unable to access the official Battlebit API; reverting to fallback values.'
    )
  }

  return (
    <section className="flex flex-col gap-3">
      <ServerInfo data={getServersData} />

      <WeaponryTable />
    </section>
  )
}
