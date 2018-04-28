import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Verify from './components/Verify'
import New from './components/createTrans'

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="approuter">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/welcome" component={Welcome} />
                    <Route path="/register" component={Register} />
                    <Route path="/verify" component={Verify} />
                    <Route path="/new" component={New} />
                </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router