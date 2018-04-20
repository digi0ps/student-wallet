import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = (props) => (
    <div>
    <p>Hey!!</p>
    <p>Welcome to Student Wallet</p>
    <p>If you have already registered, then <Link to="/login">login here</Link></p>
    <p>If you are new, then sign up  <Link to="/new">here</Link></p>
    </div>
)

export default Welcome