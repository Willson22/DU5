import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const ShoppingListModal = ({ isOpen, onClose, onCreateList }) => {
  const [listName, setListName] = useState('');
  const [invitedMembers, setInvitedMembers] = useState('');
  const { language } = useLanguage();

  const handleCreateList = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      const newList = {
        id: uuidv4(),
        name: listName,
        members: invitedMembers.split(',').map((m) => m.trim()),
        items: [],
        archived: false,
      };
      onCreateList(newList);
      setListName('');
      setInvitedMembers('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-header">{translations[language].createList}</h2>
        <form onSubmit={handleCreateList} className="modal-form">
          <div className="modal-row">
            <input
              type="text"
              placeholder={translations[language].listNamePlaceholder}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="input"
            />
          </div>
          <div className="modal-row">
            <input
              type="text"
              placeholder={translations[language].inviteMembersPlaceholder}
              value={invitedMembers}
              onChange={(e) => setInvitedMembers(e.target.value)}
              className="input"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="button button-outline"
              onClick={onClose}
            >
              {translations[language].cancel}
            </button>
            <button type="submit" className="button button-primary">
              {translations[language].confirm}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShoppingListModal;
