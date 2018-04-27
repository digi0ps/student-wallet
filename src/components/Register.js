import React from 'react'
import {Redirect} from 'react-router-dom'
import {registerUser} from '../firebase/Database'
import {Input, Dropdown, SuccessButton} from './Form'

class Register extends React.Component {
    state = {
        name: "",
        age: 18,
        gender: "male",
        phone: "",
        status: "student",
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
        const accounts = {
            cash: {
                balance: cash
            },
            bank: {
                balance: bank_bal,
                name: bank_name,
                acc_no: bank_no
            }
        }

        registerUser(user, accounts, (success) => {
            this.setState({
                success
            })
        })
    }

    render() {
        const state = Object.assign({}, this.state)

        const errorMsg = (
            <div className="error">
                Oops, you have alreay registered!
            </div>
        )
        return (
            <div>
            <section className="hero">
              <div className="hero-body custom-header-body">
                <div className="container">
                  <h1 className="title has-text-primary">
                    Register
                  </h1>
                  <h2 className="subtitle has-text-grey-light">
                    Just need a few details and we are all set to roll.
                  </h2>
                </div>
              </div>
            </section>

            {this.state.success===true?<Redirect to="/verify" />:''}
            {this.state.success===false?errorMsg:''}

            <Input name="name" state={state} fn={this.handleChange} />
            <Input name="phone" state={state} fn={this.handleChange} />
            <Dropdown name="gender" options={['male', 'female']} fn={this.handleChange} />
            <Input name="age" state={state} type="number" fn={this.handleChange} />
            <Dropdown name="status" options={['student', 'employed']} fn={this.handleChange} />

            <p className="subtitle has-text-grey-light">You might have some cash in hand. Let's put that in here. </p>
            <Input name="cash" icon="money" state={state} type="number" fn={this.handleChange} />

            <p className="subtitle has-text-grey-light">Now enter your bank account and it's details</p>
            <Input name="bank_name" label="Your bank's name" state={state} fn={this.handleChange} />
            <Input name="bank_no" label="Your account number" state={state} fn={this.handleChange} />
            <Input name="bank_bal" type="number" icon="money" label="Your bank balance" state={state} fn={this.handleChange} />

            <SuccessButton fn={this.submit} value="Register" />
            </div>
        )
    }
}

export default Register