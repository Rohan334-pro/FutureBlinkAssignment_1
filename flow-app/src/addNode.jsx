import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Handle, Position } from "@xyflow/react";
import AddNodePopup from "./components/addNodePopUp";

function addNode({ data, isConnectable }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      <div
        className="bg-white rounded-xl p-4 shadow-lg  br-clr cursor-pointer"
        onClick={handleClick}
      >
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <div className="flex flex-col items-center text-center fnt-clr">
          <FontAwesomeIcon icon={faPlus} className="text-2xl " />
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
        />
      </div>
      <AddNodePopup isOpen={showPopup}
        onRequestClose={closePopup}
        onInsert={(label) => {
          data?.onInsert?.(label);
          closePopup();
        }} />
    </>
  );
}
export default addNode;