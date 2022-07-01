import testimge from './assets/images/3.jpg';
import avatar from './assets/images/avatar.png';
import { Link, ImmutableXClient, ImmutableMethodResults, ImmutableOrderStatus } from '@imtbl/imx-sdk';
import './Listings.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
const Listings = () => {

  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    axios.get(`https://api.x.immutable.com/v1/orders?buy_token_type=ETH&direction=asc&include_fees=true&order_by=buy_quantity_with_fees&page_size=48&sell_token_address=0xacb3c6a43d15b907e8433077b6d38ae40936fe2c&sell_token_type=ERC721&status=active`)
      .then(res => {
        const persons = res.data.result;
        setUserData(persons)
      })
  }, [])
  return (
    <>
      <div className='inline-div'>
        <div className='top-header'>
          <h4 style={{ 'marginLeft': '21px' }}> Listed Assets</h4>
          <button className='list-btn' type="button">Guild of Guardians</button>
          <button className='list-btn' type="button">Gods Unchained</button>
        </div>

        {/* {JSON.stringify(userdata)}; */}
        <div className='card-split'>

          {
            userdata.map((user:any,key) => {
              return (
                <div key={key} className='cards'>
                  <img src={user['sell']['data']['properties']['image_url']} />
                  <p>{user['sell']['data']['properties']['name']}</p>
                  <div>
                    <img className='avatar-img' src={user['sell']['data']['properties']['collection']['icon_url']} />
                    <span className='text-spn'>@jessemillman.eth</span>
                  </div>
                </div>
              )
            })
          }


        </div>


      </div>
    </>
  )
}

export default Listings