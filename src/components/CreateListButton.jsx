import React from 'react';
import '../App.css';


const CreateListButton = ({ onClick }) => {
  return (
    <button
      className="button button-primary"
      onClick={onClick}
    >
      + Create New List
    </button>
  );
};

export default CreateListButton;
