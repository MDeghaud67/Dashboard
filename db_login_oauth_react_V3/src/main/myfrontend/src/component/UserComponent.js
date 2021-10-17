import React from 'react';
import UserService, {getAllUsers} from '../services/UserService';

class UserComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch("/list_users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    /*
    componentDidMount() {
        // eslint-disable-next-line no-undef
        getAllUsers().then((response) => {
            this.setState({users: response.data})
        });
    }

     */

    render() {
        return(
            <div>
                <h1 className="text-center"> Users List</h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>User Id</td>
                        <td>User Name</td>
                        <td>User Email</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items.map(
                            item =>
                                <tr key = {item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserComponent;