import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// custom components
import Login from './Login';

// helpers
import CONSTANTS from '../../utils/constants';
import cmn from '../../utils/common';

// services
import { get } from '../../services/profile/ProfileService';
import { login } from '../../services/profile/ProfileService';

const LoginContainer = (props) => {

    const [isInProgress, setIsInProgress] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(true);
  
    const getUser = () => {
      const token = cmn.getData(true, CONSTANTS.PROFILE.ACCESS_TOKEN);
      if(token){
          get({ token })
          .then( data => {
              if(data.isSuccess) {
                  setIsTokenValid(true);
              } else {                   
                  setIsTokenValid(false);
                  cmn.removeData(true, CONSTANTS.PROFILE.ACCESS_TOKEN);
              }

              setIsInProgress(false);
          });
      }
      else {
        setIsInProgress(false);
        setIsTokenValid(false);
      }
    };

    useEffect(getUser, []);


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

    const onClickLogin = async () => {
        const result = await login({ email: email.value, password: password.value});
        if(result.isSuccess) {
            const isSuccess = cmn.setData(true, CONSTANTS.PROFILE.ACCESS_TOKEN, result.token);
            if(isSuccess) {
                props.history.push('/profile');
            } else {
                // handle browser not supported case
            }
        } else {
            // handle error case from service
        }
    };

    const email = useFormInput('');
    const password = useFormInput('');


    if(isInProgress){
        return(
            <div>Checking Authentication</div>
        )
    }

    if(isTokenValid){
        return <Redirect to="/profle" />
    }

    return (
        <div>
            <Login email={email} password={password} onClickLogin={onClickLogin} />
        </div>
    );
}

export default LoginContainer;