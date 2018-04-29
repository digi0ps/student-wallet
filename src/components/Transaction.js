import React from 'react'
import {Link} from 'react-router-dom'

const Transaction = ({index, tagclass, id, transaction}) => (
    <div className="trans box is-unselectable mybox" key={index}>
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
                <strong>
                    <Link to={{
                      pathname: "/new",
                      transaction,
                      transaction_key: id,
                    }}>
                    <span className="is-size-4 has-text-black">{ transaction.title }</span>
                    </Link>
                </strong>
                <br />
              <span className="amount">
              Rs. {transaction.amount}
              </span>
              <br />
              <span className={tagclass}>{ transaction.cashorbank }</span>    
              <a className="margin15">#{transaction.category}</a>
              <span className="is-size-6 has-text-warning margin15">{transaction.type}</span>
              <span className="is-size-7 has-text-grey-light margin15">ID: { id.substr(6) }</span>
            </p>
          </div>
        </div>
      </article>
    </div>
)

export default Transaction