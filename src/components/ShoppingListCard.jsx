import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations'; // Import translations

const ShoppingListCard = ({ list, onArchive, onDelete, onClick }) => {
  const { language } = useLanguage();

  return (
    <div className="list-card" onClick={onClick}>
      <div className="list-card-content">
        <h3>{list.name}</h3>
        <div className="actions">
          <button
            className="button button-outline"
            onClick={(e) => {
              e.stopPropagation();
              onArchive(list.id);
            }}
          >
            {list.archived
              ? translations[language].unarchive
              : translations[language].archive}
          </button>
          <button
            className="button button-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(list.id);
            }}
          >
            {translations[language].delete}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListCard;
