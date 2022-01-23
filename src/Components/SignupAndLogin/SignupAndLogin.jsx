import axios from 'axios';
import React, { useState } from 'react';
import "./SignupAndLogin.css";
import { useNavigate } from 'react-router';

export default function Signup(props) {
    /* -----------------------------------------------------------------  sign up */
    const [transLogin, settransLogin] = useState(false);

    let [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    
    function getUser(e) {
        let myUser = { ...user };  
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }
   
    async function dataSignup(e) {
        e.preventDefault(); 
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, user);
        if (response.status === 201){
        settransLogin(true);
    }
    }


    return (
        <>
            {transLogin ? <div className="parent" >
                <div className="main">
                    <input type="checkbox" id="chk" checked  />
                    <div className="signup"> 
                        <form onSubmit={dataSignup}>
                            <label htmlFor="chk">Sign up</label>
                            <input onChange={getUser} className="input my-3" type="text" name="firstName" placeholder="First name" />
                            <input onChange={getUser} className="input my-3" type="text" name="lastName" placeholder="Last name" />
                            <input onChange={getUser} className="input my-3" type="email" name="email" placeholder="Email" />
                            <input onChange={getUser} className="input my-3" type="password" name="password" placeholder="Password" />
                            <button type='submit' className="button">Sign up</button>
                        </form>
                    </div> 

                        <div className="login"> 
                        <form onSubmit={props.dataLogin}>
                            <label htmlFor="chk" aria-hidden="true">Login Now</label>
                            <input onChange={props.getDataforUserLogin} className="input my-3" type="email" name="email" placeholder="Email" required />
                            <input onChange={props.getDataforUserLogin} className="input my-3" type="password" name="password" placeholder="Password" required />
                            <button className="button">Login</button>
                        </form>
                    </div>
                </div>
            </div> :
                <div className="parent" >
                <div className="main">
                    <input type="checkbox" id="chk"/>
                    <div className="signup">
                        <form onSubmit={dataSignup}>
                            <label htmlFor="chk">Sign up</label>
                            <input onChange={getUser} className="input my-2" type="text" name="firstName" placeholder="First name" />
                            <input onChange={getUser} className="input my-3" type="text" name="lastName" placeholder="Last name" />
                            <input onChange={getUser} className="input my-3" type="email" name="email" placeholder="Email" />
                            <input onChange={getUser} className="input my-3" type="password" name="password" placeholder="Password" />
                            <button type='submit' className="button">Sign up</button>
                        </form>
                    </div>
                        <div className="login">
                            {/* ترفع الداتا للapi */}
                        <form onSubmit={props.dataLogin}> 
                                <label htmlFor="chk" aria-hidden="true">Login Now</label>
                                {/* تخزن بيانات اليوزر المطلوبة لما يدخلها للنبوت */}
                            <input onChange={props.getDataforUserLogin} className="input my-2" type="email" name="email" placeholder="Email" required />
                            <input onChange={props.getDataforUserLogin} className="input my-3" type="password" name="password" placeholder="Password" required />
                            <button className="button">Login</button>
                        </form>
                    </div>
                </div>
            </div>
                
                
            }
        </>

    )
}
