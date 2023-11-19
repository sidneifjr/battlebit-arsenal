import { ServerInfo } from '@/components/server-info'
import { WeaponryList } from '@/components/weaponry-list'

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
      <h1 className="text-7xl pt-12 mx-auto">
        <strong>Battlebit Arsenal</strong>
      </h1>

      <ServerInfo data={getServersData} />

      <WeaponryList />
    </section>
  )
}
