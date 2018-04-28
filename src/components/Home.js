import React from 'react'
import {Link} from 'react-router-dom'
import * as db from '../firebase/Database'
import Transaction from './Transaction'
import firebase from '../firebase'
import {isLoggedIn} from '../firebase/auth_ui'

class Home extends React.Component {
    state = {
        count: "Loading",
        users: [],
        phone: null,
        currentUser: null,
        transactions: {},
        loading: true,
        type: null,
    }

    types = [null, 'Withdrawal', 'Deposit']

    componentDidMount = async () => {
        if(!isLoggedIn)
            this.props.push('/verify')
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const phone = user.phoneNumber.substr(3)
            localStorage.setItem("student_wallet_phone", phone)
            this.initStates(phone)
          }
          else
            this.props.history.push('/verify')
        });
    }

    initStates = (phone) => {
        db.fetchUser(phone, (currentUser) => this.setState({
            currentUser
        }))

        db.fetchTransaction(phone, (transactions) => this.setState({
            transactions,
            loading: false,
        }))
        this.setState({
            phone
        })
    }

    filter = (type=null) => {
        const trans = Object.assign({}, this.state.transactions)
        if (type===null)
            return Object.keys(trans)
        const filtered = Object.keys(trans).filter(key => trans[key].type===type?true:false)
        return filtered
    }

    renderTrans = (transKeyArr) => {
        transKeyArr = transKeyArr.reverse()
        const arr = transKeyArr.map((key, index) => {
            const transaction = this.state.transactions[key]
            let tagClasses = "tag is-absolute "
            if(transaction.cashorbank === "cash")
                tagClasses+= "is-success"
            else
                tagClasses+= "is-primary"
            return (<Transaction key={index} id={key} tagclass={tagClasses} transaction={transaction} />);
        })
        return arr
    }

    changeFilter = (type) => () => {
        if (this.state.loading)
            return
        this.setState({
            type,
        })
    }

    renderTabs = () => {
        const arr = this.types.map((type, index) => {
            const label = type===null?'All':type
            type = type===null?null:type.toLowerCase()
            const isactive = this.state.type===type?'is-active':''
            return (
                <li key={index} className={isactive}><a onClick={this.changeFilter(type)}>{label}</a></li>
            )
        })
        return arr
    }

    render() {
        window.filter = this.filter
        const {currentUser, transactions, type} = this.state
        let cash, bank
        if(currentUser){
            cash = currentUser.accounts.cash.balance
            bank = currentUser.accounts.bank.balance
        }
        const loadingPulse = (
            <span className="loading">
            ø
            </span>
        )

        const loadingButton = (
            <div className="loadingButton"><a className="button is-loading">Loading</a></div>
        )

        return (
            <div>
                <div id="headerkinda">
                <p className="is-size-1 is-size-3-mobile has-text-primary">{currentUser?currentUser.name+"'s":"Student"} Wallet</p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Transactions</p>
                      <p className="title">{Object.keys(transactions).length || loadingPulse}</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Cash</p>
                      <p className="title">{cash || loadingPulse}</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Bank</p>
                      <p className="title">{bank || loadingPulse}</p>
                    </div>
                  </div>
                </nav>

                <div className="newTrans">
                <Link to="/new" className="button is-success is-outlined" id="trans_button">
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>
                <span>Transaction</span>
                </Link>
                </div>
                <br />

                <div className="tabs is-fullwidth">
                  <ul>
                    { this.renderTabs() }
                  </ul>
                </div>

                { this.state.loading?loadingButton:null }

                <div className="trans">

                    { this.renderTrans(this.filter(type)) }    
            </div>
            </div>
        )
    }
}

export default Home;