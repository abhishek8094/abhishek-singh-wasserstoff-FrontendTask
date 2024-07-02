import React from 'react';

// Text editor for .ed files
const TextEditor = ({ content, onChange, fileName }) => {
    return (
        <div className="p-6 bg-gray-800 h-[98%] text-white">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold text-center text-vscode-text">{fileName}</h1>
            </div>
            <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-[85%] border border-gray-600 p-2 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your content here..."
            />
        </div>
    );
};

export default TextEditor;