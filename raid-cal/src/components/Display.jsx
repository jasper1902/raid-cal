import React from "react";

const Display = ({ items, setItems, value, onClickRemoveData, total }) => {
  const setLeftHandler = () => {
    localStorage.removeItem("dataItems");
    const newArray = items.map((item, i) => {
      return {
        use: 0,
        receive: 0,
        available: ["Sulfur", "Explosives", "Gun Powder"].includes(item.title)
          ? 0
          : item.left + item.receive,
        title: item.title,
        pic: item.pic,
        multiplier: item.multiplier,
        left: ["Sulfur", "Explosives", "Gun Powder"].includes(item.title)
          ? 0
          : item.left + item.receive,
      };
    });
    setItems(newArray);
    localStorage.setItem("dataItems", JSON.stringify(items));
  };
  return (
    <div className="text-center font-bold text-5xl">
      <div className="flex justify-around items-center">
        <p>ใช้ไป {total.u.toLocaleString()}</p>
        <div>
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
          <span className="text-md flex justify-center mt-3 text-sm">
            กดปุ่มเพื่อล้างค่า
          </span>
        </div>
        <div>
          <button
            onClick={setLeftHandler}
            className={`mx-5 bg-blue-500 text-white font-bold py-2 px-4 rounded mt-5`}
          >
            เซ็ตจำนวนที่เหลือ
          </button>
          <span className="text-md flex justify-center mt-3 text-sm">
            จำนวนที่มี = จำนวนที่เหลือ+จำนวนที่ได้คืน
          </span>
        </div>
        <p>ได้คืน {total.r.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Display;
