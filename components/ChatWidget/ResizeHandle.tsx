import React from 'react';
import { Minimize, Maximize } from 'lucide-react';

interface ResizeHandleProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onResizeStart: (e: React.MouseEvent) => void;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ isExpanded, onToggleExpand, onResizeStart }) => {
  return (
    <div className="absolute top-[26px] right-14 flex items-center">
      <button 
        onClick={onToggleExpand}
        className=" text-gray-400 hover:text-gray-600"
      >
        {isExpanded ? <Minimize size={16} /> : <Maximize size={16} />}
      </button>

    </div>
  );
};