import React, { useState } from 'react';

// List editor for .lt files
const ListMaker = ({ list, setList, filePath, fileName }) => {
    const [itemText, setItemText] = useState('');

    const addItem = () => {
        setList(filePath, [...list, itemText]);
        setItemText('');
    };

    return (
        <div className="p-6 bg-gray-800 h-full text-white">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold text-center text-vscode-text">{fileName}</h1>
            </div>
            <div className="max-w-md mx-auto mb-4 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                <input
                    value={itemText}
                    onChange={(e) => setItemText(e.target.value)}
                    className="flex-1 border border-gray-600 p-2 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your item here"
                />
                <button
                    onClick={addItem}
                    className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    Add Item
                </button>
            </div>
            <ul className="max-w-md mx-auto">
                {list.map((item, index) => (
                    <li
                        key={index}
                        className="border border-gray-600 p-2 mb-2 rounded-lg bg-gray-700 text-white shadow-md"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListMaker;