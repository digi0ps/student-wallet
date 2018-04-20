import React from 'react'
import Database from '../firebase/Database'

class Home extends React.Component {
    state = {
        count: "Loading",
        users: []
    }

    componentDidMount = () => {
        Database.ref("/usercount").on('value', (snapshot) => {
            const count = snapshot.val()
            this.setState({
                count,
            })
        })

        Database.ref("/users").once("value", (snapshot) => {
            const users = snapshot.val()
            console.log(users)
        })
    }

    render() {
        return (
            <div>
                Number of Users: {this.state.count}
            </div>
        )
    }
}

export default Home;