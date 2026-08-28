import './ConfirmModal.css'

function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        /* Clicking the backdrop cancels */
        <div className="modal-backdrop" onClick={onCancel}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button className="btn btn-modal-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-modal-delete" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
