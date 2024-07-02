import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faFolderPlus, faFileAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useIDE } from '../contexts/IDEContext';

// SidebarItem for rendering each item (folder or file as in structure) in the sidebar
const SidebarItem = ({ item, path, onCreateFolder, onCreateFile, handleFileClick, handleDelete }) => {
  if (item.type === 'folder') {
    return (
      <div className="ml-4 mt-2  relative">
        <div className="sidebar-item flex justify-between items-center text-vscode-text">
          <div className="flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faFolder} className="mr-2 text-vscode-folder" />
            <span className="font-bold">{item.name}</span>
          </div>
          <div className="flex items-center sidebar-icons">
            <button onClick={() => onCreateFolder([...path, item.name])} className="p-1">
              <FontAwesomeIcon icon={faFolderPlus} />
            </button>
            <button onClick={() => onCreateFile([...path, item.name])} className="p-1">
              <FontAwesomeIcon icon={faFileAlt} />
            </button>
            {path.length ? <button onClick={() => handleDelete([...path, item.name], 'folder')} className="p-1">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button> : null}
          </div>
        </div>
        <div className="ml-4">
          {item.children.map((child, index) => (
            <SidebarItem
              key={index}
              item={child}
              path={[...path, item.name]}
              onCreateFolder={onCreateFolder}
              onCreateFile={onCreateFile}
              handleFileClick={handleFileClick}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="ml-4 mt-2 sidebar-item flex justify-between items-center text-vscode-text">
          <div className="flex items-center cursor-pointer" onClick={() => handleFileClick(item)}>
            <FontAwesomeIcon icon={faFile} className="mr-2 text-vscode-file" />
            <span>{item.name}</span>
          </div>
          <div className="flex items-center sidebar-icons">
            <button onClick={() => handleDelete([...path, item.name], 'folder')} className="p-1">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
    );
  }
};

// Sidebar to render the entire sidebar
const Sidebar = ({ structure, isSidebarOpen }) => {
  const { handleCreateFolder, handleCreateFile, handleFileClick, handleDelete } = useIDE();

  return (
    <div className={`md:visible md:relative md:w-1/5 fixed top-0 left-0 h-full w-3/4 bg-vscode-sidebar z-50 overflow-y-auto overflow-x-auto transform transition-transform ease-in-out  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-center text-vscode-text">Super Editor</h1>
        </div>
        <div className="h-[calc(100%-3rem)] overflow-y-auto overflow-x-auto">
          {structure.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              path={[]}
              onCreateFolder={handleCreateFolder}
              onCreateFile={handleCreateFile}
              handleFileClick={handleFileClick}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;