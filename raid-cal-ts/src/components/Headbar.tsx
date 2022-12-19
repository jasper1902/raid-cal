const Headbar = () => {
  return (
    <ul className="grid grid-cols-6 items-center w-12/12">
      <li className="text-center">จำนวนที่มี</li>
      <li className="text-start">จำนวนที่เหลือ</li>
      <li className="text-start">ชื่อ</li>
      <li className="text-start">รูป</li>
      <li className="text-center">จำนวนที่ใช้</li>
      <li className="text-center">จำนวนที่ได้คืน</li>
    </ul>
  );
};

export default Headbar;