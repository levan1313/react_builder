import React, { FC } from "react";

interface EditorLayoutProps {
  Header: React.ReactNode;
  Main: React.ReactNode;
  Toolbox: React.ReactNode;
}

const EditorLayout: FC<EditorLayoutProps> = ({ Header, Main, Toolbox }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-500">
      {/* Header */}
      <header className="bg-red-500 h-16 flex items-center justify-center text-white font-bold fixed top-0 left-0 right-0 z-10">
        {Header}
      </header>

      {/* Main Content Area */}
      <div className="flex flex-grow mt-16">
        {/* Main Content */}
        <main className="flex-grow bg-white p-4 overflow-auto max-h-[calc(100vh-4rem)]">
          {Main}
        </main>

        {/* Toolbox */}
        <aside className="bg-blue-500 w-60 h-full max-h-[calc(100vh-4rem)] p-4 text-white fixed top-16 right-0">
          {Toolbox}
        </aside>
      </div>
    </div>
  );
};

export default EditorLayout;
