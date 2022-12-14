import React, { useEffect, useState, useRef } from "react";
import Nav from "./components/Nav";
import Item from "./components/Item";
import Display from "./components/Display";
import Headbar from "./components/Headbar";
import { data } from "./data";

const INITIAILZE = data;
const App = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState({ u: 0, r: 0 });

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

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

  const onClickRemoveData = (index) => {
    localStorage.removeItem("dataItems");
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
    localStorage.setItem("dataItems", JSON.stringify(items));
    calValue();
  };

  const calValue = () => {
	let total = { u: 0, r: 0 };
	items.forEach((element) => {
	  total.u += element.use * element.multiplier;
	  total.r += element.receive * element.multiplier;
	});
	setTotal(total);
  };

  useEffect(() => {
    localStorage.removeItem("itemdata");
    localStorage.removeItem("data");
    const data = JSON.parse(localStorage.getItem("dataItems"));
    if (!data) {
      localStorage.setItem("dataItems", JSON.stringify(INITIAILZE));
      window.location.reload(false);
    }
    setItems(data);
  }, []);

  useEffect(() => {
    if (items.length > 1)
      localStorage.setItem("dataItems", JSON.stringify(items));
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
