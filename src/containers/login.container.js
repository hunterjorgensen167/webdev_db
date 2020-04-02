import React from "react";
import {connect} from 'react-redux';
import {clear, login} from '../actions/user.action'
import {Redirect} from "react-router";

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.login(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({username: '', password: ''});
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error) {
            error = (<h3>{this.props.error}</h3>)
        }

        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                {error}
                <label>
                    Name:
                    <input type="text"
                           disabled={this.props.inFlight}
                           value={this.state.username}
                           onChange={(e) => this.handleChange(e, 'username')}/> </label>
                <label> Password:
                    <input type="password"
                           disabled={this.props.inFlight}
                           value={this.state.password}
                           onChange={(e) => this.handleChange(e, 'password')}/> </label>
                <input type="submit" value="Submit" disabled={this.props.inFlight}/>
            </form>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        login: (user) => dispatch(login(user)),
        clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin)