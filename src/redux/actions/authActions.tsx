import { LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "../actions/actionCreators";
export const authActions = (user: { email: string , password: string }) => {
    console.log("actions ",user);
    const name = user.email.substring(0, user.email.indexOf('@'));
    localStorage.setItem('username', JSON.stringify(name));
    localStorage.setItem('balance', JSON.stringify(9.99));
    return  {
        type: LOGIN_USER_SUCCESS,
        payload: name
    }
}

export const signOutAction = () => {
    console.log("sign out called");
    localStorage.removeItem('username');
    localStorage.removeItem('balance');
    return  {
        type: LOGOUT_USER_SUCCESS,
    }
}

export const isUserLoggedIn = () => {
    console.log("checking user already loggedin or not");
    let name =  localStorage.getItem('username');
    if(name){
        return {
            type: LOGIN_USER_SUCCESS,
            payload: name
        }
    }else{
        return  {
            type: LOGOUT_USER_SUCCESS,
        }
    }
}