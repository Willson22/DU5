import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const DeleteListConfirmationModal = ({ onClose, onConfirmDelete }) => {
  const { language } = useLanguage();

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-header">{translations[language].deleteListTitle}</h2>
        <p>{translations[language].deleteListMessage}</p>
        <div className="modal-footer">
          <button
            type="button"
            className="button button-outline"
            onClick={onClose}
          >
            {translations[language].cancel}
          </button>
          <button
            type="button"
            className="button button-danger"
            onClick={onConfirmDelete}
          >
            {translations[language].delete}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteListConfirmationModal;
