import { Link, ImmutableXClient, ImmutableMethodResults, ImmutableOrderStatus} from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
require('dotenv').config();

interface MarketplaceProps {
  client: ImmutableXClient,
  link: Link
}

const Marketplace = ({client, link}: MarketplaceProps) => {
  const [marketplace, setMarketplace] = useState<ImmutableMethodResults.ImmutableGetOrdersResult>(Object);
  const [buyOrderId, setBuyOrderId] = useState('');

  useEffect(() => {
    load()
  }, [])

  async function load(): Promise<void> {
    setMarketplace(await client.getOrders({status: ImmutableOrderStatus.active, user: '0xc120a52ad90bb926bafcdfc9161740dcf4a2cea1'}))
  };

  // buy an asset
  async function buyNFT() {
    await link.buy({
      orderIds:[buyOrderId]
    })
  };

  return (console.log(marketplace.result),
    <div className='mint-div marketplace'>
      <div className='inline-mint'>
        <div className='theader-mint'>
<h4>Buy asset:</h4>
        </div>
        <div className='inline-controls order '>
        <label>
          Order ID:
          <input type="text" className='input-field' value={buyOrderId} onChange={e => setBuyOrderId(e.target.value)} />
        </label>
        <button onClick={buyNFT} className="invent-btns">Buy</button>
        </div>
      </div>
      <br/><br/><br/>
      <div className='inline-mint'>
      <div className='theader-mint'>
      <h4>Marketplace (active sell orders):</h4>
        </div>
        <br/>
        {/* {JSON.stringify(marketplace.result)} */}
      </div>
    </div>
  );
}

export default Marketplace;
