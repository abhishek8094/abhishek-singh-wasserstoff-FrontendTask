import { useState } from 'react';
import { marked } from 'marked';

const ReadmePreview = () => {
  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="bg-white p-4 text-black shadow-md rounded-lg">
      <textarea
        className="w-full h-48 border p-2"
        placeholder="Enter README content here..."
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Preview</h3>
        <div
          className="bg-gray-100 p-4 rounded"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        ></div>
      </div>
    </div>
  );
};

export default ReadmePreview;
