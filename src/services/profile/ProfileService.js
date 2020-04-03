import User from '../../models/profile/User';

/**
 * 
 * @param {*} param0 
 */
export const login = async ({ email, password }) => {
    
    let responseCode;
    let isSuccess = false;

    try {
        const response = await fetch('http://localhost:3133/api/v1/employee/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Accept':'*/*'},
            body: JSON.stringify({ email, password })
          });
        
        responseCode = response.status;

        if (response.ok) {
            const result  = await response.json();
            isSuccess     = true;

            return { isSuccess, responseCode, ...result };
        }

        // custom error handling here
        console.log('User cannot be loggedin');
    } catch (err) {
        //Throw the return payload
        console.log(err);
    }

    return { isSuccess, responseCode };;
};


/**
 * 
 * @param {*} param0 
 */
export const get = async ({ token }) => {
    const user = new User();
    let responseCode;
    let isSuccess = false;
    
    try {
        const response = await fetch('http://localhost:3133/api/v1/employee', {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization':`bearer ${token}`}
          });
        
        responseCode = response.status;

        if (response.ok) {
            // transform into model
            const result = await response.json();
            isSuccess    = true;

            user.firstName          = result.firstName;
            user.lastName           = result.lastName;
            user.email              = result.email;
            user.registrationNumber = result.registrationNumber;
            user.createdAt          = result.createdAt;
            user.updatedAt          = result.updatedAt;

            return { isSuccess, responseCode, user };
        }

        // custom error handling here
        console.log('User cannot be fetched');
    } catch (err) {
        //Throw the return payload
        console.log(err);
    }

    return { isSuccess, responseCode };
};
