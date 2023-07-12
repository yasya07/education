import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";

import './index.css';
import {Toaster} from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <Toaster position="top-center"/>
            <App/>
        </Router>
    </Provider>
);