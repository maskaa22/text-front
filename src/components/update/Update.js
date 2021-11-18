import {useState} from "react";
import {useHttp} from '../hooks/http.hooks';
import './Update.css';

export default function Update ({update})
{
    const [newData, setNewData] = useState();
    const [form, setForm] = useState();
    const {request, error, clearError } = useHttp();

    const changeEventHandler = event => {
        setForm({...form, [event.target.name]: event.target.value });
    }

    const updateUserHandler = async () => {
        try {
            const data = await request('/users', 'PATCH', {...form});
            setNewData(data.message);
            clearError();
        } catch (e) {}
    }

    const deleteUserHandler = async () => {
        try {
            const data = await request('/users', 'DELETE', {...form});
            setNewData(data.message);
            clearError();
        } catch (e) {}
    }

    function viewDiv(){
        document.getElementById("div3").style.display = "none";
    }

    return(
        <div className={'newUser'} id={'div3'}>
            <form>
                <div className={'flex'}>
                    <div><label className={'lb'}>{update.first_name} {update.last_name}</label></div>
                    <div><button onClick={viewDiv} className={'bt-x'}>X</button></div>
                </div>
                <div className={'conteiner'}>
                <div>
                    <label htmlFor={'username'} className={'lb-input'}>Username </label>
                    <input id={'username-form'} required type={'text'} placeholder={'Напиши старый юзернейм'} name={'username'} defaultValue={''} onChange={changeEventHandler}/>
                </div>
                <div>
                    <label htmlFor={'first_name'} className={'lb-input'}>First name </label>
                    <input id={'first_name-form'} type={'text'} placeholder={' '} name={'first_name'} defaultValue={update.first_name} onChange={changeEventHandler}/>
                </div>
                <div>
                    <label htmlFor={'last_name'} className={'lb-input'}>Last name </label>
                    <input id={'last_name-form'} type={'text'} placeholder={' '} name={'last_name'} defaultValue={update.last_name} onChange={changeEventHandler}/>
                </div>
                <div>
                    <label htmlFor={'email'} className={'lb-input'}>Email </label>
                    <input id={'email-form'} type={'email'} placeholder={' '} name={'email'} defaultValue={update.email} onChange={changeEventHandler}/>
                </div>
                    <div>
                        <label htmlFor={'user_type'} className={'lb-input'}>Type </label>
                        <select id={'user_type1'} name={'user_type'} onChange={changeEventHandler}>
                            <option></option>
                            <option>driver</option>
                            <option>admin</option>
                        </select>
                    </div>
                <div><label htmlFor={'password'} className={'lb-input'}>Password </label>
                    <input id={'password-form'} type={'password'} placeholder={' '} name={'password'} defaultValue={''} onChange={changeEventHandler}/>
                </div>
                    <div><label htmlFor={'pereatPassword'} className={'lb-input'}>Repeat password </label>
                        <input id={'pereatPassword1'} type={'password'} placeholder={' '} name={'pereatPassword'} onChange={changeEventHandler}/>
                    </div>
                    <label className={'error'}>{error}</label>
                    <label className={'secses'}>{newData}</label>
                <div className={'flex-btn'}>
                    <div><button onClick={deleteUserHandler} className={'btn-crt-red'} >Delete</button></div>
                    <div><button onClick={updateUserHandler} className={'btn-crt'}>Edit</button></div>
                </div>
                </div>
            </form>
        </div>
    );
};
