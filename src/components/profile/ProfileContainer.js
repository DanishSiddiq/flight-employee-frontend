import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

// custom components
import Profile from './Profile';
import Logout from './Logout';

// context
import { ProfileContext } from '../../context/ProfileContext';

const ProfileContainer = (props) => {

    const ProfileStore = useContext(ProfileContext);

    const [isInProgress, setIsInProgress]   = useState(true);

    // get user on landing on this page to check that either previous token was valid or not
    const getUser = async () => {
        await ProfileStore.getUser();
        setIsInProgress(false);
    };

    //use effect
    useEffect(() => {
        getUser();
    }, []);

    // custom methods
    const onClickLogout = async () => {
        await ProfileStore.logout();
    };

    // rendering conditions
    if (isInProgress) {
        return (
            <div>Checking user session validtity.</div>
        )
    }

    if (!ProfileStore.isTokenValid) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <div>
                <Profile user={ProfileStore.user} />
            </div>
            <div>
                <Logout onClickLogout={onClickLogout} />
            </div>
        </div>
    );
}

export default React.memo(ProfileContainer);