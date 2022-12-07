import React, { useEffect, useState } from "react";
import sulfur from "./assets/rust/sulfur.png";
import rocket from "./assets/rust/ammo.rocket.basic.png";
import ammoExplosive from "./assets/rust/ammo.rifle.explosive.png";
import rocketHV from "./assets/rust/ammo.rocket.hv.png";
import satchel from "./assets/rust/explosive.satchel.png";
import c4 from "./assets/rust/explosive.timed.png";
import explosives from "./assets/rust/explosives.png";
import beancan from "./assets/rust/grenade.beancan.png";
import gunpowder from "./assets/rust/gunpowder.png";
import Nav from "./components/Nav";

const INITIAILZE = [
  {
    use: 0,
    receive: 0,
    title: "Rocket",
    pic: rocket,
    multiplier: 700,
  },
  {
    use: 0,
    receive: 0,
    title: "Timed Explosive Charge(C4)",
    pic: c4,
    multiplier: 1100,
  },
  {
    use: 0,
    receive: 0,
    title: "Explosive 5.56 Rifle Ammo",
    pic: ammoExplosive,
    multiplier: 12.5,
  },
  {
    use: 0,
    receive: 0,
    title: "Beancan Grenade",
    pic: beancan,
    multiplier: 90,
  },
  {
    use: 0,
    receive: 0,
    title: "Sulfur",
    pic: sulfur,
    multiplier: 0.5,
  },
  {
    use: 0,
    receive: 0,
    title: "Gun Powder",
    pic: gunpowder,
    multiplier: 1,
  },
  {
    use: 0,
    receive: 0,
    title: "Satchel Charge",
    pic: satchel,
    multiplier: 240,
  },
  {
    use: 0,
    receive: 0,
    title: "High Velocity Rocket",
    pic: rocketHV,
    multiplier: 100,
  },
  {
    use: 0,
    receive: 0,
    title: "Explosives",
    pic: explosives,
    multiplier: 55,
  },
];
const App = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState({ u: 0, r: 0 });

  const updateState = (index, j) => (e) => {
    const newArray = items.map((item, i) => {
      if (index === i && j === "use") {
        return { ...item, use: parseInt(e.target.value ? e.target.value : 0) };
      } else if (index === i && j === "receive") {
        return {
          ...item,
          receive: parseInt(e.target.value ? e.target.value : 0),
        };
      } else {
        return item;
      }
    });
    setItems(newArray);
  };

  const onClickRemoveData = () => {
    localStorage.removeItem("data");
    window.location.reload(false);
  };

  const calValue = () => {
    let calu = 0;
    let calr = 0;
    items.forEach((element) => {
      calu = element.use * element.multiplier + calu;
      calr = element.receive * element.multiplier + calr;
    });
    setTotal({ u: calu, r: calr });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
      localStorage.setItem("data", JSON.stringify(INITIAILZE));
      window.location.reload(false);
    }
    setItems(data);
  }, []);

  useEffect(() => {
    if (items.length > 1) localStorage.setItem("data", JSON.stringify(items));
    calValue();
  }, [items]);

  const value = total.r - total.u;

  return (
    <>
      <div className="bg-teal-500">
        <div className="container mx-auto bg-teal-500">
          <Nav />
        </div>
      </div>

      <div className="sm:container mx-auto my-3">
        {items.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-4 items-center">
              <label className="block text-gray-500 font-bold col-start-auto">
                {item.title}
              </label>
              <img
                className="max-w-[65px] mx-2 col-span-auto"
                src={item.pic}
                alt={item.title}
              />

              <input
                className="col-span-auto shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={item.use}
                type="number"
                value={item.use}
                onChange={updateState(index, "use")}
              />

              <input
                className="shadow col-end-auto appearance-none border rounded w-full py-3 m-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={item.receive}
                type="number"
                value={item.receive}
                onChange={updateState(index, "receive")}
              />
            </div>
          </div>
        ))}
        <div className="text-center font-bold text-5xl">
          <div className="flex justify-around">
            <p>ใช้ไป {total.u.toLocaleString()}</p>
            <p>ได้คืน {total.r.toLocaleString()}</p>
          </div>
          <button
            onClick={onClickRemoveData}
            className={`${
              value > 0
                ? "bg-green-500"
                : value == 0
                ? "bg-yellow-500"
                : "bg-red-500"
            } text-white font-bold py-2 px-4 rounded mt-5`}
          >
            {value > 0 ? "คุ้ม" : value == 0 ? "เท่าทุน" : "ไม่คุ้ม"}
          </button>
        </div>
        <span className="text-md flex justify-center mt-3">
          กดปุ่มเพื่อล้างค่า
        </span>
      </div>
    </>
  );
};

export default App;
