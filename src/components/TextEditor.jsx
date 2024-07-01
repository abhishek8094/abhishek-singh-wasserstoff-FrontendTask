const Editor = () => {
  return (
    <div className="bg-white p-4 text-black text-2xl shadow-md rounded-lg">
      <textarea
        className="w-full h-full border-none focus:outline-none"
        placeholder="Start typing your code..."
      ></textarea>
    </div>
  );
};

export default Editor;
