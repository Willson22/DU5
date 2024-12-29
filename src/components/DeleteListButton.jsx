import React from 'react';

const DeleteListButton = ({ onDelete }) => {
  return (
    <button 
      className="button button-danger" 
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      aria-label="Delete list"
    >
      Delete
    </button>
  );
};

export default DeleteListButton;

