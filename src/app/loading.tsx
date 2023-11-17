import Image from 'next/image'

export default function RootLoading() {
  return (
    <section className="min-h-[100vh] flex flex-1 justify-center items-center">
      <Image
        src={'/loader.svg'}
        alt="Loader"
        width={120}
        height={120}
        quality={100}
      />
    </section>
  )
}
