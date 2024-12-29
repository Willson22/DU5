import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ShoppingListsOverview from './components/ShoppingListsOverview';
import ShoppingListDetails from './components/ShoppingListDetails';
import'./App.css';

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
         <Routes>
            <Route path="/" element={<ShoppingListsOverview />} />
            <Route path="/shopping-list-details/:id" element={<ShoppingListDetails />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;


/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingListsOverview from './components/ShoppingListsOverview';
import ShoppingListDetails from './components/ShoppingListDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingListsOverview />} />
        <Route path="list/:id" element={<ShoppingListDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
*/