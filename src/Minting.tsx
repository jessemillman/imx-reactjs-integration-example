import { ethers } from 'ethers';
import { Link, ImmutableXClient, ImmutableMethodResults, MintableERC721TokenType } from '@imtbl/imx-sdk';
import { getConfig, AssetsApi, ListAssetsResponse } from '@imtbl/core-sdk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
require('dotenv').config();
interface MintProps {
    client: ImmutableXClient,
    link: Link,
    wallet: string,
    setAssets?: any,
}
const Minting = ({ client, link, wallet, setAssets }: MintProps) => {
    const [mintTokenId, setMintTokenId] = useState('');
    const [mintBlueprint, setMintBlueprint] = useState('');
    const networkType: any = process.env.REACT_APP_NETWORK_TYPE
    const config = getConfig(networkType);
    const assetApi = new AssetsApi(config.api);
    const navigate = useNavigate()
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
        const assetResponse = await assetApi.listAssets({
            user: wallet,
            sellOrders: true
        })
        navigate('/inventory');
        // setInventory(assetResponse['data'])
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
                        <input type="text" className='input-field' value={mintBlueprint} onChange={e => setMintBlueprint(e.target.value)} />
                    </label>

                    <button className='invent-btns' onClick={mint}>Mint</button>
                </div>
            </div>
        </div>
    )
}

export default Minting