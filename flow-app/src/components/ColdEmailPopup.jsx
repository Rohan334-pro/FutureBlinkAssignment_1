import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

const mailTemplates = [
  'SalesBlink LTD-1 SignUp',
  'SalesBlink LTD-2 SignUp',
  'SalesBlink LTD-3 SignUp',
  '[GWA] Email Verification',
  '[Shopify] Announcement Bar-1',
  '[Shopify] Announcement Bar-2',
  '[Shopify] Announcement Bar-3'
];

export default function ColdEmailPopup({ isOpen, onRequestClose, onInsert }) {
  const [mailTemplate, setMailTemplate] = useState('Search for List(s)');

  const handleInsert = () => {
    if (mailTemplate !== 'Search for List(s)') {
      const labelHtml = `faEnvelope###purple###<strong>Email Template: </strong><h4 class='color-purple'>${mailTemplate}</h4>`;
      const emailsArray = [];
      onInsert(labelHtml, emailsArray, 'faEnvelope', 'purple');
      setMailTemplate('Search for List(s)'); // Reset selection
      onRequestClose(); // Optionally close modal
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <div className="flex flex-between border-bt-sm pd-bt-sm">
        <h3 className="text-lg font-semibold mb-4">Cold Email</h3>
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-10 text-gray-600 text-xl bt-sm"
        >
          &times;
        </button>
      </div>
      <div className="pd-lr-16">
        <form className="mt-4">
          <div className="launch-field col-flex">
            <label>Search for Email template(s)</label>
            <select
              value={mailTemplate}
              onChange={e => setMailTemplate(e.target.value)}
            >
              <option disabled>Search for List(s)</option>
              {mailTemplates.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {mailTemplate !== 'Search for List(s)' && (
            <div className="flex flex-end">
              <button
                type="button"
                onClick={handleInsert}
                className="button mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Insert
              </button>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
}
