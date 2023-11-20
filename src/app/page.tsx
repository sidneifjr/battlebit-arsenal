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
      <h1 className="w-full max-w-[460px] text-7xl pt-12 relative mx-auto">
        <strong className="flex flex-col">
          <span className="self-start">Battlebit</span>
          <span className="self-end">Arsenal</span>
        </strong>
      </h1>

      <ServerInfo data={getServersData} />

      <WeaponryList />

      {/* <BottomMenu /> */}
    </section>
  )
}
