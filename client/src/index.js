import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import OptionStore from "./store/OptionStore";
import App from "./App.js";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        optionDevice: new OptionStore()
    }}>
        <App/>
    </Context.Provider>
);

