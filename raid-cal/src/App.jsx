import React, { useEffect, useState, useRef } from "react";
import Nav from "./components/Nav";
import { data } from "./data";

const INITIAILZE = data;
const App = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState({ u: 0, r: 0 });

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _items = [...items];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(_items);
  };

  const updateState = (index, j) => (e) => {
    const newArray = items.map((item, i) => {
      if (index === i && j === "use") {
        let use = parseInt(e.target.value ? e.target.value : 0);
        return {
          ...item,
          use: use,
          left: item.available - use,
        };
      } else if (index === i && j === "receive") {
        return {
          ...item,
          receive: parseInt(e.target.value ? e.target.value : 0),
        };
      } else if (index === i && j === "available") {
        let available = parseInt(e.target.value ? e.target.value : 0);
        return {
          ...item,
          available: available,
          use: available - item.left,
        };
      } else if (index === i && j === "left") {
        let left = parseInt(e.target.value ? e.target.value : 0);
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

  const onClickRemoveData = (index) => {
    localStorage.removeItem("itemdata");
    const newArray = items.map((item, i) => {
      if (index >= 0) {
		if (i == index) {
			return {
			  use: item.use,
			  receive: item.receive,
			  available: 0,
			  title: item.title,
			  pic: item.pic,
			  multiplier: item.multiplier,
			  left: item.left,
			};
		  } else {
			return item;
		  }
	  } else {
		return {
			use: 0,
			receive: 0,
			available: 0,
			title: item.title,
			pic: item.pic,
			multiplier: item.multiplier,
			left: 0,
		  };
	  }
    });
    setItems(newArray);
    localStorage.setItem("itemdata", JSON.stringify(items));
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

  const setLeftHandler = () => {
    localStorage.removeItem("itemdata");
    const newArray = items.map((item, i) => {
      return {
        use: 0,
        receive: 0,
        available: item.left + item.receive,
        title: item.title,
        pic: item.pic,
        multiplier: item.multiplier,
        left: 0,
      };
    });
    setItems(newArray);
    localStorage.setItem("itemdata", JSON.stringify(items));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("itemdata"));
    if (!data) {
      localStorage.setItem("itemdata", JSON.stringify(INITIAILZE));
      window.location.reload(false);
    }
    setItems(data);
  }, []);

  useEffect(() => {
    if (items.length > 1)
      localStorage.setItem("itemdata", JSON.stringify(items));
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
        <ul className="grid grid-cols-6 items-center w-12/12">
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
              <div className="flex items-center">
                <p onClick={() => onClickRemoveData(index)} className="cursor-pointer">x</p>
                <input
                  className="shadow appearance-none border rounded w-auto py-2 m-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue={item.available}
                  type="number"
                  value={item.available}
                  onChange={updateState(index, "available")}
                />
              </div>

              <input
                className="shadow appearance-none border rounded w-auto py-2 m-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="max-w-[75px] mx-2 col-span-auto"
                  src={item.pic}
                  alt={item.title}
                />
              </div>
              <input
                className="col-span-auto shadow appearance-none border rounded w-auto py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={item.use}
                type="number"
                value={item.use}
                onChange={updateState(index, "use")}
              />

              <input
                className="shadow col-end-auto appearance-none border rounded w-auto py-2 m-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            onClick={() => onClickRemoveData(-1)}
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
          <button
            onClick={setLeftHandler}
            className={`mx-5 bg-blue-500 text-white font-bold py-2 px-4 rounded mt-5`}
          >
            เซ็ตจำนวนที่เหลือ
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
