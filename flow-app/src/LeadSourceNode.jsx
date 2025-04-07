import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LeadSourcePopup from "./components/LeadSourcePopup";

function LeadSourceNode({ data, onInsert }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      <div
        className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 w-60 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon icon={faPlus} className="text-2xl mb-2" />
          <h4 className="font-semibold text-base mb-1 mt-1">Add Lead Source</h4>
          <p className="text-sm text-gray-500 mb-0">
            Click to add leads from list or CRM
          </p>
        </div>
      </div>

      <LeadSourcePopup
        isOpen={showPopup}
        onRequestClose={closePopup}
        onInsert={(label) => {
          data?.onInsert?.(label); 
          closePopup();
        }}
      />
    </>
  );
}

export default LeadSourceNode;
