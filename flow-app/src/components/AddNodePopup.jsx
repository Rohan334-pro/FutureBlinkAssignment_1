import React, { useState } from "react";
import Modal from "react-modal";
import BlockButton from "./BlockButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheckCircle, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import ColdEmailPopup from "./ColdEmailPopup";
Modal.setAppElement('#root');

export default function AddNodePopup({ isOpen, onRequestClose, onInsert }) {
  const [isColdMailOpen, setColdMailOpen] = useState(false);

  const handleColdEmailClick = () => {
    setColdMailOpen(true);
  };

  return (
    <>
      {/* Main AddNode Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="flex flex-between border-bt-sm pd-bt-sm">
          <h3 className="text-lg font-semibold mb-4">Add Blocks</h3>
          <button
            onClick={onRequestClose}
            className="absolute top-2 right-10 text-gray-600 text-xl bt-sm"
          >
            &times;
          </button>
        </div>
        <div className="pd-lr-16 mt-4">
          <p className="text-sm text-gray-600">
            Click on a block to configure and add it in sequence.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-4">Outreach</h3>
            <div className="flex justify-between gap-40">
              <BlockButton
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                title="Cold Email"
                color="purple"
                description="Send an email to a lead."
                onClick={handleColdEmailClick} // 👈 Hook in the cold mail modal
              />
              <BlockButton
                icon={<FontAwesomeIcon icon={faCheckCircle} />}
                title="Task"
                color="purple"
                description="Schedule a manual task"
                onClick={() => alert("Task block clicked (not wired yet)")}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Cold Email Modal (Nested) */}
      <ColdEmailPopup
        isOpen={isColdMailOpen}
        onRequestClose={() => setColdMailOpen(false)}
        onInsert={(label) => {
          onInsert(label); // propagate up
          setColdMailOpen(false); // close coldmail popup
          onRequestClose(); // close AddNodePopup
        }}
      />
    </>
  );
}
