
import { Link, ImmutableXClient, ImmutableMethodResults, ERC721TokenType, ETHTokenType, ImmutableRollupStatus } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import './Inventory.css';
require('dotenv').config();

interface BridgingProps {
  client: ImmutableXClient,
  link: Link,
  wallet: string
}

const Bridging = ({ client, link, wallet }: BridgingProps) => {
  // withdrawals
  const [preparingWithdrawals, setPreparingWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [readyWithdrawals, setReadyWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [completedWithdrawals, setCompletedWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  // eth
  const [depositAmount, setDepositAmount] = useState('');
  const [prepareAmount, setPrepareAmount] = useState('');
  // nft
  const [depositTokenId, setDepositTokenId] = useState('');
  const [depositTokenAddress, setDepositTokenAddress] = useState('');
  const [prepareTokenId, setPrepareTokenId] = useState('');
  const [prepareTokenAddress, setPrepareTokenAddress] = useState('');
  const [completeTokenId, setCompleteTokenId] = useState('');
  const [completeTokenAddress, setCompleteTokenAddress] = useState('');

  useEffect(() => {
    load()
  }, [])

  async function load(): Promise<void> {
    setPreparingWithdrawals(await client.getWithdrawals({
      user: wallet,
      rollup_status: ImmutableRollupStatus.included
    })) // included in batch awaiting confirmation
    setReadyWithdrawals(await client.getWithdrawals({
      user: wallet,
      rollup_status: ImmutableRollupStatus.confirmed,
      withdrawn_to_wallet: false
    })) // confirmed on-chain in a batch and ready to be withdrawn
    setCompletedWithdrawals(await client.getWithdrawals({
      user: wallet,
      withdrawn_to_wallet: true
    })) // confirmed on-chain in a batch and already withdrawn to L1 wallet
  };

  // deposit an NFT
  async function depositNFT() {
    await link.deposit({
      type: ERC721TokenType.ERC721,
      tokenId: depositTokenId,
      tokenAddress: depositTokenAddress
    })
  };

  // deposit eth
  async function depositETH() {
    await link.deposit({
      type: ETHTokenType.ETH,
      amount: depositAmount,
    })
  };

  // prepare an NFT withdrawal
  async function prepareWithdrawalNFT() {
    await link.prepareWithdrawal({
      type: ERC721TokenType.ERC721,
      tokenId: prepareTokenId,
      tokenAddress: prepareTokenAddress
    })
  };

  // prepare an eth withdrawal
  async function prepareWithdrawalETH() {
    await link.prepareWithdrawal({
      type: ETHTokenType.ETH,
      amount: prepareAmount,
    })
  };

  // complete an NFT withdrawal
  async function completeWithdrawalNFT() {
    await link.completeWithdrawal({
      type: ERC721TokenType.ERC721,
      tokenId: completeTokenId,
      tokenAddress: completeTokenAddress
    })
  };

  // complete an eth withdrawal
  async function completeWithdrawalETH() {
    await link.completeWithdrawal({
      type: ETHTokenType.ETH,
    })
  };

  return (
    <div className='mint-div'>
      <div className='inline-mint'>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}>EFT</h4>
        </div>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}> Deposit ETH:</h4>
        </div>
        <div className='inline-controls order '>

          <label>
            Amount (ETH):
            <input type="text" className='input-field' value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
          </label>
          <button className='invent-btns' onClick={depositETH}>Deposit ETH</button>
        </div>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}>Prepare ETH for withdrawal (submit to be rolled up and confirmed on chain in the next batch):</h4>
        </div>

        <div className='inline-controls order'>
          <label>
            Amount (ETH):
            <input type="text" className='input-field' value={prepareAmount} onChange={e => setPrepareAmount(e.target.value)} />
          </label>
          <button className='invent-btns deposit-btn' onClick={prepareWithdrawalETH}>Prepare ETH Withdrawal</button>
        </div>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}> Complete ETH withdrawal (withdraws entire eth balance that is ready for withdrawal to L1 wallet):</h4>
        </div>


        <div className="inline-controls">
          <button className='invent-btns deposit-btn complete-btn' onClick={completeWithdrawalETH}>Complete ETH Withdrawal</button>
        </div>

        {/* <div> */}

          <div className='theader-mint'>
            <h4 style={{ 'marginLeft': '21px' }}> ERC721:</h4>
          </div>
          <div className='theader-mint'>
            <h4 style={{ 'marginLeft': '21px' }}> Deposit NFT:</h4>
          </div>


          <div className='inline-controls '>
          <label>
          Token ID:
            <input type="text" className='input-field' value={depositTokenId} onChange={e => setDepositTokenId(e.target.value)} />
          </label>
          <label>
          Token Address:
            <input type="text" className='input-field' value={depositTokenAddress} onChange={e => setDepositTokenAddress(e.target.value)}  />
          </label>

          <button className='invent-btns'onClick={depositNFT}>Deposit NFT</button>
        </div>


        


          <div className='theader-mint'>
            <h4 style={{ 'marginLeft': '21px' }}>  Prepare NFT for withdrawal (submit to be rolled up and confirmed on chain in the next batch):</h4>
          </div>

          <div className='inline-controls'>
            <label>
              Token ID:
              <input type="text" className='input-field' value={prepareTokenId} onChange={e => setPrepareTokenId(e.target.value)} />
            </label>
            <label>
              Token Address:
              <input type="text" className='input-field' value={prepareTokenAddress} onChange={e => setPrepareTokenAddress(e.target.value)} />
            </label>
            <button className='invent-btns deposit-btn' onClick={prepareWithdrawalNFT}>Prepare NFT Withdrawal</button>
          </div>

          <div className='theader-mint'>
            <h4 style={{ 'marginLeft': '21px' }}> Complete NFT withdrawal (withdraws single NFT that is ready for withdrawal to L1 wallet):</h4>
          </div>

          <div className='inline-controls'>

            <label>
              Token ID:
              <input type="text" className='input-field' value={completeTokenId} onChange={e => setCompleteTokenId(e.target.value)} />
            </label>
            <label>
              Token Address:
              <input type="text" className='input-field' value={completeTokenAddress} onChange={e => setCompleteTokenAddress(e.target.value)} />
            </label>
            <button className='invent-btns deposit-btn' onClick={completeWithdrawalNFT}>Complete NFT Withdrawal</button>
          </div>
        {/* </div> */}

        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}> Withdrawals being prepared:</h4>

          {/* {JSON.stringify(preparingWithdrawals)} */}
        </div>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}>Ready for withdrawal:</h4>

          {/* {JSON.stringify(readyWithdrawals)} */}
        </div>
       
        <div className='theader-mint'>
        <h4 style={{ 'marginLeft': '21px' }}>  Withdrawn to wallet:</h4>
        
          {/* {JSON.stringify(completedWithdrawals)} */}
        </div>
      </div>




    </div>
  );
}

export default Bridging;
