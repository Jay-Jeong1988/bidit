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
                    auctions.map( auction => {
                        const { aasm_state: state } = auction   
       
                        return (state === 'published' || state === 'reserve_met') ?
                            (
                            <div key={auction.id} style={{textAlign: 'center', padding:'2em'}} className="AuctionContainer">
                                <Link to={`/auctions/${auction.id}`}> <h2>{auction.title}</h2> </Link>
                                <p>{auction.description}</p>
                                <h4>${auction.reserve_price}</h4>
                                <h3>{ auction.seller ? auction.seller.full_name : ''}</h3>
                                <small>expires on: { auction.expiry_date ? auction.expiry_date.split('T')[0] : null }</small>
                            </div>
                            )
                            :
                            ( auction.seller.email === this.props.user.email ? 
                                (
                                <div style={{textAlign: 'center', margin: '2em 1em'}}>
                                    <div style={{border: 'dotted black 2px', borderBottom:'0', color:'rgb(60,60,60)'}}>Your Draft Auction</div>
                                    <div key={auction.id} style={{textAlign: 'center', padding:'2em', color: 'lightgray', border: 'dotted black 2px' }} className="AuctionContainer">
                                        <Link style={{color: 'gray'}} to={`/auctions/${auction.id}`}> <h2>{auction.title}</h2> </Link>
                                        <p>{auction.description}</p>
                                        <h4>${auction.reserve_price}</h4>
                                        <h3>{ auction.seller ? auction.seller.full_name : ''}</h3>
                                        <small>expires on: { auction.expiry_date ? auction.expiry_date.split('T')[0] : null }</small>
                                    </div>
                                </div>
                                )
                                :
                                ''
                            )                     
                    })        
                }
            </div>
        )
    }
}





export default AuctionIndexPage;