import React, { createContext, useState, useEffect, useContext } from 'react';
import Modal from '../components/Modal';

const IDEContext = createContext();

// Context provider to wrap the app with IDE context
export const IDEProvider = ({ children }) => {
  const initialStructure = [
    {
      type: 'folder',
      name: 'root',
      children: [],
      path: [],
    },
  ];

  const [structure, setStructure] = useState(initialStructure);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentPath, setCurrentPath] = useState([]);

  // Load data from localStorage when component is mounted
  useEffect(() => {
    const storedStructure = localStorage.getItem('ide_structure');
    const storedFileContents = localStorage.getItem('ide_fileContents');

    if (storedStructure) {
      setStructure(JSON.parse(storedStructure));
    }
    if (storedFileContents) {
      setFileContents(JSON.parse(storedFileContents));
    }
  }, []);

  // Update localStorage whenever there is a change in structure or fileContents
  useEffect(() => {
    localStorage.setItem('ide_structure', JSON.stringify(structure));
  }, [structure]);

  useEffect(() => {
    localStorage.setItem('ide_fileContents', JSON.stringify(fileContents));
  }, [fileContents]);

  // Function to add a folder or file to the structure recursively
  const addFolderOrFile = (currentStructure, path, item) => {
    if (path.length === 0) {
      return [...currentStructure, item];
    }

    return currentStructure.map((node) => {
      if (node.type === 'folder' && node.name === path[0]) {
        return {
          ...node,
          children: addFolderOrFile(node.children, path.slice(1), item),
        };
      }
      return node;
    });
  };

  // Handlers for creating new folder
  const handleCreateFolder = (path = []) => {
    setModalOpen(true);
    setModalType('folder');
    setCurrentPath(path);
  };

  // Handlers for creating new file
  const handleCreateFile = (path = []) => {
    setModalOpen(true);
    setModalType('file');
    setCurrentPath(path);
  };

  // Handler for file click in sidebar
  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  // Handler for updating the file content
  const updateFileContent = (filePath, content) => {
    setFileContents((prevContents) => ({
      ...prevContents,
      [filePath]: content,
    }));
  };

  const deleteFolderOrFile = (currentStructure, path) => {
    if (path.length === 0) {
      return currentStructure;
    }
  
    return currentStructure.filter((node) => {
      if (node.name === path[0]) {
        if (path.length === 1) {
          return false; // Delete the node
        } else if (node.type === 'folder') {
          node.children = deleteFolderOrFile(node.children, path.slice(1));
        }
      }
      return true;
    });
  };
  
  // Handler for deleting folder or file
  const handleDelete = (path, type) => {
    setStructure((prevStructure) => deleteFolderOrFile(prevStructure, path));
  
    if (type === 'file') {
      const filePath = path.join('/');
      setFileContents((prevContents) => {
        const newContents = { ...prevContents };
        delete newContents[filePath];
        return newContents;
      });
    }
  };

  // Handler for submitting input name for folder/file
  const handleModalSubmit = (name) => {
    setModalOpen(false);
    if (name) {
      const item = { type: modalType, name, children: modalType === 'folder' ? [] : undefined, path: currentPath };
      const filePath = currentPath.length > 0 ? `${currentPath.join('/')}/${name}` : name;
      setStructure((prevStructure) => addFolderOrFile(prevStructure, currentPath, item));

      if (modalType === 'file') {
        const extension = name.split('.').pop();
        let content;

        if (extension === 'ed') {
          content = '';
        } else if (extension === 'note' || extension === 'lt') {
          content = [];
        } else if (extension === 'readme') {
          content = '';
        } else {
          content = null;
        }

        setFileContents((prevContents) => ({
          ...prevContents,
          [filePath]: content,
        }));
      }
    }
  };

  return (
    <IDEContext.Provider
      value={{
        structure,
        selectedFile,
        fileContents,
        handleCreateFolder,
        handleCreateFile,
        handleFileClick,
        updateFileContent,
        handleDelete
      }}
    >
      {children}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        isFolder={modalType === 'folder'}
      />
    </IDEContext.Provider>
  );
};

export const useIDE = () => useContext(IDEContext);
