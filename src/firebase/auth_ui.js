import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'

const uiConfig = {
  signInSuccessUrl: '/home',
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: 'IN', // Set default country to the United 
      defaultNationalNumber: '9840543050',
    }
  ],
  // Terms of service url.
  tosUrl: '/'
};

const container = "#firebaseui-auth-container"
export const initFirebaseUI = (customAuth) => {

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    uiConfig.callbacks = {
        signInSuccessWithAuthResult: customAuth
    }
    // The start method will wait until the DOM is loaded.
    ui.start(container, uiConfig);
}

export const login = () => {
    localStorage.setItem("student_wallet_logged_in", "true")
}

export const isLoggedIn = () => {
    const val = localStorage.getItem("student_wallet_logged_in")
    if(val==="true")
        return true
    return false
}