import { MODIFY_BALANCE, RESET_BALANCE } from "../actions/actionCreators"

const initialState = 9.99

interface ModifyBalance {
    type: 'MODIFY_BALANCE'
    payload: number 
}

interface CheckBalance {
    type: 'RESET_BALANCE'
}

type Type = ModifyBalance | CheckBalance
export default function balanceReducer(state: number = initialState, actions: Type){
    switch(actions.type){
        case MODIFY_BALANCE: {
            console.log('add balance reducer');
            state = state + actions.payload
            localStorage.setItem('balance', JSON.stringify(state))
            break;
        }

        case RESET_BALANCE: {
            console.log('reset balance reducer');
            state = parseFloat(JSON.parse(localStorage.getItem('balance') || '9.99'));
            break;
        }

        default: return state;
    }
    return state;
}
