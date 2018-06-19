import React, {Component} from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
    
    render(){
        return (
            <div className="Map">
                <GoogleMapxq
                    defaultZoom={16}
                    defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
                >
                    <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />                 
                </GoogleMap>
            </div>
        )
    }
}


export default withGoogleMap(Map);