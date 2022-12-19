import { ItemType, totalType } from "../App";

type Props = {
  value: number;
  total: totalType;
  items: ItemType;
  setItems: (item: ItemType) => void;
  onClickRemoveData: (index: number) => void;
};

const Display = ({
  items,
  setItems,
  value,
  onClickRemoveData,
  total,
}: Props) => {
  const setLeftHandler = () => {
    localStorage.removeItem("dataItems");
    const newArray = items.map((item) => {
      const left = ["Sulfur", "Explosives", "Gun Powder"].includes(item.title)
        ? 0
        : item.left + item.receive;
      return {
        available: left,
        left,
        title: item.title,
        pic: item.pic,
        multiplier: item.multiplier,
        use: 0,
        receive: 0,
      };
    });
    setItems(newArray);
    localStorage.setItem("dataItems", JSON.stringify(newArray));
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
                ? "bg-green-500 hover:bg-green-700"
                : value == 0
                ? "bg-yellow-500 hover:bg-yellow-700"
                : "bg-red-500 hover:bg-red-700"
            } text-4xl mt-5 p-3 rounded-xl transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold`}
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
            className={`text-4xl mt-5 bg-blue-500 p-3 rounded-xl hover:bg-blue-700 transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold `}
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
