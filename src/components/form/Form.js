import './Form.css';
import {useState} from "react";
import {useHttp} from '../hooks/http.hooks';

export default function Form ()
{
    const [newData, setNewData] = useState();
    let { request, error, clearError } = useHttp();

    const [form, setForm] = useState({
        username: '', first_name: '', last_name: '', email: '', user_type: '', password: '', pereatPassword: ''
    });

    const changeEventHandler = event => {
        setForm({...form, [event.target.name]: event.target.value });
    };

   async function createUserHandler(){
        try {
            const data = await request('/users', 'POST', {...form});
            setNewData(data.message);
            clearError();
        } catch (e) {}
    }

    function viewDiv(){
        document.getElementById("div1").style.display = "none";
    }

    return(
        <div className={'createUser'} id={'div1'}>
            <form>
                <div className={'flex'}>
                    <div><label className={'lb'}>Create new user</label></div>
                    <div><button onClick={viewDiv} className={'bt-x'}>X</button></div>
                </div>
                <div className={'conteiner'}>
                <div>
                    <label htmlFor={'username'} className={'lb-input'}>Username </label>
                    <input id={'username'} required type={'text'} placeholder={' '} name={'username'} onChange={changeEventHandler}/>
                </div>
                <div>
                    <label htmlFor={'first_name'} className={'lb-input'}>First name </label>
                    <input id={'first_name'} type={'text'} placeholder={' '} name={'first_name'} onChange={changeEventHandler}/>
                </div>
                <div>
                    <label htmlFor={'last_name'} className={'lb-input'}>Last name </label>
                    <input id={'last_name'} type={'text'} placeholder={' '} name={'last_name'} onChange={changeEventHandler}/>
                </div>
                <div>
                    <label htmlFor={'email'} className={'lb-input'}>Email </label>
                    <input id={'email'} type={'email'} placeholder={' '} name={'email'} onChange={changeEventHandler}/>
                </div>
                <div>
                    <label htmlFor={'user_type'} className={'lb-input'}>Type </label>
                   <select id={'user_type'} name={'user_type'} onChange={changeEventHandler}>
                       <option></option>
                       <option>driver</option>
                       <option>admin</option>
                   </select>
                </div>
                <div><label htmlFor={'password'} className={'lb-input'}>Password </label>
                    <input id={'password'} type={'password'} placeholder={' '} name={'password'} onChange={changeEventHandler}/>
                </div>
                <div><label htmlFor={'pereatPassword'} className={'lb-input'}>Repeat password </label>
                    <input id={'pereatPassword'} type={'password'} placeholder={' '} name={'pereatPassword'} onChange={changeEventHandler}/>
                </div>
                <label className={'error'}>{error}</label>
                <label className={'secses'}>{newData}</label>
                <div className={'btn'}><button onClick={createUserHandler} className={'btn-crt'}>Create</button></div>
                </div>
            </form>
        </div>
    );
}
