import React, { useState } from "react";
import { marked } from "marked";

// ReadmePreviewer for editing and previewing .readme files
const ReadmePreviewer = ({ content, setReadme, filePath, fileName }) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [formattedContent, setFormattedContent] = useState(content);

  const togglePreview = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      setFormattedContent(content);
    }
  };

  const handleInputChange = (newContent) => {
    setFormattedContent(newContent);
    setReadme(filePath, newContent);
  };

  // Function to render markdown content as HTML
  const renderMarkdown = (markdown) => {
    return { __html: marked.parse(markdown) }; // Use marked library to parse markdown to HTML
  };

  return (
    <div className="p-6 bg-gray-800 h-full text-white">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">{fileName}</h2>
        <h2 className="text-lg font-semibold">Readme Editor</h2>
        <button
          onClick={togglePreview}
          className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          {previewMode ? "Edit" : "Preview"}
        </button>
      </div>
      {!previewMode ? (
        <textarea
          value={formattedContent}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full min-h-[300px] md:min-h-[400px] border border-gray-600 p-2 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
          placeholder="Type your README content here..."
        />
      ) : (
        <div
          className="markdown-body h-[90%] overflow-y-auto bg-gray-700 text-white p-4"
          style={{ minHeight: "300px" }}
        >
          {/* Render the markdown content as HTML */}
          <div dangerouslySetInnerHTML={renderMarkdown(formattedContent)} />
        </div>
      )}
    </div>
  );
};

export default ReadmePreviewer;
