import firebase from './'
import {login} from './auth_ui'

const Database = firebase.database()
window.db = Database

export const checkUserExists = (phone, fnSuccess, fnFailure) => {
    // Query for users with the same number
    Database.ref("/users").orderByChild("phone").equalTo(phone).once("value", (snapshot) => {
        // User does not exist
        if(snapshot.val()==null){
            fnFailure()
            return
        }
        // User does exist
        login()
        fnSuccess()
    })  
}

export const fetchUser = (phone, callback) => {
    Database.ref("/users").orderByChild("phone").equalTo(phone).on("child_added", (data) => {
        // User does not exist
        const user = data.val()
        console.log(user)
        if(user==null){
            return null
        }
        callback(user)
    })   
}

export const registerUser = (user, accounts, callback) => {

    // Query for users with the same number
    Database.ref("/users").orderByChild("phone").equalTo(user.phone).once("value", (snapshot) => {

        // Only add a new user if the previous user doesn't exist
        if(snapshot.val()==null){
            const newUserRef = Database.ref("/users").push()
            newUserRef.set({
                ...user,
                accounts,
            })
            // User creation successfull
            login()
            callback(true)
            return
        }
        // User creation failed
        callback(false)
    })
}

export default Database
