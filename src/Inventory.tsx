import { ethers } from 'ethers';
import { Link, ImmutableXClient, ImmutableMethodResults, MintableERC721TokenType } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import './Inventory.css';
require('dotenv').config();

interface InventoryProps {
  client: ImmutableXClient,
  link: Link,
  wallet: string
}

const Inventory = ({ client, link, wallet }: InventoryProps) => {
  const [inventory, setInventory] = useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
  // minting
  const [mintTokenId, setMintTokenId] = useState('');
  const [mintBlueprint, setMintBlueprint] = useState('');
  const [mintTokenIdv2, setMintTokenIdv2] = useState('');
  const [mintBlueprintv2, setMintBlueprintv2] = useState('');

  // buying and selling
  const [sellAmount, setSellAmount] = useState('');
  const [sellTokenId, setSellTokenId] = useState('');
  const [sellTokenAddress, setSellTokenAddress] = useState('');
  const [sellCancelOrder, setSellCancelOrder] = useState('');

  useEffect(() => {
    load()
  }, [])

  async function load(): Promise<void> {
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }))
  };

  // sell an asset
  async function sellNFT() {
    await link.sell({
      amount: sellAmount,
      tokenId: sellTokenId,
      tokenAddress: sellTokenAddress
    })
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }))
  };

  // cancel sell order
  async function cancelSell() {
    await link.cancel({
      orderId: sellCancelOrder
    })
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }))
  };

  // helper function to generate random ids
  function random()
    : number {
    const min = 1;
    const max = 1000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // the minting function should be on your backend
  async function mint() {

    /**
    //if you want to mint on a back end server you can also provide the private key of your wallet directly to the minter. 
    //Please note: you should never share your private key and so ensure this is only done on a server that is not accessible from the internet
    const minterPrivateKey: string = process.env.REACT_APP_MINTER_PK ?? ''; // registered minter for your contract
    const minter = new ethers.Wallet(minterPrivateKey).connect(provider);
    **/

    //requires metamask wallet

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const minter = provider.getSigner(); //get Signature from Metamask wallet

    const publicApiUrl: string = process.env.REACT_APP_ROPSTEN_ENV_URL ?? '';
    const starkContractAddress: string = process.env.REACT_APP_ROPSTEN_STARK_CONTRACT_ADDRESS ?? '';
    const registrationContractAddress: string = process.env.REACT_APP_ROPSTEN_REGISTRATION_ADDRESS ?? '';
    const minterClient = await ImmutableXClient.build({
      publicApiUrl,
      signer: minter,
      starkContractAddress,
      registrationContractAddress,
    })

    // mint any number of NFTs to specified wallet address (must be registered on Immutable X first)
    const token_address: string = process.env.REACT_APP_TOKEN_ADDRESS ?? ''; // contract registered by Immutable
    const result = await minterClient.mint({
      mints: [{
        etherKey: wallet,
        tokens: [{
          type: MintableERC721TokenType.MINTABLE_ERC721,
          data: {
            id: mintTokenId, // this is the ERC721 token id
            blueprint: mintBlueprint, // this is passed to your smart contract at time of withdrawal from L2
            tokenAddress: token_address.toLowerCase(),
          }
        }],
        nonce: random().toString(10),
        authSignature: ''
      }]
    });
    console.log(`Token minted: ${result.results[0].token_id}`);
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }))
  };

  async function mintv2() {

    /**
    //if you want to mint on a back end server you can also provide the private key of your wallet directly to the minter. 
    //Please note: you should never share your private key and so ensure this is only done on a server that is not accessible from the internet
    const minterPrivateKey: string = process.env.REACT_APP_MINTER_PK ?? ''; // registered minter for your contract
    const minter = new ethers.Wallet(minterPrivateKey).connect(provider);
    **/

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const minter = provider.getSigner(); //get Signature from Metamask wallet

    const publicApiUrl: string = process.env.REACT_APP_ROPSTEN_ENV_URL ?? '';
    const starkContractAddress: string = process.env.REACT_APP_ROPSTEN_STARK_CONTRACT_ADDRESS ?? '';
    const registrationContractAddress: string = process.env.REACT_APP_ROPSTEN_REGISTRATION_ADDRESS ?? '';
    const minterClient = await ImmutableXClient.build({
      publicApiUrl,
      signer: minter,
      starkContractAddress,
      registrationContractAddress,
    })

    // mint any number of NFTs to specified wallet address (must be registered on Immutable X first)
    const token_address: string = process.env.REACT_APP_TOKEN_ADDRESS ?? ''; // contract registered by Immutable
    const royaltyRecieverAddress: string = process.env.REACT_APP_ROYALTY_ADDRESS ?? '';
    const tokenReceiverAddress: string = process.env.REACT_APP_TOKEN_RECEIVER_ADDRESS ?? '';
    const result = await minterClient.mintV2([{
      users: [{
        etherKey: tokenReceiverAddress.toLowerCase(),
        tokens: [{
          id: mintTokenIdv2,
          blueprint: mintBlueprintv2,
          // overriding royalties for specific token
          royalties: [{
            recipient: tokenReceiverAddress.toLowerCase(),
            percentage: 3.5
          }],
        }]
      }],
      contractAddress: token_address.toLowerCase(),

      // globally set royalties
      royalties: [{
        recipient: tokenReceiverAddress.toLowerCase(),
        percentage: 4.0
      }]
    }]
    );
    console.log(`Token minted: ${result}`);
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }))
  };

  return (
    <div className='mint-div'>
      <div className='inline-mint'>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}>Mint NFT</h4>
        </div>
        <div className='inline-controls '>
          <label>
            Token ID:
            <input type="text" className='input-field' value={mintTokenId} onChange={e => setMintTokenId(e.target.value)} />
          </label>
          <label>
            Blueprint:
            <input type="text"  className='input-field' value={mintBlueprint} onChange={e => setMintBlueprint(e.target.value)} />
          </label>

          <button className='invent-btns' onClick={mint}>Mint</button>
        </div>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}> MintV2 - with Royalties NFT</h4>
        </div>
        <div className='inline-controls '>
          <label>
            Token ID:
            <input type="text"  className='input-field' value={mintTokenIdv2} onChange={e => setMintTokenIdv2(e.target.value)} />
          </label>
          <label>
            Blueprint:
            <input type="text"  className='input-field' value={mintBlueprintv2} onChange={e => setMintBlueprintv2(e.target.value)} />
          </label>
          <button className='invent-btns' onClick={mintv2}>MintV2</button>
        </div>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}>  Sell asset (create sell order)</h4>
        </div>
        <div className='inline-controls asset '>

          <label>
            Amount (ETH):
            <input type="text"  className='input-field' value={sellAmount} onChange={e => setSellAmount(e.target.value)} />
          </label>
          <label>
            Token ID:
            <input type="text"  className='input-field' value={sellTokenId} onChange={e => setSellTokenId(e.target.value)} />
          </label>
          <label>
            Token Address:
            <input type="text"  className='input-field' value={sellTokenAddress} onChange={e => setSellTokenAddress(e.target.value)} />
          </label>
          <button className='invent-btns' onClick={sellNFT}>Sell</button>
        </div>
        <div className='theader-mint'>
          <h4 style={{ 'marginLeft': '21px' }}>   Cancel sell order:</h4>
        </div>
        <div className='inline-controls order'>
          <label>
            Order ID:
            <input type="text"  className='input-field' value={sellCancelOrder} onChange={e => setSellCancelOrder(e.target.value)} />
          </label>
          <button className='invent-btns' onClick={cancelSell}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
