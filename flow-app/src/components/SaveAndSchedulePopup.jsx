import React from "react";
import Modal from "react-modal";
import EmailSchedulerForm from "./EmailSchedulerForm";

Modal.setAppElement('#root');

export default function SaveAndSchedulePopup({ isOpen, onRequestClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="modal-overlay"
            className="modal-content"
        >
            <div className="flex flex-between border-bt-sm pd-bt-sm">
                <h3 className="text-lg font-semibold mb-4">Save and Schedule </h3>
                <button
                    onClick={onRequestClose}
                    className="absolute top-2 right-10 text-gray-600 text-xl bt-sm"
                >
                    &times;
                </button>
            </div>


            <div className="">
                <EmailSchedulerForm />
            </div>
        </Modal>
    );
}
