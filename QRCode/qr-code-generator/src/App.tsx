import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import URLShortener from './components/URLShortener';
import './App.css';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <QRCodeGenerator />
      <URLShortener />
    </div>
  );
};

export default App;