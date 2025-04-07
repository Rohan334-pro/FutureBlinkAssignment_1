// src/nodes/SequenceStartNode.jsx
import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

function SequenceStartNode({ data ,isConnectable}) {
  const [showPopup, setShowPopup] = useState(false);
  
    const handleClick = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);
  
  return (
    <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-300 ">
      <div className="font-semibold text-base mb-3 mt-3 mr-3 ml-3">Sequence Start Point</div>
      <Handle type="source" position={Position.Bottom} />
      <Handle
              type="target"
              position={Position.Top}
              isConnectable={isConnectable}
            /> 
    </div>
  );
}

export default SequenceStartNode;
