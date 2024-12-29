import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const ItemsList = ({ items, onToggleItem, onRemoveItem, showResolved }) => {
  const filteredItems = showResolved ? items : items.filter((item) => !item.resolved);
  const { language } = useLanguage();

  return (
    <div className="items">
      <h2>{translations[language].items}</h2>
      {filteredItems.map((item) => (
        <div key={item.id} className="item">
          <input
            type="checkbox"
            checked={item.resolved}
            onChange={() => onToggleItem(item.id)}
            className="checkbox"
          />
          <span className={item.resolved ? 'resolved' : ''}>{item.name}</span>
          <button
            className="button button-icon"
            onClick={() => onRemoveItem(item.id)}
            aria-label="Remove item"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
