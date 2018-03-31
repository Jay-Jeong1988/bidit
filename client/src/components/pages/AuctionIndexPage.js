import React, {Component} from 'react';
import AuctionDetail from '../AuctionDetail';
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
            }
        })
    }
    render() {

        return (

        )
    }
}





export default AuctionIndexPage;