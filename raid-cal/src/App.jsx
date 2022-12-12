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
    let _items = [...items];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(_items);
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
    let calu = 0;
    let calr = 0;
    items.forEach((element) => {
      calu = element.use * element.multiplier + calu;
      calr = element.receive * element.multiplier + calr;
    });
    setTotal({ u: calu, r: calr });
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
