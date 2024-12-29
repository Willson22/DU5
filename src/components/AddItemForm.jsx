import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const AddItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState('');
  const { language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      onAddItem(newItem);
      setNewItem('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        placeholder={translations[language].addNewItem}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit" className="button button-primary">
        {translations[language].add}
      </button>
    </form>
  );
};

export default AddItemForm;
