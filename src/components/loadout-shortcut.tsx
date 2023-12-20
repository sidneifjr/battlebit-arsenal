import Image from 'next/image'

export const LoadoutShortcut = () => {
  return (
    <div className="w-20 h-20 fixed border-2 border-white bottom-8 right-8 rotate-45 cursor-pointer transition-transform hover:scale-110">
      <Image
        className="w-60 h-full object-cover"
        width={400}
        height={400}
        src={'/battlebit-remastered.jpg'}
        alt=""
      />
    </div>
  )
}
