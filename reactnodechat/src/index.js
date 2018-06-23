import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Board from './Board';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();
