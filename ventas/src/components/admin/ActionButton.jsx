// ProductActionButton.js
import React from 'react';

const ActionButton = ({ actionType, onClick }) => {
    return (
        <button
            className={`btn ${actionType === 'edit' ? 'btn-warning' : 'btn-danger'} btn-sm`}
            onClick={onClick}
        >
            <i className={`fas ${actionType === 'edit' ? 'fa-edit' : 'fa-trash-alt'}`}></i>
        </button>
    );
};

export default ActionButton;