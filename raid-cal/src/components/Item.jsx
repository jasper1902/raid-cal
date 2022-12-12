import React from "react";

const Item = ({
  item,
  items,
  setItems,
  index,
  onClickRemoveData,
  dragItem,
  dragOverItem,
  handleSort,
}) => {
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
          //   use: available - item.left,
          left: available,
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
  return (
    <div>
      <div className="grid grid-cols-6 items-center">
        <div className="flex items-center">
          <p
            onClick={() => onClickRemoveData(index)}
            className="cursor-pointer"
          >
            x
          </p>
          <input
            className="shadow appearance-none border rounded w-auto py-3 m-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue={item.available}
            type="number"
            value={item.available}
            onChange={updateState(index, "available")}
          />
        </div>

        <input
          className="shadow appearance-none border rounded w-auto py-3 m-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={item.left}
          type="number"
          value={item.left}
          onChange={updateState(index, "left")}
        />

        <label
          onDragStart={(e) => (dragItem.current = index)}
          onDragEnter={(e) => (dragOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          draggable
          className="block text-gray-500 font-bold col-start-auto cursor-move"
        >
          {item.title}
        </label>
        <div className="flex items-center cursor-move">
          <img
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            draggable
            width="75px"
            height="75px"
            className="max-w-[75px] mx-2 col-span-auto"
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
  );
};

export default Item;
