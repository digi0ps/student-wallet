import React from 'react'
import {createTransaction} from '../firebase/Database'
import {Input, Dropdown, SuccessButton} from './Form'

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
        createTransaction(trans, this.goTo("/"))
    }

    render(){
        const state = Object.assign({}, this.state)
        return(
            <div className="newTrans">
            <section className="hero">
              <div className="hero-body custom-header-body">
                <div className="container">
                  <h1 className="title has-text-primary">
                    New Transaction
                  </h1>
                  <h2 className="subtitle has-text-grey-light">
                    Enter the transaction details here
                  </h2>
                </div>
              </div>
            </section>

                <br />
                <Input name="title" state={state} fn={this.handleChange} />
                <Input name="amount" type="number" state={state} fn={this.handleChange} icon="rupee-sign"/>
                <Input name="category" state={state} fn={this.handleChange} />

                <Dropdown
                    name="cashorbank"
                    fn={this.handleChange}
                    label="Select your source"
                    options={['cash', 'bank']} />

                <Dropdown
                    name="type"
                    fn={this.handleChange}
                    label="Choose the type of transaction"
                    options={['withdrawal', 'deposit']} />

                <SuccessButton fn={this.submit} value="Create" />
            </div>
        )
    }
}

export default New