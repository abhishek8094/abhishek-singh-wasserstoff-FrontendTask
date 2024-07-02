import React, { useState, useEffect, useRef } from "react";

// Modal to take input of file/folder name
const Modal = ({ isOpen, onClose, onSubmit, isFolder }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null); // Reference to the input element for focusing
  const modalRef = useRef(null); // Reference to the modal element for shaking animation

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Focus the input element when the modal opens
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (isFolder && /[^\w\s]/.test(name)) {
      setError("Folder name should not contain special characters.");
      shakeModal();
      return;
    }
    if (!name.trim()) {
      setError("Name cannot be empty.");
      shakeModal();
      return;
    }
    setError("");
    onSubmit(name);
    setName("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Function to shake the modal on error
  const shakeModal = () => {
    modalRef.current.classList.add("animate-shake");
    setTimeout(() => {
      modalRef.current.classList.remove("animate-shake");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 shadow-2xl bg-opacity-50 flex items-center justify-center  z-50">
      <div
        ref={modalRef}
        className="bg-vscode-sidebar p-4 rounded shadow-md w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4"
      >
        <h2 className="text-lg font-bold mb-4 text-white">
          {isFolder ? "Create Folder" : "Create File"}
        </h2>
        <input
          type="text"
          value={name} // Bind the input value to the name state
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="border p-2 w-full mb-2 bg-vscode-background text-vscode-ide-text"
          placeholder={`Enter ${isFolder ? "folder" : "file"} name`}
        />
        {/* Display error message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
