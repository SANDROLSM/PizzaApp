import './App.css';
import Header from './components/Header';
import './scss/app.scss';
import React from 'react';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import NotFound from './Pages/NotFound';
import { Route, Routes } from 'react-router-dom';

// const Cart = React.lazy(() => import('./Pages/Cart'));

export const SearchContext = React.createContext('');

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/cart'
            element={
              // <React.Suspense fallback={<div>Идет загрузка страницы</div>}>
                <Cart />
              // {/* </React.Suspense> */}
            }
          />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
