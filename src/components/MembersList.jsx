import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const MembersList = ({ members, onAddMember, onRemoveMember }) => {
  const [newMember, setNewMember] = useState('');
  const { language } = useLanguage();

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMember.trim()) {
      onAddMember(newMember);
      setNewMember('');
    }
  };

  return (
    <div className="members">
      <h2>{translations[language].members}</h2>
      {members.map((memberId) => (
        <div key={memberId} className="member">
          <span>{memberId}</span>
          <button className="button" onClick={() => onRemoveMember(memberId)}>
            {translations[language].remove}
          </button>
        </div>
      ))}
      <form onSubmit={handleAddMember} className="form">
        <input
          className="input"
          placeholder={translations[language].addNewMember}
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button type="submit" className="button button-primary">
          {translations[language].addMember}
        </button>
      </form>
    </div>
  );
};

export default MembersList;
