import { useState } from "react";
import { FolderIcon, DocumentIcon } from "@heroicons/react/solid";
import { v4 as uuidv4 } from "uuid";

const Sidebar = ({ onSelectFile }) => {
  const [folders, setFolders] = useState([
    { id: uuidv4(), name: "Folder 1", files: [] },
    { id: uuidv4(), name: "Folder 2", files: [] },
  ]);

  const handleAddFolder = () => {
    if (newFolderName.trim() === "") return;
    const newFolder = { id: uuidv4(), name: newFolderName, files: [] };
    setFolders([...folders, newFolder]);
    setNewFolderName("");
  };

  const handleAddFile = (folderId) => {
    const newFile = {
      id: uuidv4(),
      name: `File ${folders.length + 1}.txt`,
      content: "",
    };
    const updatedFolders = folders.map((folder) =>
      folder.id === folderId
        ? { ...folder, files: [...folder.files, newFile] }
        : folder
    );
    setFolders(updatedFolders);
  };

  const [newFolderName, setNewFolderName] = useState("");
  const [structure, setStructure] = useState([
    {
      type: "folder",
      name: "src",
      children: [
        { type: "file", name: "index.ed" },
        { type: "file", name: "notes.note" },
        { type: "file", name: "todo.lt" },
        { type: "file", name: "README.readme" },
      ],
    },
  ]);

  const handleFileClick = (file) => {
    onSelectFile(file);
  };

  const renderStructure = (items) => {
    return items.map((item) => (
      <div key={item.name} className="pl-4">
        {item.type === "folder" ? (
          <div>
            <FolderIcon className="inline-block w-5 h-5" />
            {item.name}
            {renderStructure(item.children)}
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => handleFileClick(item.name)}
          >
            <DocumentIcon className="inline-block w-5 h-5" />
            {item.name}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="bg-[pink] p-3">
          <h2 className="text-lg font-bold mb-4">Folders</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="New Folder Name"
              className="w-[10rem] p-2 border text-black border-gray-300 rounded-md mb-2"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 ml-6 px-4 rounded-md"
              onClick={handleAddFolder}
            >
              Add Folder
            </button>
          </div>
          <ul>
            {folders.map((folder) => (
              <li key={folder.id} className="mb-2">
                <span className="text-blue-600">{folder.name}</span>
                <ul className="ml-4">
                  {folder.files.map((file) => (
                    <li
                      key={file.id}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {file.name}
                    </li>
                  ))}
                  <li
                    className="text-sm text-gray-700 cursor-pointer"
                    onClick={() => handleAddFile(folder.id)}
                  >
                    + Add File
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-80 bg-gray-800 text-white p-10 ">
          {renderStructure(structure)}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
