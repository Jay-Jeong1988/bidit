const BASE = 'http://localhost:3000';
const JWT = localStorage.getItem('jwt');

const Auction = {

    all(){
        return fetch(`${BASE}/auctions`, {
            headers: { 'AUTHORIZATION': JWT }
        }).then( res => res.json() )
    },

    one(id){
        return fetch(`${BASE}/auctions/${id}`, {
            headers: { 'AUTHORIZATION': JWT }
        }).then( res => res.json() )
    }
}


const Token = {

    create(params) {
        return (
            fetch(`${BASE}tokens`, 
            { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
            }
            ).then( res => res.json() )
        )
    }
}

export { Auction, Token };