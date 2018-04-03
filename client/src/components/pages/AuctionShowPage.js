import React, {Component} from 'react';
import { Auction, Bid } from '../../lib/requests';

class AuctionShowPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            auction: null
        }
        this.createBid = this.createBid.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        Auction.one(id).then( data => {
            this.setState({
                auction: {
                    ...data,
                    bids: data.bids.reverse()
                }
            })
        })
    }

    createBid(event){
        event.preventDefault();
        const {auction} = this.state;
        const formData = new FormData(event.currentTarget);
        const bid = formData.get('bid');
        Bid.create( auction.id, {price: bid}).then( res => {
            if (!res.errors) {
                auction.bids.splice(0, 0, res);
                this.setState({
                    auction: {
                        ...auction,
                        bids: [
                            ...auction.bids,
                        ]
                    }
                })
            }
        })
        event.currentTarget.children[0].value='';
                        
    }

    render() {
        const {auction} = this.state;

        return (
            <div className="AuctionShowPage">
            { auction ? 
                <div style={{ display: 'flex' }} className="AuctionContainer">
                    <div className="AuctionDetailLeft" style={{ padding: '2em', width: '50%' }}>
                        <h1>{auction.title}</h1>
                        <h4>{auction.description}</h4>
                        
                        <form className="bidForm" onSubmit={this.createBid}>
                            <input type="number" name="bid" />
                            <input type="submit" value="Bid" />
                        </form>
                       
                        <div> <h2>Previous Bids</h2>
                            {
                                auction.bids.map( bid => (
                                    <div key={bid.id} className="bidContainer">
                                        <h3>${bid.price} at <small>{bid.created_at.split('T')[0]}</small></h3> 
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div className="AuctionDetailRight" style={{ padding: '2em', width: '50%'}}>

                        { auction.bids[0] ? 
                        <div>
                            <h4>current price: {`$${auction.bids[0].price}`} </h4>
                            <small> 
                                { parseInt(auction.bids[0].price) > parseInt(auction.reserve_price) ?
                                'reserve price met'
                                : 
                                'reserve price not met' 
                                } 

                            </small>
                        </div>
                        :
                        <h4>current price: {'$0.00'} </h4>
                        }
                         
                        { auction.expiry_date ? <h4>expires on: {auction.expiry_date.split('T')[0]} </h4> : '' } 

                    </div>    
                </div>
                :

                ''
            }
            </div>
        )
    }
}

export default AuctionShowPage;