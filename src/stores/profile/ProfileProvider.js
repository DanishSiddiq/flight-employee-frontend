import React from 'react';

// mbox
import { useLocalStore } from 'mobx-react';

// context
import { ProfileContext } from '../../context/ProfileContext';

// services
import { get, login } from '../../services/profile/ProfileService';

// helpers
import CONSTANTS from '../../utils/constants';
import cmn from '../../utils/common';

// models
import User from '../../models/profile/User';


const ProfileProvider = props => {

    const ProfileStore = useLocalStore(() => ({

        // token is valid or not
        isTokenValid: false,

        // user data
        user: new User(),

        /**
         * 
         */
        getUser: async () => {
            const token = cmn.getData(true, CONSTANTS.PROFILE.ACCESS_TOKEN);
            if (token) {

                const result = await get({ token });
                if (result.isSuccess) {
                    ProfileStore.isTokenValid = true;
                    ProfileStore.user = result.user;
                } // check here response code for multiple cases like network failure or in valid token
                else {
                    // currently by default considering that token is invalid
                    ProfileStore.isTokenValid = false;
                    cmn.removeData(true, CONSTANTS.PROFILE.ACCESS_TOKEN);
                }
            }
            else {
                ProfileStore.isTokenValid = false;
                cmn.removeData(true, CONSTANTS.PROFILE.ACCESS_TOKEN);
            }
        },

        /**
         * 
         */
        loginUser: async ({ email, password }) => {

            let isSuccess = false;
            let msg = '';

            // check credentiala from server
            const result = await login({ email, password });
            if (result.isSuccess) {
                isSuccess = cmn.setData(true, CONSTANTS.PROFILE.ACCESS_TOKEN, result.token);
                if (isSuccess) {
                    return { isSuccess, msg };
                } else {
                    msg = `Kindly update browser to support login feature`;
                }
            } else {
                if (result.message) {
                    msg = result.message;
                } else {
                    msg = `Internal server errer. Kindly contact admin`
                }
            }

            return { isSuccess, msg };
        },

        // action method add observer
        logout: async () => {
            ProfileStore.isTokenValid = false;
            cmn.removeData(true, CONSTANTS.PROFILE.ACCESS_TOKEN);
        }
    }));


    return (
        <ProfileContext.Provider value={ProfileStore}>
            {props.children}
        </ProfileContext.Provider>
    );
}

export default ProfileProvider;