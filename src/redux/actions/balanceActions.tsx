import { MODIFY_BALANCE, RESET_BALANCE } from "./actionCreators";

export const modifyBalanceAction = (b: number) => {
    console.log('add balance', b);
    return {
        type: MODIFY_BALANCE,
        payload: b,
    }
}

export const checkBalance = () => {
    console.log('action set balance from ls');
    return {
        type: RESET_BALANCE,
    }
    
}

