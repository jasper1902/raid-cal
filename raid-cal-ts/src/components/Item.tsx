import { ItemType } from "../App";

export type Item = {
  use: number;
  receive: number;
  available: number;
  title: string;
  pic: string;
  multiplier: number;
  left: number;
};

type Props = {
  item: Item;
  index: number;
  items: ItemType;
  setItems: (item: ItemType) => void;
  onClickRemoveData: (index: number) => void;
  dragItem: any;
  dragOverItem: any;
  handleSort: any;
};

const Item = ({
  item,
  items,
  setItems,
  index,
  onClickRemoveData,
  dragItem,
  dragOverItem,
  handleSort,
}: Props) => {
  const updateState = (index: number, property: string) => (e: any) => {
    const newArray = items.map((item: Item, i: number) => {
      if (index === i) {
        let value = parseInt(e.target.value);

        // Object that maps property names to the corresponding update logic
        const updates: { [key: string]: () => Item } = {
          use: () => ({ ...item, use: value, left: item.available - value }),
          receive: () => ({
            ...item,
            receive: value,
          }),
          available: () => ({ ...item, available: value, left: value }),
          left: () => ({ ...item, left: value, use: item.available - value }),
        };

        // Return the updated item by calling the update function for the specified property
        return updates[property]();
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

        <div
          onDragStart={(e) => (dragItem.current = index)}
          onDragEnter={(e) => (dragOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          draggable
          className="block text-gray-500 font-bold col-start-auto cursor-move"
        >
          {item.title}
        </div>
        <div
          className="flex items-center cursor-move"
          onDragStart={(e) => (dragItem.current = index)}
          onDragEnter={(e) => (dragOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          draggable
        >
          <img
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
