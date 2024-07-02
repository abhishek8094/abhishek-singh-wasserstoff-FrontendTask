import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Notes editor for .note files
const NoteMaker = ({ notes, setNotes, filePath, fileName }) => {
  const [noteText, setNoteText] = useState("");
  const categories = ["To Do", "In Progress", "Done"];

  const addNote = () => {
    const updatedNotes = [
      ...notes,
      { id: `note-${notes.length}`, text: noteText, category: "To Do" },
    ];
    setNotes(filePath, updatedNotes);
    setNoteText("");
  };

  // Function to handle the end of a drag and drop event
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newNotes = notes.map((note) => {
      if (note.id === result.draggableId) {
        return { ...note, category: result.destination.droppableId };
      }
      return note;
    });

    setNotes(filePath, newNotes);
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(filePath, updatedNotes);
  };

  return (
    <div className="p-6 bg-gray-800 h-full text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-center text-vscode-text">
          {fileName}
        </h1>
      </div>
      <div className="max-w-md mx-auto mb-4 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="flex-1 border border-gray-600 p-2 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your note here"
        />
        <button
          onClick={addNote}
          className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          Add Note
        </button>
      </div>
      {/* Drag and Drop Area */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Droppable areas */}
          {categories.map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 p-4 bg-gray-700 rounded-lg shadow-md mt-4 md:mt-0"
                >
                  <h2 className="text-lg font-semibold mb-4 text-gray-200">
                    {category}
                  </h2>
                  {/* Draggable components */}
                  {notes
                    .filter((note) => note.category === category)
                    .map((note, index) => (
                      <Draggable
                        key={note.id}
                        draggableId={note.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border border-gray-600 p-2 mb-2 relative note-item rounded-lg bg-gray-600 text-white shadow-md"
                          >
                            {note.text}
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="delete-button text-red-500 absolute top-1 right-1 bg-transparent"
                            >
                              &#x2715;
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default NoteMaker;
