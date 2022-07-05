import testimge from './assets/images/3.jpg';
import avatar from './assets/images/avatar.png';
import { Link, ImmutableXClient, ImmutableMethodResults, ImmutableOrderStatus } from '@imtbl/imx-sdk';
import './Listings.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Listings = () => {

  const [userdata, setUserData] = useState([]);
  const [buttonname, setButtonName] = useState('Gods Unchained');

  const navigate=useNavigate()
  const buttonClick = (e:any) => {
    setButtonName(e.target.innerText)
  }

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
          <h3 style={{ 'marginLeft': '21px' }}> Listed Assets</h3>
          <button className={`list-btn ${buttonname == 'Guild of Guardians' ? '' : 'not-active-btn'}`}  value={buttonname} type="button" onClick={(e) => buttonClick(e)}>Guild of Guardians</button>
          <button className={`list-btn ${buttonname == 'Gods Unchained' ? '' : 'not-active-btn'}`} value={buttonname} onClick={(e) => buttonClick(e)} type="button">Gods Unchained</button>
        </div>

        {/* {JSON.stringify(userdata)}; */}
        <div className='card-split'>
{console.log(userdata)}
          {
            userdata.map((user: any, key) => {
              return (
                <div key={key} className='cards'>
                  <img src={user['sell']['data']['properties']['image_url']} />
                  <p>{user['sell']['data']['properties']['name']}</p>
                  <div className='sub-container'>
                    <img className='avatar-img' src={user['sell']['data']['properties']['collection']['icon_url']} />
                    <span className='text-spn'>@jessemillman.eth</span>
                  </div>
                </div>
              )
            })
          }


        </div>
          <button className='buy-now-btn' onClick={()=>navigate("/marketplace")}>Buy Now</button>
      </div>
    </>
  )
}

export default Listings