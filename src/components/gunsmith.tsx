/*
  Ao implementar Composition Pattern, seguir o template a seguir:

  Gunsmith.Title

  Gunsmith.Weapon
  Gunsmith.Weapon.Model
  Gunsmith.Weapon.Optic
  Gunsmith.Weapon.TopSight
  Gunsmith.Weapon.CantedSight
  Gunsmith.Weapon.Barrel
  Gunsmith.Weapon.Underbarrel
  Gunsmith.Weapon.SideRail
  Gunsmith.Weapon.Magazine

  Gunsmith.Weapon.GunStats
  Gunsmith.Weapon.RangeGraph
 */

export const Gunsmith = (props: { weapon: string }) => {
  console.log(props.weapon);

  return (
    <div className="max-w-full p-4">
      <h1 className="text-4xl border-b-2 pb-2">Gunsmith for {props.weapon}</h1>
    </div>
  );
};
