import React, { useState } from 'react';

function ViewArchivedListsButton() {
  const [showArchivedLists, setShowArchivedLists] = useState(false);

  const onClick = () => {
    setShowArchivedLists(!showArchivedLists);
  };

  return (
    <div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClick}>
        {showArchivedLists ? 'View Active Lists' : 'View Archived Lists'}
      </button>
      {/* rest of the component code */}
    </div>
  );
}

export default ViewArchivedListsButton;