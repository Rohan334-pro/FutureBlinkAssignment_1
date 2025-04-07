import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

const leadSources = [
    {
        name: 'SalesBlink LTD List',
        emails: ['rohan.kumbhar334@gmail.com','rohan.kumbhar4370@gmail.com']
    },
    {
        name: 'Shopify List',
        emails: ['rohan.kumbhar334@gmail.com', 'rohan.kumbhar4370@gmail.com']
    },
    {
        name: 'Demo List',
        emails: ['rohan.kumbhar334@gmail.com', 'rohan.kumbhar4370@gmail.com']
    },
    {
        name: 'Announcement Bar',
        emails: ['rohan.kumbhar334@gmail.com']
    }
];

export default function LeadFromListPopup({ isOpen, onRequestClose, onInsert }) {
    const [leadSource, setLeadSource] = useState('Search for List(s)');

    const handleInsert = () => {
        const selectedSource = leadSources.find(source => source.name === leadSource);
        if (selectedSource) {
            const labelHtml = `faUserPlus###pink###<strong>Leads from </strong><h4 class='color-pink'>${selectedSource.name}</h4>`;
            const emailsArray = selectedSource.emails;
        
            onInsert(labelHtml, emailsArray, 'faUserPlus', 'pink');
          setLeadSource(''); // reset selection
          onRequestClose();
        }
      };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="modal-overlay"
            className="modal-content"
        >
            <div className="flex justify-between border-bt-sm pd-bt-sm">
                <h3 className="text-lg font-semibold">Leads from List(s)</h3>
                <button
                    onClick={onRequestClose}
                    className="text-gray-600 text-xl"
                >
                    &times;
                </button>
            </div>
            <div className="pd-lr-16">
                <p className="mt-4">Connect multiple leads as source of this sequence</p>

                <form>
                    <div className="launch-field col-flex">
                        <label>Select your list(s)</label>
                      
                        <select
                            value={leadSource}
                            onChange={e => setLeadSource(e.target.value)}
                        >
                            <option disabled value="">Search for List(s)</option>
                            {leadSources.map(source => (
                                <option key={source.name} value={source.name}>{source.name}</option>
                            ))}
                        </select>

                    </div>

                    {/* Show Insert button only when a valid selection is made */}
                    {leadSource !== 'Search for List(s)' && (
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
