import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Toolbox from "../components/Toolbox";
import DropZone from "../components/DropZone";
import Leaderboard from "../components/elements/Leaderboard"; // Reusable Leaderboard Component
import Banner from "../components/elements/Banner"; // Reusable Banner Component
import {
  Element,
  LeaderboardElement,
  BannerElement,
} from "../components/elements/ElementTypes";
import "../App.css";
import "../components/elements/Leaderboard.css"; // Import CSS file directly

import leaderboardCSS from "../components/elements/Leaderboard.css?inline";
import ResponsiveSwitcher from "../components/ResponsiveSwitcher";
import EditorLayout from "../components/EditorLayout";
import Header from "../components/Header";

// Dummy Data for Leaderboard
const leaderboardData = [
  {
    place: 1,
    player: "User12x",
    points: 12000,
    prize: 5000,
    image: "./images/placement1.png",
  },
  {
    place: 2,
    player: "User83747x",
    points: 11800,
    prize: 1500,
    image: "./images/placement2.png",
  },
  {
    place: 3,
    player: "User4678x",
    points: 5402,
    prize: 80,
    image: "./images/placement3.png",
  },
  { place: 4, player: "User1234x", points: 5100, prize: 20 },
  { place: 5, player: "User5678x", points: 4900, prize: 10 },
];

const Editor: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );

  // Add Element to DropZone
  const handleDrop = (item: { type: string }): void => {
    const newElement: Element =
      item.type === "leaderboard"
        ? ({
            id: `leaderboard-${Date.now()}`,
            type: "leaderboard",
            backgroundColor: "#ffffff",
            title: "Leaderboard",
            data: leaderboardData,
            textColor: "black",
          } as LeaderboardElement)
        : ({
            id: `banner-${Date.now()}`,
            type: "banner",
            backgroundColor: "#ffffff",
            text: "Welcome to our website!",
            imageUrl: "https://via.placeholder.com/300",
          } as BannerElement);

    setElements((prev) => [...prev, newElement]);
  };

  // Select an Element to Edit
  const handleSelectElement = (id: string): void => {
    setSelectedElementId(id);
  };

  // Update Element Background Color
  const handleChangeBackgroundColor = (color: string): void => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === selectedElementId
          ? { ...element, backgroundColor: color }
          : element
      )
    );
  };

  // Upload Image for Banner
  const handleImageUpload = (file: File): void => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      setElements((prev) =>
        prev.map((element) =>
          element.id === selectedElementId && element.type === "banner"
            ? { ...element, imageUrl }
            : element
        )
      );
    };
    reader.readAsDataURL(file);
  };

  // Generate HTML for Export
  const GenerateHTML = () => (
    <>
      {elements.map((element, index) => {
        if (element.type === "leaderboard") {
          return (
            <Leaderboard key={index} element={element as LeaderboardElement} />
          );
        }
        if (element.type === "banner") {
          return <Banner key={index} element={element as BannerElement} />;
        }
        return null;
      })}
    </>
  );

  // Export HTML
  const handleExport = (): void => {
    const htmlString = ReactDOMServer.renderToString(<GenerateHTML />);
    const fullHtmlString = `
      <html>
        <head>
        <link href="https://www.cdnfonts.com/satoshi.font" rel="stylesheet" type="text/css">
        <style>
        body {
    font-family: 'Satoshi', sans-serif;
}
   
        
        ${leaderboardCSS}
            
          </style>
        </head>
        <body>
          ${htmlString}
        </body>
      </html>
    `;
    const blob = new Blob([fullHtmlString], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported_page.html";
    link.click();
  };

  // Selected Element for Settings
  const selectedElement = elements.find(
    (element) => element.id === selectedElementId
  );

  const Main = () => {
   return <DropZone
   onDrop={handleDrop}
   elements={elements}
   onSelectElement={handleSelectElement}
 />
  }


  const ToolboxContainer = () => {
    return  <Toolbox onExport={handleExport}>
    {selectedElement && (
      <div
        style={{
          padding: "10px",
          border: "1px solid black",
          marginTop: "10px",
        }}
      >
        <h4>Settings</h4>
        <p>
          Editing: <strong>{selectedElement.type}</strong>
        </p>
        <label>
          Background Color:
          <input
            type="color"
            value={selectedElement.backgroundColor || "#ffffff"}
            onChange={(e) =>
              handleChangeBackgroundColor(e.target.value)
            }
            style={{ marginLeft: "10px" }}
          />
        </label>
        {selectedElement.type === "leaderboard" && (
          <label style={{ display: "block", marginTop: "10px" }}>
            Text Color:
            <select
              value={(selectedElement as LeaderboardElement).textColor}
              onChange={(e) =>
                setElements((prev) =>
                  prev.map((el: any) =>
                    el.id === selectedElement.id
                      ? { ...el, textColor: e.target.value }
                      : el
                  )
                )
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="black">Black</option>
              <option value="white">White</option>
            </select>
          </label>
        )}
        {selectedElement.type === "banner" && (
          <>
            <label style={{ display: "block", marginTop: "10px" }}>
              Upload Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files
                    ? handleImageUpload(e.target.files[0])
                    : null
                }
                style={{ marginLeft: "10px" }}
              />
            </label>
            <div style={{ marginTop: "10px" }}>
              <strong>Preview:</strong>
              <img
                src={(selectedElement as BannerElement).imageUrl}
                alt="Banner Preview"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          </>
        )}
      </div>
    )}
  </Toolbox>
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <EditorLayout Header={<Header />} Main={<Main />} Toolbox={<ToolboxContainer/>}></EditorLayout>
    </DndProvider>
  );
};

export default Editor;
