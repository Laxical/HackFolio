// src/components/Layout.jsx
import React from 'react';
import ReactingNavBar from './ReactingNavBar';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  console.log("Children being passed into Layout:", children); // Debugging step

  return (
    <div className="body">
      <div className="flex">
        <ReactingNavBar />
        <div className="space-y-3 size-full bg-customBlue">
          <Header />
          <div className="space-y-3">
            {children} {/* This is where the page content should appear */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
