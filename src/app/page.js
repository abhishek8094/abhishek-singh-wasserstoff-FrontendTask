"use client"
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TextEditor from "@/components/TextEditor";
import NoteMaker from "@/components/NoteMaker";
import ListMaker from "@/components/ListMaker";
import ReadmePreview from "@/components/ReadmePreview";


export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const renderContent = () => {
    if (selectedFile) {
      const extension = selectedFile.split('.').pop();
      switch (extension) {
        case 'ed':
          return <TextEditor />;
        case 'note':
          return <NoteMaker />;
        case 'lt':
          return <ListMaker />;
        case 'readme':
          return <ReadmePreview />;
        default:
          return null;
      }
    } else {
      return <div className="p-5 text-white">Select a file to open it.</div>;
    }
  };
 
  return (
    <div className="flex h-screen">
      <Sidebar onSelectFile={setSelectedFile}  />
      <div className="flex-1 p-4">{renderContent()}</div>
    </div>
  );
}
