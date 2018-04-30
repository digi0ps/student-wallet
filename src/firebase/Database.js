import firebase from './index'
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
        if(user==null){
            return null
        }
        callback(user)
    })   
}
window.db = Database

export const fetchTransaction = (phone, callback) => {
    Database.ref("/transactions").orderByChild("user").equalTo(parseInt(phone, 10)).on("value", (snapshot) => {
        // trans does not exist
        let trans = snapshot.val()
        if(trans===null){
            trans = {}
        }
        callback(trans)
    })  
}

export const createTransaction = (transaction, fnSuccess) => {
    const newTrans = Database.ref("/transactions").push()
    newTrans.set({
        ...transaction,
    })
    fetchUser(transaction.user.toString(), updateUser(transaction))
    fnSuccess()
}

export const updateTransaction = (oldtransaction, transaction, key, fnSuccess) => {
    Database.ref().child(`/transactions/${key}`).update({
        ...transaction,
    })

    // The updating balance process
    if(oldtransaction.cashorbank===transaction.cashorbank && oldtransaction.amount!==transaction.amountx){
        console.log("Updating amount");
        const trans = {
            cashorbank: transaction.cashorbank,
            amount: (transaction.amount - oldtransaction.amount),
            type: transaction.type
        }
        fetchUser(transaction.user.toString(), updateUser(trans))
    }
    else if(oldtransaction.cashorbank!==transaction.cashorbank){
        console.log("Updating bank and amount")
        const trans1 = {
            cashorbank: oldtransaction.cashorbank,
            amount: -(oldtransaction.amount),
            type: transaction.type
        }
        fetchUser(transaction.user.toString(), updateUser(trans1))

        const trans2 = {
            cashorbank: transaction.cashorbank,
            amount: transaction.amount,
            type: transaction.type
        }
        fetchUser(transaction.user.toString(), updateUser(trans2))
    }
    else if(oldtransaction.type!==transaction.type){
        console.log("Updating type")
        const trans = {
            cashorbank: transaction.cashorbank,
            amount: 2*transaction.amount,
            type: transaction.type,
        }
        fetchUser(transaction.user.toString(), updateUser(trans))
    }

    fnSuccess()
}

export const deleteTransaction = (key, fnSuccess) => {
    Database.ref().child(`/transactions/${key}`).remove()
    fnSuccess()
}

export const updateUser = (transaction) => (user) => {
    let money = parseInt(user.accounts[transaction.cashorbank].balance, 10)
    let amount = parseInt(transaction.amount, 10)
    if (transaction.type==="withdrawal")
        money-=amount
    if(transaction.type==="deposit")
        money+=amount

    user.accounts[transaction.cashorbank].balance = money

    const userKey = localStorage.getItem("student_wallet_user_key")
    Database.ref().child(`/users/${userKey}`).update({
        ...user
    })
}

export const registerUser = (user, accounts, callback) => {

    // Query for users with the same number
    Database.ref("/users").orderByChild("phone").equalTo(user.phone).on("value", (snapshot) => {

        // Only add a new user if the previous user doesn't exist
        if(snapshot.val()==null){
            const newUserRef = Database.ref("/users").push()
            localStorage.setItem("student_wallet_user_key", newUserRef.key)
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
