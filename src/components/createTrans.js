import React from 'react'
import {createTransaction} from '../firebase/Database'

class New extends React.Component {
    state = {
        title: "",
        amount: 0,
        category: "",
        cashorbank: "cash",
        type:"withdrawal",
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
            title, amount, category, cashorbank, phone, type
        } = this.state;
        if(amount===0 || title==="" || type==="" || cashorbank==="")
            return
        const date = new Date()
        const trans = {
            date,
            title,
            amount,
            category,
            cashorbank,
            type,
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
                <div>
                    <label>Select source: </label>
                    <select name="cashorbank" onChange={this.handleChange}>
                      <option value="cash">Cash</option>
                      <option value="bank">Bank</option>
                    </select>
                </div>
                <div>
                    <label>Select type: </label>
                    <select name="type" onChange={this.handleChange}>
                      <option value="withdrawal">Withdrawal</option>
                      <option value="deposit">Deposit</option>
                    </select>
                </div>
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