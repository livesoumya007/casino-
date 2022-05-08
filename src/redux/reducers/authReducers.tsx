import { IS_USER_LOGGED_IN, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "../actions/actionCreators";

const initialState = {
    name: '',
    authenticated:  false,
}

type Type1 = {
    name: string,
    authenticated:  boolean,
}

interface LoginAction {
    type: 'LOGIN_USER_SUCCESS',
    payload: string
}

interface LogoutAction {
    type: 'LOGOUT_USER_SUCCESS'
}

type Type2 = LoginAction | LogoutAction


export default function loginReducer(state: Type1 =initialState, actions: Type2){
    switch (actions.type) {        
        case LOGIN_USER_SUCCESS: {
            console.log('reducer success ', actions.payload);
            state = {
                ...state, 
                authenticated: true,
                name: actions.payload,
            }
            break;
        }

        // case IS_USER_LOGGED_IN: {
        //     state = { ...state, authenticated: true };
        //     break;
        // }

        case LOGOUT_USER_SUCCESS: {
            console.log('logout reducer success');
            state = { ...initialState }
            break
        }
        
        default: return state;
    }
    return state;
}

