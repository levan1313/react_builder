import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import ResponsiveSwitcher from './ResponsiveSwitcher';

interface ToolboxItemProps {
  type: string;
  label: string;
}

const ToolboxItem: React.FC<ToolboxItemProps> = ({ type, label }) => {
  const [, drag] = useDrag(() => ({
    type: 'element',
    item: { type },
  }));

  return (
    <div
      ref={drag}
      style={{ padding: '10px', border: '1px solid #ccc', margin: '5px', cursor: 'grab' }}
    >
      {label}
    </div>
  );
};

// Correctly defining the Toolbox component and its props
interface ToolboxProps {
  children?: React.ReactNode; // Accept children prop
  onExport: () => void;
}

const Toolbox: React.FC<ToolboxProps> = ({ onExport, children }) => {
  return (
    <div style={{ width: '200px', border: '1px solid black', padding: '10px' }}>
      <h3>Toolbox</h3>
      
      <ToolboxItem type="leaderboard" label="Leaderboard" />
      <ToolboxItem type="banner" label="Banner" />
      {children /* Render the children prop */}

      <button
        onClick={onExport}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Export HTML
      </button>
    </div>
  );
};

export default Toolbox;
