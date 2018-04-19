import React, {Component} from 'react';
import Map from './Map';

export class MapContainer extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="MapContainer" style={{ width: '600px', height: '400px'}}>
                <Map 
                    containerElement={ <div style={{height: '100%'}}/> } 
                    mapElement={ <div style={{height: '100%'}}/> }
                    lng={this.props.lng}
                    lat={this.props.lat} 
                />
            </div>
        )
    }
}

export default MapContainer;
