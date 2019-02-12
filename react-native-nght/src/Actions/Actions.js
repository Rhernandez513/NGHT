export function appInit(data=null) {
    return {type: 'APP_INIT', data: data}
}

export function asyncRunner(func, id='none') {
    result = () => {
        return func()
    }
    //dispatch(asyncResult(id, result))
}

function asyncResult(id, result) {
    return {type: 'ASYNC_RESULT', id: id, result: result}
}
export function acctSignIn(service) {
    return {type: 'ACCT_SIGN_IN', service: service}
}

export function acctSignOut(service) {
    return {type: 'ACCT_SIGN_OUT', service: service}
}

export function acctSignUp(data) {
    return {type: 'ACCT_SIGN_UP', data: data}
}

export function venueSelect(venue) {
    return {type: 'VENUE_SELECT', venue: venue}
}

export function orderInc(item) {
    return {type: 'INC_ORDER', item: item}
}

export function orderDec(item) {
    return {type: 'DEC_ORDER', item: item}
}

export function orderUpdate(item) {
    return {type: 'ORDER_UPDATE', item: item}
}

export function orderInit(item) {
    return {type: 'ORDER_INIT', item: item}
}
