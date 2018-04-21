import React from 'react'
import {checkUserExists} from '../firebase/Database'
import {initFirebaseUI} from '../firebase/auth_ui'

class Verify extends React.Component {
    componentDidMount() {
        initFirebaseUI(this.customAuth)
    }
    
    goTo = (url) => () => this.props.history.push(url)

    customAuth = (authResult, redirectUrl) => {
        const phone = authResult.user.phoneNumber.substr(3)
        checkUserExists(phone, this.goTo("/home"), this.goTo("/register"))
        return false
    }

    render() {
        return (
            <div>
                <div id="firebaseui-auth-container">
                </div>
            </div>
        )
    }
}

export default Verify