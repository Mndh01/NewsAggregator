import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import useBlogUtils from './shared/hooks/useBlogUtils';
import MainNavigation from './shared/UIElements/MainNavigation/MainNavigation';
import Blogs from './pages/Blogs/Blogs';
import Footer from './shared/UIElements/Footer/Footer';
import Loader from './shared/UIElements/Loader/Loader';

const App = () => {
  const {
    isLoading,

  } = useBlogUtils();

  return (
    <Router>
      {isLoading && <Loader />}
      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <MainNavigation />
        <main className='my-3 flex-grow-1'>
          <Routes>
            <Route path="" exact element={<Blogs />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
