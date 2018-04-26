import React from 'react'
import {Link} from 'react-router-dom'
import * as db from '../firebase/Database'

import firebase from '../firebase'

class Home extends React.Component {
    state = {
        count: "Loading",
        users: [],
        phone: null,
        currentUser: null,
        transactions: {},
    }

    componentDidMount = async () => {
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
        }))

        this.setState({
            phone,
        })
    }

    render() {
        const {currentUser, transactions} = this.state
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
                <p className="is-size-1 is-size-3-mobile has-text-info">Student Wallet</p>
                <p className="is-size-4 is-size-6-mobile has-text-medium">Welcome Mr. {currentUser?currentUser.name:""}</p>
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
                <div className="trans">
                    {
                        Object.keys(transactions).length?null:loadingButton
                    }
                    {
                        Object.keys(transactions).map((key, index) => {
                            const transaction = transactions[key]
                            let tagClasses = "tag is-absolute "
                            if(transaction.cashorbank === "cash")
                                tagClasses+= "is-success"
                            else
                                tagClasses+= "is-primary"
                            return (
                            <div className="trans box is-unselectable mybox" key={index}>
                              <article className="media">
                                <div className="media-content">
                                  <div className="content">
                                    <p>
                                        <strong>
                                            <span className="is-size-4">{ transaction.title }</span>
                                        </strong>
                                        <br />
                                      <span className="amount">
                                      Rs. {transaction.amount}
                                      </span>
                                      <br />
                                      <span className={tagClasses}>{ transaction.cashorbank }</span>    
                                      <a className="channel">#{transaction.category}</a>
                                    </p>
                                  </div>
                                </div>
                              </article>
                            </div>
                        );
                    })
                }    
            </div>
            </div>
        )
    }
}

export default Home;