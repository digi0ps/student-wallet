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
window.db = Database
export const fetchTransaction = (phone, callback) => {
    Database.ref("/transactions").orderByChild("user").equalTo(parseInt(phone)).on("value", (snapshot) => {
        // trans does not exist
        const trans = snapshot.val()
        console.log(trans)
        if(trans==null){
            return null
        }
        callback(trans)
    })  
}

export const registerUser = (user, accounts, callback) => {

    // Query for users with the same number
    Database.ref("/users").orderByChild("phone").equalTo(user.phone).on("value", (snapshot) => {

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
