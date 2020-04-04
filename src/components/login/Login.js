import React from 'react';

const Login = ({ email, password, onClickLogin }) => {
    return (
        <div>
            <div>
                <input id='txtLogin' 
                        type='text'
                        placeholder='example@email.com'
                        autoComplete='on'
                        {...email} />
            </div>
            <div>
                <input id='txtPassword' 
                        type='password'
                        autoComplete='on'
                        {...password} />
            </div>
            <div>
                <input id='btnLogin'
                        type='button' 
                        value='Login' 
                        onClick={() => onClickLogin()} />
            </div>
        </div>
    );
}

export default React.memo(Login);