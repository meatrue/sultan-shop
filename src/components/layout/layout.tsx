import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import classes from './layout.module.scss';

const Layout: React.FC = () => {
  return (
    <>
      <Header />

      <main className={classes.main}>
        <div className="wrapper">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
