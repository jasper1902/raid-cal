import sulfur from "./assets/rust/sulfur.png";
import rocket from "./assets/rust/ammo.rocket.basic.png";
import ammoExplosive from "./assets/rust/ammo.rifle.explosive.png";
import rocketHV from "./assets/rust/ammo.rocket.hv.png";
import satchel from "./assets/rust/explosive.satchel.png";
import c4 from "./assets/rust/explosive.timed.png";
import explosives from "./assets/rust/explosives.png";
import beancan from "./assets/rust/grenade.beancan.png";
import gunpowder from "./assets/rust/gunpowder.png";

export const data = [
  {
    use: 0,
    receive: 0,
    title: "Rocket",
    pic: rocket,
    multiplier: 700,
    available: 0,
    left: 0,
  },
  {
    use: 0,
    receive: 0,
    title: "Timed Explosive Charge(C4)",
    pic: c4,
    multiplier: 1100,
    available: 0,
    left: 0,
  },
  {
    use: 0,
    receive: 0,
    title: "Explosive 5.56 Rifle Ammo",
    pic: ammoExplosive,
    multiplier: 12.5,
    available: 0,
    left: 0,
  },
  {
    use: 0,
    receive: 0,
    title: "Beancan Grenade",
    pic: beancan,
    multiplier: 60,
    available: 0,
    left: 0,
  },
  {
    use: 0,
    receive: 0,
    title: "Sulfur",
    pic: sulfur,
    multiplier: 0.5,
    available: 0,
    left: 0,
  },
  {
    use: 0,
    receive: 0,
    title: "Gun Powder",
    pic: gunpowder,
    multiplier: 1,
    available: 0,
    left: 0,
  },
  {
    use: 0,
    receive: 0,
    title: "Satchel Charge",
    pic: satchel,
    multiplier: 240,
    available: 0,
    left: 0,
  },
  {
    use: 0,
    receive: 0,
    title: "High Velocity Rocket",
    pic: rocketHV,
    multiplier: 100,
    available: 0,
    left: 0,
  },
  {
    use: 0,
    receive: 0,
    title: "Explosives",
    pic: explosives,
    multiplier: 55,
    available: 0,
    left: 0,
  },
];
