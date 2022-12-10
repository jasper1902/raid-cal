import React, { useEffect, useState, useRef } from "react";
import Nav from "./components/Nav";
import { data } from "./data";

const INITIAILZE = data;
const App = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState({ u: 0, r: 0 });

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _items = [...items];
    console.log(_items);

    //remove and save the dragged item content
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];

    //switch the position
    _items.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setItems(_items);
  };

  const updateState = (index, j) => (e) => {
    const newArray = items.map((item, i) => {
      if (index === i && j === "use") {
        let use = Math.abs(parseInt(e.target.value ? e.target.value : 0));
        return {
          ...item,
          use: use,
          left: item.available - use,
        };
      } else if (index === i && j === "receive") {
        return {
          ...item,
          receive: Math.abs(parseInt(e.target.value ? e.target.value : 0)),
        };
      } else if (index === i && j === "available") {
        let available = Math.abs(parseInt(e.target.value ? e.target.value : 0));
        return {
          ...item,
          available: available,
          use: available - item.left,
        };
      } else if (index === i && j === "left") {
        let left = Math.abs(parseInt(e.target.value ? e.target.value : 0));
        return {
          ...item,
          left: left,
          use: item.available - left,
        };
      } else {
        return item;
      }
    });
    setItems(newArray);
  };

  const onClickRemoveData = () => {
    localStorage.removeItem("data");
    const newArray = items.map((item, i) => {
      return {
        use: 0,
        receive: 0,
        available: 0,
        title: item.title,
        pic: item.pic,
        multiplier: item.multiplier,
        left: 0,
      };
    });
    setItems(newArray);
    localStorage.setItem("data", JSON.stringify(items));
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

      <div className="sm:container mx-auto my-3 block text-gray-500 font-bold col-start-auto">
        <ul className="grid grid-cols-6 items-center w-12/12 my-3">
          <li className="text-center">จำนวนที่มี</li>
          <li className="text-start">จำนวนที่เหลือ</li>
          <li className="text-start">ชื่อ</li>
          <li className="text-start">รูป</li>
          <li className="text-center">จำนวนที่ใช้</li>
          <li className="text-center">จำนวนที่ได้คืน</li>
        </ul>

        {items.map((item, index) => (
          <div
            key={index}
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            draggable
          >
            <div className="grid grid-cols-6 items-center">
              <input
                className="shadow appearance-none border rounded w-auto py-3 m-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={item.available}
                type="number"
                value={item.available}
                onChange={updateState(index, "available")}
              />

              <input
                className="shadow appearance-none border rounded w-auto py-3 m-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={item.left}
                type="number"
                value={item.left}
                onChange={updateState(index, "left")}
              />

              <label className="block text-gray-500 font-bold col-start-auto">
                {item.title}
              </label>
              <div className="flex items-center">
                <img
                  className="max-w-[65px] mx-2 col-span-auto"
                  src={item.pic}
                  alt={item.title}
                />
              </div>
              <input
                className="col-span-auto shadow appearance-none border rounded w-auto py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={item.use}
                type="number"
                value={item.use}
                onChange={updateState(index, "use")}
              />

              <input
                className="shadow col-end-auto appearance-none border rounded w-auto py-3 m-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {value > 0
              ? `คุ้ม ${value.toLocaleString()}`
              : value == 0
              ? "เท่าทุน"
              : `ไม่คุ้ม ${value.toLocaleString()}`}
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