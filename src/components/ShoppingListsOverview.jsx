import React, { useEffect, useState } from 'react';
import ShoppingListModal from './CreateShoppingListModal';
import DeleteListConfirmationModal from './DeleteListConfirmationModal';
import ShoppingListCard from './ShoppingListCard';
import {
  fetchMockLists,
  updateMockList,
  deleteMockListById,
  useMockData,
} from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { translations } from '../data/translations';

const ShoppingListsOverview = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (useMockData) {
          const data = await fetchMockLists();
          setShoppingLists(data);
        } else {
          const response = await axios.get('/api/lists');
          setShoppingLists(response.data);
        }
      } catch (err) {
        console.error(err);
        setError(translations[language].errorLoadLists);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const handleCreateList = async (newList) => {
    try {
      const createdList = { ...newList, id: Date.now().toString() };
      if (useMockData) {
        await updateMockList(createdList);
      }
      setShoppingLists([...shoppingLists, createdList]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(translations[language].errorCreateList);
    }
  };

  const handleDeleteList = (id) => {
    setListToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteList = async () => {
    try {
      if (useMockData) {
        await deleteMockListById(listToDelete);
      }
      setShoppingLists(shoppingLists.filter((list) => list.id !== listToDelete));
      setListToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(translations[language].errorDeleteList);
    }
  };

  const handleArchiveList = async (id) => {
    try {
      const updatedList = shoppingLists.find((list) => list.id === id);
      if (updatedList) {
        const toggledList = { ...updatedList, archived: !updatedList.archived };
        if (useMockData) {
          await updateMockList(toggledList);
        }
        setShoppingLists(
          shoppingLists.map((list) =>
            list.id === id ? toggledList : list
          )
        );
      }
    } catch (err) {
      console.error(err);
      setError(translations[language].errorUpdateList);
    }
  };

  const filteredLists = shoppingLists.filter((list) => list.archived === showArchived);

  if (loading) return <div>{translations[language].loading}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`container ${theme}`}> {/* Apply theme */}
      <div className="actions">
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en">English</option>
          <option value="cz">Čeština</option>
        </select>
        <button onClick={toggleTheme}>
          {theme === 'light' ? translations[language].darkMode : translations[language].lightMode}
        </button>
      </div>
      <h1>{translations[language].shoppingLists}</h1>
      <div className="actions">
        <button className="button button-primary" onClick={() => setIsModalOpen(true)}>
          + {translations[language].createList}
        </button>
        <button className="button button-outline" onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? translations[language].activeLists : translations[language].archivedLists}
        </button>
      </div>
      <div className="list-grid">
        {filteredLists.map((list) => (
          <ShoppingListCard
            key={list.id}
            list={list}
            onDelete={handleDeleteList}
            onArchive={handleArchiveList}
            onClick={() => navigate(`/shopping-list-details/${list.id}`)}
          />
        ))}
      </div>
  
      {isModalOpen && (
        <ShoppingListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateList={handleCreateList}
        />
      )}
  
      {isDeleteModalOpen && (
        <DeleteListConfirmationModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={confirmDeleteList}
        />
      )}
    </div>
  );
  
};

export default ShoppingListsOverview;
