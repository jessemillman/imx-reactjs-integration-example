import { ethers } from 'ethers';
import { Link, ImmutableXClient, ImmutableMethodResults, MintableERC721TokenType } from '@imtbl/imx-sdk';
import { getConfig, AssetsApi, ListAssetsResponse } from '@imtbl/core-sdk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inventory.css';
require('dotenv').config();
interface InventoryProps {
  client: ImmutableXClient,
  link: Link,
  wallet: any,
  setAssets?: any,
}

const Inventory = ({ client, link, wallet, setAssets }: InventoryProps) => {
  const [inventory, setInventory] = useState<ListAssetsResponse>(Object);
  // minting




  // buying and selling
  const [sellAmount, setSellAmount] = useState('');
  const [sellTokenId, setSellTokenId] = useState('');
  const [sellTokenAddress, setSellTokenAddress] = useState('');
  const [sellCancelOrder, setSellCancelOrder] = useState('');
  const networkType: any = process.env.REACT_APP_NETWORK_TYPE
  const config = getConfig(networkType);
  const assetApi = new AssetsApi(config.api);
  const navigate = useNavigate()
  useEffect(() => {
    load()
  }, [])

  async function load(): Promise<void> {
    const assetResponse = await assetApi.listAssets({
      user: wallet,
      sellOrders: true
    })
    setInventory(assetResponse['data'])
    // setInventory(await client.getAssets({ user: wallet, sell_orders: true }))
  };

  // sell an asset
  async function sellNFT() {
    await link.sell({
      amount: sellAmount,
      tokenId: sellTokenId,
      tokenAddress: sellTokenAddress
    })
    const assetResponse = await assetApi.listAssets({
      user: wallet,
      sellOrders: true
    })
    setInventory(assetResponse['data'])
  };

  // cancel sell order
  async function cancelSell() {
    await link.cancel({
      orderId: sellCancelOrder
    })
    const assetResponse = await assetApi.listAssets({
      user: wallet,
      sellOrders: true
    })
    setInventory(assetResponse['data'])
  };

  // helper function to generate random ids
  function random()
    : number {
    const min = 1;
    const max = 1000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

 



  return (
   
    <div className='mint-div'>

      <div className='inline-mint'>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}>  Sell asset (create sell order)</h4>
        </div>
        <div className='inline-controls asset '>

          <label>
            Amount (ETH):
            <input type="text" className='input-field' value={sellAmount} onChange={e => setSellAmount(e.target.value)} />
          </label>
          <label>
            Token ID:
            <input type="text" className='input-field' value={sellTokenId} onChange={e => setSellTokenId(e.target.value)} />
          </label>
          <label>
            Token Address:
            <input type="text" className='input-field' value={sellTokenAddress} onChange={e => setSellTokenAddress(e.target.value)} />
          </label>
          <button className='invent-btns' onClick={sellNFT}>Sell</button>
        </div>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}>   Cancel sell order:</h4>
        </div>
        <div className='inline-controls order'>
          <label>
            Order ID:
            <input type="text" className='input-field' value={sellCancelOrder} onChange={e => setSellCancelOrder(e.target.value)} />
          </label>
          <button className='invent-btns' onClick={cancelSell}>Cancel</button>
        </div>
      </div>
      <br />
      <div className='inline-mint'>
        <div className='inventory-section'>
          <div className='theader-mint'>
            <h4 style={{ 'marginLeft': '21px' }}>Inventory:</h4>
          </div>
          <div className='inline-div'   >
            <div className='card-split-invent' >
              {inventory?.result?.map((val: any, i: any) => {
                return val['image_url'] != null ? (
                  <div key={i} className='cards' onClick={() => { setAssets(val); navigate(`/inventory/assets/${val.token_id}`) }} >
                    <img src={val?.image_url ?? ""} alt="profile" />
                    <p>{val?.name}</p>
                    <div>
                      <span className='text-spn'>{val?.description}</span>
                    </div>
                  </div>
                ) : <div className='not-image'>
                  <div className='sub-img'>Image Not available</div>
                </div>




              })}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
