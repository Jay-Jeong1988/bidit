import React, {Component} from 'react';
// import AuctionDetail from '../AuctionDetail';
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
                                <h2>{auction.title}</h2>
                                <p>{auction.description}</p>
                                <h4>${auction.reserve_price}</h4>
                                <small>{auction.expiry_date}</small>
                            </div>
                    ))        
                }
            </div>
        )
    }
}





export default AuctionIndexPage;