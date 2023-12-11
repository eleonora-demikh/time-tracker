import React from "react";
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';

export const Layout = () => {
  return (
    <div className='flex justify-center flex-col font-medium text-sm w-screen max-w-screen-md'>
      <Header />
      <Outlet />
    </div>
  );
}
