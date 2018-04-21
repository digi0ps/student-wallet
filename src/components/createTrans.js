import React from 'react'
import {createTransaction} from '../firebase/Database'

class New extends React.Component {
    state = {
        title: "",
        amount: 0,
        category: "",
        cashorbank: "",
        phone: null,
    }

    componentDidMount(){
        const phone = localStorage.getItem("student_wallet_phone")
        this.setState({
            phone
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    goTo = (url) => () => {
        this.props.history.push(url)
    }

    submit = () => {
        const {
            title, amount, category, cashorbank, phone
        } = this.state;
        const date = new Date()
        const trans = {
            date,
            title,
            amount,
            category,
            cashorbank,
            user: parseInt(phone, 10),
        }
        createTransaction(trans, this.goTo("/home"))
    }

    render(){
        const state = Object.assign({}, this.state)
        return(
            <div className="newTrans">
                Enter the details for the new transaction.
                <br />
                <Input name="title" state={state} fn={this.handleChange} />
                <Input name="amount" type="number" state={state} fn={this.handleChange} />
                <Input name="category" state={state} fn={this.handleChange} />
                <Input name="cashorbank" label="Cash or bank" state={state} fn={this.handleChange} />
                <button onClick={this.submit}>Add</button>
            </div>
        )
    }
}


const Input = ({name, state, fn, type, label}) => {
    label = label?label:name
    // label[0] = label[0].toUpperCase()
    type = type?type:"text"
    return (
        <div className="controlInput">
            <label>{label}: </label>
            <input type={type} name={name} value={state[name]} onChange={fn} />
        </div>
    )
}

export default New