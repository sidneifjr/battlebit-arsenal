import { Gunsmith } from '@/components/gunsmith';

interface WeaponProps {
  params: {
    slug: string;
    searchParams: {};
  };
}

export default function GunsmithPage({ params }: Readonly<WeaponProps>) {
  console.log(params);

  return (
    <>
      <h1>Weapon Page: {params.slug}</h1>

      <Gunsmith weapon={params.slug} />
    </>
  );
}
