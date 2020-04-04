import {combineReducers} from 'redux'


function inFlight(state = false, action) {
    return action.type === 'REQUEST_INFLIGHT';
}

function pokemons(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_POKEMONS':
            return action.pokemons
    }
    return state;
}

function loading(state = true, action) {
    switch (action.type) {
        case 'RECEIVE_POKEMONS':
        case 'REQUEST_POKEMONS':
            return false;
        default:
            return state;
    }

}


export default combineReducers({
    inFlight,
    pokemons,
    loading,
});

