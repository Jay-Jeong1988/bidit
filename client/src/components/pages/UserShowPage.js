import React, {Component} from 'react';
import MapContainer from '../MapContainer';

class UserShowPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {user} = this.props;

        return (
            <div className="UserShowPage">
                <h1>{user.full_name}</h1>
                <h3>{user.email}</h3>
                { user.address
                    ? <h4>{user.address}</h4>
                    : ''
                }
                {
                    user.longitude
                    ? <div style={{width: '800px', height: '400px', borderRadius:'800px'}}>
                        <MapContainer lng={user.longitude} lat={user.latitude}/>
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default UserShowPage;