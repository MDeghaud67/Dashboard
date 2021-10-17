import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';
import { CookiesProvider } from 'react-cookie';
import Register from './user/Register';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/list_users' exact={true} component={GroupList}/>
                        <Route path='/register' exact={true} component={Register}/>
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default App;



/*
class App extends Component {
    state = {
        isLoading: true,
        groups: []
    };

    async componentDidMount() {
        const response = await fetch('/list_users');
        const body = await response.json();
        this.setState({ groups: body, isLoading: false });
    }

    render() {
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="App-intro">
                        <h2>JUG List</h2>
                        {groups.map(group =>
                            <div key={group.id}>
                                {group.name}
                            </div>
                        )}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;

 */



/*
import './App.css';
import UserComponent from './component/UserComponent';

function App() {
  return (
    <div className="App">
      <UserComponent/>
    </div>
  );
}

export default App;

 */
