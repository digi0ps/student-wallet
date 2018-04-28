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
        checkUserExists(phone, this.goTo("/"), this.goTo("/register"))
        return false
    }

    render() {
        return (
            <div>
                <p className="is-size-1 has-text-primary has-text-centered">Student Wallet</p>
                <p className="is-size-6 has-text-grey-light has-text-centered" id="verifying">
                For best experience use Chrome for Android, click the 3-dots, Add to Home Screen
                and continue from the added Web App.
                </p>
                <div id="firebaseui-auth-container">
                </div>
            </div>
        )
    }
}

export default Verify