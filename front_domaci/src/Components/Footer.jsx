import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#001f3f',
        color: 'white',
        fontSize: '14px',
        zIndex: 1000
      }}
    >
      FitApp © 2025. Sva prava zadržana.
    </footer>
  );
};

export default Footer;
