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

        if(bid) {
            // Bid.create( auction.id, {price: bid}) 👈 why this wouldn't work? (solved)
        Bid.create( auction.id, {price: bid}).then( res => {
                if (!res.errors) {
                    Auction.one( auction.id ).then( res => {
                        this.setState({
                            auction: {
                                ...res,
                                bids: res.bids.reverse()
                            }
                        })
                    })
                }
            })
        }

        event.currentTarget.children[0].value='';                   
    }


    clickEffect(event){

        const {currentTarget} = event;
        currentTarget.style.position = 'relative';
        currentTarget.style.boxShadow = '0 0';
        currentTarget.style.left = '2px';
        currentTarget.style.top = '2px';

        setTimeout( () => {
            currentTarget.style.boxShadow = '2px 2px';
            currentTarget.style.left = '0px';
            currentTarget.style.top = '0px';
        }, 100)

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
                            <input onClick={this.clickEffect} type="submit" value="Bid" />
                        </form>
                       
                        <div> <h2>Previous Bids</h2>
                            {   
                                auction.bids.map( bid => (
                                    <div key={bid.id} className="bidContainer">
                                        <h3>${bid.price} at <small>{ bid.created_at.split('T')[0] } by {`${bid.user.first_name} ${bid.user.last_name}`} </small></h3> 
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
                                { parseInt(auction.bids[0].price, 10) > parseInt(auction.reserve_price, 10) ?
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