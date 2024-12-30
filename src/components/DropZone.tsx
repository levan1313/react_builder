import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Leaderboard from './elements/Leaderboard';
import Banner from './elements/Banner';
import { BannerElement, Element, LeaderboardElement } from './elements/ElementTypes';


interface DropZoneProps {
  onDrop: (item: { type: string }) => void; // Function to handle dropped elements
  elements: Element[]; // List of elements in the DropZone
  onSelectElement: (id: string) => void; // Function to handle element selection
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop, elements, onSelectElement }) => {
  const [, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { type: string }) => onDrop(item),
  }));

  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  console.log(elements);
  return (
    <div
      ref={drop}
      style={{
        height: 'auto',
        border: '2px dashed #ccc',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        position: 'relative',
        width: '100%',
      }}
    >
      {elements.map((element) => {
        const isHovered = hoveredElementId === element.id;

        return (
          <div
            key={element.id}
            onMouseEnter={() => setHoveredElementId(element.id)}
            onMouseLeave={() => setHoveredElementId(null)}
            style={{
              position: 'relative',
              marginBottom: '10px',
              padding: '10px',
              // backgroundColor: element.backgroundColor || '#fff',
              border: '1px solid #ccc',
            }}
          >
            {/* Render Element Dynamically */}
            {element.type === 'leaderboard' && (
              <Leaderboard
                element={element as LeaderboardElement} // Type assertion for leaderboard
              />
            )}
            {element.type === 'banner' && (
              <Banner
                element={element as BannerElement} // Type assertion for banner
              />
            )}

            {/* Settings Button */}
            {isHovered && (
              <button
                onClick={() => onSelectElement(element.id)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  padding: '5px',
                  cursor: 'pointer',
                  zIndex: 1,
                }}
              >
                ⚙
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DropZone;
