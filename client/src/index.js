import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppDragDropDemo from './AppDragDropDemo';
import AppSlideShow from './AppSlideShow';
import AppWithModal from './AppWithModal';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppDragDropDemo />, document.getElementById('root'));
registerServiceWorker();
