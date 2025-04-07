// src/Header.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faRocket} from '@fortawesome/free-solid-svg-icons';
import './index.css';
import SaveAndSchedulePopup from "./components/SaveAndSchedulePopup";
export default function Header() {
  const [showPopup, setShowPopup] = useState(false);
  
    const handleClick = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);
  return (
    <header className=" bg-white border-b">
      <div className="flex items-center justify-between">
        {/* Left side: Title and Help Text */}
        <div className="flex-3">
          <h3 className="strong">Delete <FontAwesomeIcon icon={faPencil} /></h3>
          <p className="text-gray-500 text-sm mb-0">
            Click on a block to configure and add it in sequence.
          </p>
        </div>
        {/* Right side: Save & Schedule Button */}
        <div>
          <button onClick={handleClick} className="button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          <FontAwesomeIcon className=" pr-8" icon={faRocket}/>
            Save & Schedule
          </button>
        </div>
      </div>
      <SaveAndSchedulePopup isOpen={showPopup} onRequestClose={closePopup} />
    </header>
  );
}
