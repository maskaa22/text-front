import './App.css';
import React, {useEffect, useState} from "react";
import Users from "./components/users/Users";
import Form from "./components/form/Form";

function App() {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/users')
          .then(value => value.json())
          .then(users => setUsers(users))
    }, []);

    function viewDiv(){
        document.getElementById("div1").style.display = "block";
    }

    return (
        <div className={'body'}>
            <div className={'but-create'}><button onClick={viewDiv} >Create user </button></div>
            <div className={'flex'}>
                <div><Users items={users}/></div>
                <div className={'createUserForm'} id={"div1"}><Form/></div>
            </div>
        </div>
    );
}

export default App;
