import React from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';
import App from './App.tsx';

const container = document.getElementById('result')

const loadingElement:HTMLElement | null  = document.getElementById('loading')

if (loadingElement !== null) {
  loadingElement.remove() //after loading delete temporary message
}

//document.getElementById('loading')?.remove();

const root = createRoot(container);
root.render(<App />)