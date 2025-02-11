import React from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';
import App from './App';

const container = document.getElementById('result')

const loadingElement:HTMLElement | null  = document.getElementById('loading')

if (loadingElement !== null) {
  loadingElement.remove() //after loading delete temporary message -> shorter version document.getElementById('loading')?.remove();
}

if (container) {
  const root = createRoot(container); 
  root.render(<App />);
} else {
  console.error("Container element with ID 'result' not found.");
}
