import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListNameEditor from './ListNameEditor';
import MembersList from './MembersList';
import ItemsList from './ItemsList';
import AddItemForm from './AddItemForm';
import { fetchMockListById, updateMockList } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { translations } from '../data/translations';

const ShoppingListDetails = () => {
  const { id: listId } = useParams();
  const [shoppingList, setShoppingList] = useState(null);
  const [showResolved, setShowResolved] = useState(false);
  const [error, setError] = useState(null);

  const { language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await fetchMockListById(listId);
        setShoppingList(data);
      } catch (err) {
        console.error(err);
        setError(translations[language].errorLoadList);
      }
    };

    fetchList();
  }, [listId, language]);

  const updateList = async (updatedFields) => {
    try {
      const updatedList = { ...shoppingList, ...updatedFields };
      setShoppingList(updatedList);
      await updateMockList(updatedList);
    } catch {
      setError(translations[language].errorUpdateList);
    }
  };

  if (!shoppingList) return <div>{translations[language].loading}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`card ${theme}`}> {/* Apply theme class */}
      <ListNameEditor
        name={shoppingList.name}
        onEdit={(newName) => updateList({ name: newName })}
      />
      <MembersList
        members={shoppingList.members}
        onAddMember={(newMember) =>
          updateList({ members: [...shoppingList.members, newMember] })
        }
        onRemoveMember={(memberId) =>
          updateList({
            members: shoppingList.members.filter((id) => id !== memberId),
          })
        }
      />
      <AddItemForm
        onAddItem={(newItem) =>
          updateList({
            items: [
              ...shoppingList.items,
              { id: Date.now().toString(), name: newItem, resolved: false },
            ],
          })
        }
      />
      <ItemsList
        items={shoppingList.items}
        onToggleItem={(itemId) =>
          updateList({
            items: shoppingList.items.map((item) =>
              item.id === itemId
                ? { ...item, resolved: !item.resolved }
                : item
            ),
          })
        }
        onRemoveItem={(itemId) =>
          updateList({
            items: shoppingList.items.filter((item) => item.id !== itemId),
          })
        }
        showResolved={showResolved}
      />
      <div className="actions">
        <button className="button" onClick={() => setShowResolved(!showResolved)}>
          {showResolved
            ? translations[language].hideResolved
            : translations[language].showResolved}
        </button>
      </div>
    </div>
  );
  
};

export default ShoppingListDetails;
