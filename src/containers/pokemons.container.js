import React from "react";
import {connect} from 'react-redux';
import {addPokemon, deletePokemon, fetchPokemon} from '../actions/pokemon.action'
import {withRouter} from "react-router";
import {selectUser} from "../actions/user.action";

class Pokemons extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        const { match } = this.props;
        const { username } = match.params;
        this.props.setUser(username);
        this.props.getPokemon(username);
    }

    render() {
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }

        return (<div>
            <h1>These are my Pokemon!</h1>
            <div>{this._renderPokemonList()}</div>
        </div>);
    }

    _deletePokemon(id) {
        this.props.deletePokemon(id, this.props.username);
    }

    _addPokemon() {
        this.props.addPokemon(this.state, this.props.username);
    }

    _handleFormUpdate(event, value) {
        this.setState({
            [value]: event.target.value || '',
        })
    }

    _renderPokemonList() {
        const pokemonRows = this.props.pokemons.map(pokemon => (
            <tr key={pokemon._id}>
                <td>{pokemon.name}</td>
                <td>{new Date(pokemon.birthday).toDateString()}</td>
                <td>{pokemon.health}</td>
                <td><input type='button' value='Delete' onClick={() => this._deletePokemon(pokemon._id)}/> </td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Birthday</th>
                <th>Health</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {pokemonRows}
            <tr key={'input'}>
                <td><input type={'text'} value={this.state.name} onChange={e => this._handleFormUpdate(e, 'name')}/></td>
                <td><input type={'date'} value={this.state.birthday} onChange={e => this._handleFormUpdate(e, 'birthday')}/></td>
                <td><input type={'number'} value={this.state.health} onChange={e => this._handleFormUpdate(e, 'health')}/></td>
                <td><input type='button' value='Add' onClick={() => this._addPokemon()}/> </td>
            </tr>
            </tbody>
        </table>)
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        getPokemon: (username) => dispatch(fetchPokemon(username)),
        addPokemon: (pokemon, username) => dispatch(addPokemon(pokemon, username)),
        deletePokemon: (id, username) => dispatch(deletePokemon(id, username)),
        setUser: (username) => dispatch(selectUser(username)),
    }
}


function mapStateToProps(state, props) {
    return { ...state.pokemon,
    username: state.user.username}
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Pokemons))