import React from 'react'
import {Redirect} from 'react-router-dom'
import {registerUser} from '../firebase/Database'

class Register extends React.Component {
    state = {
        name: "",
        age: 18,
        gender: "",
        phone: "",
        status: "",
        cash: 0,
        bank_name: "",
        bank_no: "",
        bank_bal: "",
        success: null,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    submit = () => {
        const {name, age, gender, phone, status, cash, bank_name, bank_no, bank_bal} = this.state
        const user = {
            name,
            age,
            gender,
            status,
            phone,
        }
        const account = {
            cash,
        }
        account[bank_name] = {
            bank_no,
            bank_bal,
        }

        registerUser(user, account, (success) => {
            this.setState({
                success
            })
        })
    }

    render() {
        const {
            name, age, gender, phone, status, cash, bank_name, bank_no, bank_bal
        } = this.state

        const errorMsg = (
            <div className="error">
                Oops, you have alreay registered!
            </div>
        )
        return (
            <div>
            Hey just need a few details about you and we are all set to 
            roll.
            {this.state.success===true?<Redirect to="/verify" />:''}
            {this.state.success===false?errorMsg:''}
            <div>
                <label>Name: </label>
                <input type="text" name="name" value={name} onChange={this.handleChange} />
            </div>
            <div>
                <label>Phone: </label>
                <input type="text" name="phone" value={phone} onChange={this.handleChange} />
            </div>
            <div>
                <label>Gender: </label>
                <input type="text" name="gender" value={gender} onChange={this.handleChange} />
            </div>
            <div>
                <label>Age: </label>
                <input type="number" name="age" value={age} onChange={this.handleChange} />
            </div>
            <div>
                <label>Financial Status: </label>
                <input type="text" name="status" value={status} onChange={this.handleChange} />
            </div>

            <div>You might have some cash in hand. Let's put that in here. </div>
            <div>
                <label>Cash: </label>
                <input type="number" name="cash" value={cash} onChange={this.handleChange} />
            </div>

            <div>Now enter your bank account and it's details</div>
            <div>
                <label>Bank Name: </label>
                <input type="text" name="bank_name" value={bank_name} onChange={this.handleChange} />
            </div>
            <div>
                <label>Bank Account Number: </label>
                <input type="text" name="bank_no" value={bank_no} onChange={this.handleChange} />
            </div>
            <div>
                <label>Bank Balamce: </label>
                <input type="text" name="bank_bal" value={bank_bal} onChange={this.handleChange} />
            </div>
            <button onClick={this.submit}>Let's go</button>
            </div>
        )
    }
}

export default Register