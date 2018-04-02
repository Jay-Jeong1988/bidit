import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Auction } from '../../lib/requests';

class AuctionIndexPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            auctions: []
        }
    }

    componentDidMount(){
        Auction.all().then( data => {
            this.setState({
                auctions: data
            })
        })
    }
    render() {
        
        const { auctions } = this.state;
        return (

            <div className="AuctionIndexPage">
                {
                    auctions.map( auction => (
                            <div key={auction.id} style={{textAlign: 'center', padding:'2em'}} className="AuctionContainer">
                                <Link to={`/auctions/${auction.id}`}> <h2>{auction.title}</h2> </Link>
                                <p>{auction.description}</p>
                                <h4>${auction.reserve_price}</h4>
                                <small>expires on: { auction.expiry_date ? auction.expiry_date.split('T')[0] : null }</small>
                            </div>
                    ))        
                }
            </div>
        )
    }
}





export default AuctionIndexPage;