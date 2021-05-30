import axios from 'axios';

/**
 * @typedef {Object} Credentials
 * @property {string} email - contains the email
 * @property {string} password - contains the password
 */

/**
 * - ActionCreator that send an authentication request to the server
 * @param {Credentials} credentials 
 */
const login = (credentials)=>{
    let payload = {
        user:credentials 
    }
    let config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    return(dispatch)=>{
        return axios.post("/users/login", payload, config).then((response)=>{
            
        }).catch((err)=>{

        });
    }
}

export default login;