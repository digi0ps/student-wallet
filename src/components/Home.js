import React from 'react'
import * as db from '../firebase/Database'

import firebase from '../firebase'

class Home extends React.Component {
    state = {
        count: "Loading",
        users: [],
        phone: null,
        currentUser: null,
    }

    componentDidMount = async () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const phone = user.phoneNumber.substr(3)
            db.fetchUser(phone, (currentUser) => this.setState({
                currentUser,
                phone,
            }))
          } else {
            this.props.history.push('/verify')
          }
        });
    }

    render() {
        return (
            <div>
                Welcome to student wallet, {this.state.currentUser && this.state.currentUser.name||"loading"}
            </div>
        )
    }
}

export default Home;