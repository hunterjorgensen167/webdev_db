import pokemonReducers from "./pokemon.reducer";
import userReducer from "./user.reducer";
import {combineReducers} from 'redux'


export default combineReducers({
    pokemon: pokemonReducers,
    user: userReducer,
})