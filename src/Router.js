import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import App from './components/App'
import Home from './components/Home'

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="approuter">
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/home" component={Home} />
                </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router