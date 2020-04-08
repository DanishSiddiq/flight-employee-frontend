import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

// custom components
import Login from './Login';
import Error from '../common/Error';

// helpers
import CONSTANTS from '../../utils/constants';
import cmn from '../../utils/common';

// context
import { ProfileContext } from '../../context/ProfileContext';


const LoginContainer = (props) => {

    const [isInProgress, setIsInProgress] = useState(true);
    const [errorMsg, setErrorMsg] = useState([]);
    const ProfileStore = useContext(ProfileContext);

    const resetErrors = () => {
        //clear error messages 
        setErrorMsg([]);
    }

    // get user on landing on this page to check that either previous token was valid or not
    const getUser = async () => {
        await ProfileStore.getUser();
        setIsInProgress(false);
    };

    useEffect(() => { getUser(); }, []);

    const useFormInput = initialValue => {
        const [value, setValue] = useState(initialValue);

        const handleChange = e => {
            setValue(e.target.value);
        }

        return {
            value,
            onChange: handleChange
        }
    };

    const pushErrorMessage = (msgs) => {
        setErrorMsg(msgs);
    }

    // on login click
    const onClickLogin = async () => {

        // reset fields before sending request to server
        resetErrors();

        // get data from store
        const result = await ProfileStore.loginUser({ email: email.value, password: password.value });
        if (result.isSuccess) {
            props.history.push('/profile');
        } else {
            pushErrorMessage([result.message]);
        }        
    };

    const email = useFormInput('');
    const password = useFormInput('');


    if (isInProgress) {
        return (
            <div>Checking Authentication</div>
        )
    }

    if (ProfileStore.isTokenValid) {
        return <Redirect to="/profle" />
    }

    return (
        <div>
            <Error errors={errorMsg} />
            <Login email={email} password={password} onClickLogin={onClickLogin} />
        </div>
    );
}

export default React.memo(LoginContainer);