import React, {Component} from 'react';
import { Auction } from '../../lib/requests';

class AuctionNewPage extends Component {

    constructor(props) {
        super(props);
        this.create = this.create.bind(this);
    }

    create(event){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const params = { title: formData.get('title'), 
                        description: formData.get('description'),
                        reserve_price: formData.get('reserve_price'),
                        expiry_date: formData.get('expiry_date')
                    }           
        Auction.create(params).then( (data) => { 
            if(!data.errors){
                this.props.history.push('/auctions') 
            }
        })
    }
    
    render() {

        return (

            <div style={{ padding: '2em' }} className="AuctionNewPage">
                <h1> Create New Auction</h1>
                <form onSubmit={this.create}>

                    <div>
                        <label htmlFor="title">Title</label>
                        <input style={{ marginLeft: '1.4em', width: '24em' }} type="text" name="title" id="title"/>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <label htmlFor="description">Details</label>
                        <textarea cols="60" rows="10" name="description" id="description"/>
                    </div>
                    
                    <div>
                        <label htmlFor="expiry_date">Ends On</label><br />
                        <input type="date" name="expiry_date" id="expiry_date"/>
                    </div>

                    <div>
                        <label htmlFor="reserve_price">Reserve Price</label><br />
                        <input type="number" name="reserve_price" id="reserve_price"/>
                    </div>

                    <input type="submit" value="Put Online"/>
                </form>
            </div>
        )
    }
}

export default AuctionNewPage;