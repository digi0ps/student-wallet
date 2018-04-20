import * as firebase from 'firebase'
import config from './config'

firebase.initializeApp(config);

const Database = firebase.database()

// export const getUserCount = async () => {
//     const snapshot = await Database.ref("/usercount").once("value")
//     return snapshot.val()
// }

// const oldRegisterUser = async (name, email, pass) => {
//     const userCount = await getUserCount()
//     Database.ref(`/users/${userCount}`).set({
//         name,
//         email,
//         password: pass,
//     })
//     Database.ref("/usercount").set(userCount+1)
// }

// const registerUser = async (name, email, pass) => {
//     const newUserRef = Database.ref("/users").push()
//     newUserRef.set({
//         name,
//         email,
//         pass,
//     })
// }

export default Database
