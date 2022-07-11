import { useParams } from "react-router-dom";
import { Link, ImmutableXClient, ImmutableMethodResults, MintableERC721TokenType, ETHTokenType, ERC20TokenType } from '@imtbl/imx-sdk';
import { useState } from "react";
import './AssetDetails.css'
import CommonPopup from '../../Components/Popup/CommonPopup';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
interface AsserProps {
    client: ImmutableXClient,
    link: Link,
    wallet: string,
    sigin: () => any,
    details?: any;
}
type LocationState = {
    from: {
        pathName: string,
        id: any
    }
}

const AssetDetails = ({ client, link, wallet, sigin, details }: AsserProps) => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [clickedBtnValue, setClickedValue] = useState('Transfer');
    const [transferRes, setTransferRes] = useState<any>(Object);
    const { pageName, id } = useParams();

    async function buyNFT() {
        await link.buy({
            orderIds: [details.order_id.toString()]
        })
    };

    const commonClick = (value: any) => {
        if (value) {
            setShow(true)
            setClickedValue(value);
        }

    }

    const actionClick = async (input: any) => {
        setShow(false)
        console.log(input)

        if (input.screenName == 'Transfer') {
            const inputdata = {
                amount: ethers.utils.formatUnits(details?.orders?.sell_orders[0]?.buy_quantity, details?.orders?.sell_orders[0]?.buy_decimals),
                type: ETHTokenType.ETH,
                tokenAddress: details?.token_address,
                toAddress: input.Address,
            }

            const response = await link.transfer([inputdata])
            setTransferRes(response?.result[0]?.status === "success" ? response?.result[0]?.status : {})
            console.log(response)
        } else if (input.screenName == 'Sell') {
            const inputdata = {
                tokenId: details?.token_id,
                amount: input.amount,
                tokenAddress: details?.token_address
                // tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
                // currencyAddress: '0x4c04c39fb6d2b356ae8b06c47843576e32a1963e',
            }
            const response = await link.sell(inputdata)
            console.log(response)
        }

        //navigate('/inventory');

    }

    return (<>
        {console.log(details)}
        <div className='mint-div asset'>
            <div className='inline-mint'>
                <div className="main-asset">
                    <div className="img-section">
                        <img src={pageName === "listing" ? details['sell']['data']['properties']['image_url'] : details.image_url}
                            alt='test' />
                    </div>
                    <div className="detail-section">
                        <div className='sub-container'>

                            <img className='avatar-img'
                                src={pageName === "listing" ? details['sell']['data']['properties']['collection']['icon_url'] : details['collection'].icon_url} alt="" />

                            <span className='text-spn'>{pageName === "listing" ? details['sell']['data']['properties']['collection']['name'] : details['collection'].name}</span>
                        </div>
                        <div>
                            <h1>{pageName === "listing" ? details['sell']['data']['properties']['name'] : details.name}</h1>
                            <div className="own-div">
                                <span className='own-label'>Owned by </span>
                                <span className='eth-amount'>{details?.user?.slice(0, 8)}...{details?.user?.slice(-4)}</span>
                            </div>
                        </div>
                        {(details?.orders?.sell_orders[0]?.buy_quantity || details?.buy?.data?.quantity) ? <div className="action-section">
                            <div className="amount-section">
                                <i className='fab fa-ethereum'></i>
                                <span className="eth-amount">{pageName === "listing" ? ethers.utils.formatUnits(details['buy']['data']['quantity'], details['buy']['data']['decimals']) : ethers.utils.formatUnits(details?.orders?.sell_orders[0]?.buy_quantity, details?.orders?.sell_orders[0]?.buy_decimals)}</span>

                                {/* <span className="usd-amount">($165.28 USD)</span> */}
                            </div>
                            {pageName === "listing" ? <button onClick={() => { (wallet && wallet !== "undefined") ? buyNFT() : sigin() }} className="invent-btns btn-position buy-now-button">Buy</button> : <div className="btn-style ">
                                <button onClick={() => commonClick('Transfer')} className="invent-btns btn-position">Transfer</button>
                                <button onClick={() => commonClick('Sell')} className="invent-btns btn-position">Sell</button>
                            </div>}
                        </div> : <div className="action-section not-for-sale-section"><div className="not-for-sale">Not For Sale</div></div>}
                        {Object.keys(transferRes)?.length ? <div className="State-details">
                            <label>Amount</label>
                            <span>:</span>
                            <span className='state-value'>{transferRes?.amount}</span>
                            <label>Status</label>
                            <span>:</span>
                            <span className='state-value'>{transferRes?.status}</span>
                            <label>To Address</label>
                            <span>:</span>
                            <span className='state-value'>{transferRes?.toAddress}</span>
                            <label>Token Address</label>
                            <span>:</span>
                            <span className='state-value'>{transferRes?.tokenAddress}</span>
                            <label>TX Id</label>
                            <span>:</span>
                            <span className='state-value'>{transferRes?.txId}</span>
                            <label>Type</label>
                            <span>:</span>
                            <span className='state-value'>{transferRes?.type}</span>
                        </div>:<></>}

                    </div>
                </div>
            </div>
            <CommonPopup show={show} handleClose={handleClose} headerName={clickedBtnValue} ClickedButton={clickedBtnValue} performFuction={actionClick} />
        </div>
    </>

    )
}

export default AssetDetails