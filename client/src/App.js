import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const[isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        if(localStorage.email){
            check(localStorage.email).then(data=>{
                user.setUser(data)
                user.setIsAuth(true)
            }).finally(()=>setIsLoading(false))
        }
        else{setIsLoading(false)
        }
        },[])

    if (isLoading){
        return <div className="text-center py-5" style={{marginTop:120 }}>
                 <Spinner animation="border" variant="primary" style={{ width: 150, height: 150 }}/>
               </div>
    }

    return (
        <BrowserRouter>
          <NavBar/>
          <AppRouter/>
        </BrowserRouter>
    );
});

export default App;