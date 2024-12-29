import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const ListNameEditor = ({ name, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const { language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedName);
    setIsEditing(false);
  };

  return (
    <div className="card-header">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
        </form>
      ) : (
        <h1 className="card-title">{name}</h1>
      )}
      {!isEditing && (
        <button className="button" onClick={() => setIsEditing(true)}>
          {translations[language].editName}
        </button>
      )}
    </div>
  );
};

export default ListNameEditor;
