import React, { useState } from "react";
import Modal from "react-modal";
import BlockButton from "./BlockButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faUserCheck, faPeopleArrows, faBolt
} from '@fortawesome/free-solid-svg-icons';

import LeadFromListPopup from "./LeadFromListPopup"; // import the nested popup

Modal.setAppElement('#root');

export default function LeadSourcePopup({ isOpen, onRequestClose, onInsert }) {
  const [isListPopupOpen, setIsListPopupOpen] = useState(false);

  return (
    <>
      {/* Outer Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="flex flex-between border-bt-sm pd-bt-sm">
          <h3 className="text-lg font-semibold mb-4">Lead Source Setup </h3>
          <button
            onClick={onRequestClose}
            className="absolute top-2 right-10 text-gray-600 text-xl bt-sm"
          >
            &times;
          </button>
        </div>


        <div className="pd-lr-16">
          <p className="mt-4 text-sm text-gray-600">
            Choose your lead source type.
          </p>
          <div className="flex justify-between gap-32">
            <BlockButton
              icon={<FontAwesomeIcon icon={faUserPlus} />}
              title="Leads from List(s)"
              color="pink"
              description="Connect Multiple list source for this sequence."
              onClick={() => setIsListPopupOpen(true)}
            />
            <BlockButton
              icon={<FontAwesomeIcon icon={faUserCheck} />}
              title="Segment by Event"
              color="pink"
              description="Segment users based on event history."
            />
          </div>
          <div className="flex justify-between gap-32 mt-4">
            <BlockButton
              icon={<FontAwesomeIcon icon={faPeopleArrows} />}
              title="Segment of List"
              color="pink"
              description="Segment leads matching SalesBlink variable."
            />
            <BlockButton
              icon={<FontAwesomeIcon icon={faBolt} />}
              title="Leads from CRM integration"
              color="pink"
              description="Pull leads from your CRM integration."
            />
          </div>
        </div>
      </Modal>

      {/* Nested Modal */}
      <LeadFromListPopup
        isOpen={isListPopupOpen}
        onRequestClose={() => setIsListPopupOpen(false)}
        onInsert={(data) => {
          onInsert(data);         // Pass label to parent to add node
          setIsListPopupOpen(false); // Close nested popup
        }}
      />
    </>
  );
}
