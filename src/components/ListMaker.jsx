import { useState } from 'react';

const ListMaker = () => {
  const [lists, setLists] = useState(['Sample Item']);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    setLists([...lists, newItem]);
    setNewItem('');
  };

  return (
    <div className="bg-[#aba1a1] text-black p-4 shadow-md rounded-lg">
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New list item"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddItem}
      >
        Add Item
      </button>
      <ul className="mt-4">
        {lists.map((item, index) => (
          <li key={index} className="p-2 bg-gray-200 my-2 rounded">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListMaker;
