// components/NoteMaker.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // For drag and drop functionality

const NoteMaker = () => {
  const [notes, setNotes] = useState([
    { id: uuidv4(), content: 'Note 1', category: 'todo' },
    { id: uuidv4(), content: 'Note 2', category: 'in-progress' },
    { id: uuidv4(), content: 'Note 3', category: 'done' },
  ]);

  const handleDragEnd = result => {
    if (!result.destination) return; // Drop outside the list

    const updatedNotes = [...notes];
    const [reorderedNote] = updatedNotes.splice(result.source.index, 1);
    updatedNotes.splice(result.destination.index, 0, reorderedNote);

    setNotes(updatedNotes);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Note Maker</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(provided) => (
                    <div
                      className="bg-[red] p-2 mb-2 rounded-md shadow-sm cursor-move"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{note.content}</p>
                        <span
                          className={`px-2 py-1 text-xs rounded-md ${
                            note.category === 'todo' ? 'bg-blue-200 text-blue-800' :
                            note.category === 'in-progress' ? 'bg-yellow-200 text-yellow-800' :
                            note.category === 'done' ? 'bg-green-200 text-green-800' : ''
                          }`}
                        >
                          {note.category}
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default NoteMaker;
