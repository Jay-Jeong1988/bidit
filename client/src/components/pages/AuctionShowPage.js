import React, {Component} from 'react';
import { Auction } from '../../lib/requests';

class AuctionShowPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            auction: null
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        Auction.one(id).then( data => {
            this.setState({
                auction: data
            })
        })
    }

    render() {
        const {auction} = this.state;
        
        return (
            <div className="AuctionShowPage">
            { auction ? 
                <div style={{textAlign: 'center', padding:'2em'}} className="AuctionContainer">
                    <h2>{auction.title}</h2>
                    <p>{auction.description}</p>
                    <h4>${auction.reserve_price}</h4>
                    <small> created on: {auction.created_at.split('T')[0]} { auction.seller ? `by ${auction.seller.full_name}` : '' }</small>
                    <br/>
                    { auction.expiry_date ? <small>expires on: {auction.expiry_date.split('T')[0]} </small> : '' } 
                </div>

                :

                ''

            }
            </div>
        )
    }
}

export default AuctionShowPage;