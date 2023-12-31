import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { UserInfoPage } from './pages/UserInfoPage';
import { NotesPage } from './pages/NotesPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<UserInfoPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='notes' element={<NotesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
