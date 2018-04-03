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

            <div className="AuctionNewPage">
                <form style={{ padding: '2em', textAlign: 'center'}} onSubmit={this.create}>

                    <div>
                        <label htmlFor="title">What do you sell?</label><br />
                        <input type="text" name="title" id="title"/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label><br />
                        <textarea cols="60" rows="10" name="description" id="description"/>
                    </div>
                    
                    <div>
                        <label htmlFor="reserve_price">Initial Price</label><br />
                        <input type="number" name="reserve_price" id="reserve_price"/>
                    </div>

                    <div>
                        <label htmlFor="expiry_date">Expires On</label><br />
                        <input type="date" name="expiry_date" id="expiry_date"/>
                    </div>

                    <input type="submit" value="Put"/>
                </form>
            </div>
        )
    }
}

export default AuctionNewPage;