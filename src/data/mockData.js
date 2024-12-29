export const mockLists = [
  {
    id: '1',
    name: 'Small shopping',
    members: ['user1', 'user2'],
    items: [
      { id: 'item1', name: 'Water', resolved: false },
      { id: 'item2', name: 'Bread', resolved: true },
    ],
    archived: false,
  },
  {
    id: '2',
    name: 'Mall',
    members: ['user3'],
    items: [
      { id: 'item3', name: 'Biscuit', resolved: false },
    ],
    archived: false,
  },
];

export const fetchMockLists = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockLists]);
    }, 300);
  });
};

export const fetchMockListById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = mockLists.find((list) => list.id === id);
      if (list) resolve({ ...list });
      else reject(new Error('Shopping list not found.'));
    }, 300);
  });
};

export const updateMockList = async (updatedList) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockLists.findIndex((list) => list.id === updatedList.id);
      if (index > -1) {
        mockLists[index] = { ...mockLists[index], ...updatedList };
      } else {
        mockLists.push(updatedList);
      }
      resolve({ ...updatedList });
    }, 300);
  });
};

export const deleteMockListById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockLists.findIndex((list) => list.id === id);
      if (index > -1) {
        mockLists.splice(index, 1);
        resolve();
      } else {
        throw new Error('Shopping list not found.');
      }
    }, 300);
  });
};

export const useMockData = import.meta.env.VITE_USE_MOCK === 'true';