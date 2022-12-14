import { useEffect, useState, useRef } from "react";
import Item from "./components/Item";
import Display from "./components/Display";
import Headbar from "./components/Headbar";
import Nav from "./components/Nav";
import { data } from "./data";

export type totalType = {
  u: number;
  r: number;
};
export type ItemType = {
  use: number;
  receive: number;
  available: number;
  title: string;
  pic: string;
  multiplier: number;
  left: number;
}[];
const INITIAILZE: ItemType = data;
const App = () => {
  const [items, setItems] = useState<ItemType>([]);
  const [total, setTotal] = useState<totalType>({ u: 0, r: 0 });

  const dragItem = useRef<any>();
  const dragOverItem = useRef<any>();

  const handleSort = () => {
    const draggedItemContent = items[dragItem.current];
    const sortedItems = [
      ...items.slice(0, dragItem.current),
      ...items.slice(dragItem.current + 1),
    ];
    sortedItems.splice(dragOverItem.current, 0, draggedItemContent);
    setItems(sortedItems);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const onClickRemoveData = (index: number) => {
    localStorage.removeItem("items");
    const newArray = items.map((item, i) => {
      if (index >= 0) {
        if (i == index) {
          return {
            use: 0,
            receive: 0,
            available: 0,
            title: item.title,
            pic: item.pic,
            multiplier: item.multiplier,
            left: 0,
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
    localStorage.setItem("items", JSON.stringify(items));
    calValue();
  };

  const calValue = () => {
    let total: totalType = { u: 0, r: 0 };
    items.forEach(
      (element: { use: number; receive: number; multiplier: number }) => {
        total.u += element.use * element.multiplier;
        total.r += element.receive * element.multiplier;
      }
    );
    setTotal(total);
  };

  useEffect(() => {
    localStorage.removeItem("dataItems");
    localStorage.removeItem("data");
    const data = JSON.parse(localStorage.getItem("items")!);
    if (!data) {
      localStorage.setItem("items", JSON.stringify(INITIAILZE));
      window.location.reload();
    }
	setItems(data);
  }, []);

  useEffect(() => {
    if (items.length > 1)
      localStorage.setItem("items", JSON.stringify(items));
    calValue();
  }, [items]);

  const value: number = total.r - total.u;

  return (
    <>
      <div className="bg-teal-500">
        <div className="container mx-auto bg-teal-500">
          <Nav />
        </div>
      </div>

      <div className="sm:container mx-auto my-3 block text-gray-500 font-bold col-start-auto">
        <Headbar />
        {items.map((item, index) => (
          <Item
            item={item}
            items={items}
            setItems={setItems}
            index={index}
            onClickRemoveData={onClickRemoveData}
            key={index}
            dragItem={dragItem}
            dragOverItem={dragOverItem}
            handleSort={handleSort}
          />
        ))}
        <Display
          items={items}
          setItems={setItems}
          value={value}
          onClickRemoveData={onClickRemoveData}
          total={total}
        />
      </div>
    </>
  );
};

export default App;
