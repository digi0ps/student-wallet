import * as firebase from 'firebase'
import config from './config'

firebase.initializeApp(config);

const Database = firebase.database()

export const registerUser = async (user, accounts, callback) => {

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
            callback(true)
            return
        }
        // User creation failed
        callback(false)
    })
}

export default Database
