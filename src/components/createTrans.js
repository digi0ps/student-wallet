import React from 'react'
import {createTransaction, updateTransaction, deleteTransaction} from '../firebase/Database'
import {Input, Dropdown, Button} from './Form'

class New extends React.Component {

    constructor(props) {
        super(props)
        const t = this.props.location.transaction
        if(t){
            let sourceOpts = t.cashorbank==="cash"?['cash', 'bank']:['bank', 'cash'];

            let typeOpts = t.type==="deposit"?['deposit', 'withdrawal']:['withdrawal', 'deposit'];

            this.state = {
                title: t.title,
                amount: t.amount,
                category: t.category,
                cashorbank: t.cashorbank,
                type: t.type,
                phone: null,
                sourceOpts,
                typeOpts,
                editing: true,
            }
        }
        else {
            this.state = {
                title: "",
                amount: 0,
                category: "",
                cashorbank: "cash",
                type:"withdrawal",
                phone: null,
                sourceOpts: ['cash', 'bank'],
                typeOpts: ['withdrawal', 'deposit'],
                editing: false
            }
        }
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
        const trans = {
            title,
            amount,
            category,
            cashorbank,
            type,
            user: parseInt(phone, 10),
        }
        const {transaction, transaction_key} = this.props.location
        if(transaction_key){
            updateTransaction(transaction, trans, transaction_key, this.goTo("/"))
        }
        else{
            const date = new Date().getTime()
            trans.date = date
            createTransaction(trans, this.goTo("/"))
        }
    }

    delete = () => deleteTransaction(this.props.location.transaction_key, this.props.location.transaction, this.goTo('/'))

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
                    options={state.sourceOpts} />

                <Dropdown
                    name="type"
                    fn={this.handleChange}
                    label="Choose the type of transaction"
                    options={state.typeOpts} />
                {
                    state.editing
                    ?(
                        <div>
                        <Button color="warning" fn={this.submit} value="Modify" />
                        <Button color="danger" fn={this.delete} value="Delete" />
                        </div>
                    )
                    :<Button color="success" fn={this.submit} value="Create" />

                }
            </div>
        )
    }
}

export default New