import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// custom components
import Profile from './Profile';
import Logout from './Logout';

// helpers
import CONSTANTS from '../../utils/constants';
import cmn from '../../utils/common';

// models
import User from '../../models/profile/User';

// services
import { get } from '../../services/profile/ProfileService';

const ProfileContainer = (props) => {

    const [user, setUser]                   = useState(new User());
    const [isInProgress, setIsInProgress]   = useState(true);
    const [isTokenValid, setIsTokenValid]   = useState(false);

    const getUser = () => {
        const token = cmn.getData(true, CONSTANTS.PROFILE.ACCESS_TOKEN);
        if(token){
            get({ token })
            .then( data => {
                if(data.isSuccess) {
                    setUser({ ...data.user });
                    setIsTokenValid(true);
                } else {                   
                    clearUserSessionData();
                }

                setIsInProgress(false);
            });
        }
    };

    //use effect
    useEffect(getUser, []);

    // custom methods
    const onClickLogout = async () => {
        clearUserSessionData();
    };

    const clearUserSessionData = () => {
        setIsTokenValid(false);
        cmn.removeData(true, CONSTANTS.PROFILE.ACCESS_TOKEN);
    }

    // rendering conditions
    if(isInProgress){
        return (
            <div>Checking user session validtity.</div>
        )
    }

    if(!isTokenValid){ 
        return <Redirect to="/login" />
    }

    return (
        <div>
            <div>
                <Profile user={user} />
            </div>
            <div>
                <Logout onClickLogout={onClickLogout} />
            </div>
        </div>
    );
}

export default React.memo(ProfileContainer);