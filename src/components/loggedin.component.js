import Axios from "axios";
import React from 'react';
import {
    Redirect
} from "react-router-dom";

export default function (RedirectComponent) {
    return class extends React.Component {

        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            Axios.get('/api/user/loggedIn')
                .then(res => {
                    if (res.status === 200) {
                        this.setState({loading: false});
                    } else {
                        throw new Error(res.error);
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({loading: false, redirect: true});
                });
        }

        render() {
            const {loading, redirect} = this.state;
            if (loading) {
                return (<h4>Loading...</h4>);
            }
            if (redirect) {
                return (<Redirect to="/login"/>);
            }
            return (<RedirectComponent {...this.props} />);
        }
    }
}