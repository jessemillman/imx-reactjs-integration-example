import { useParams } from "react-router-dom";
import { Link, ImmutableXClient, ImmutableMethodResults, MintableERC721TokenType } from '@imtbl/imx-sdk';
import { useState } from "react";
import './AssetDetails.css'
import CommonPopup from '../../Components/Popup/CommonPopup';

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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [clickedBtnValue, setClickedValue] = useState('Transfer');

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

    return (<>
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
                        <div className="action-section">
                            <div className="amount-section">
                                <i className='fab fa-ethereum'></i>
                                <span className="eth-amount">0.14105<span className="usd-amount">($165.28 USD)</span></span>
                            </div>
                            {pageName === "listing" ? <button onClick={() => { (wallet && wallet !== "undefined") ? buyNFT() : sigin() }} className="invent-btns btn-position buy-now-button">Buy</button> : <div className="btn-style ">
                                <button onClick={() => commonClick('Transfer')} className="invent-btns btn-position">Transfer</button>
                                <button onClick={() => commonClick('Sale')} className="invent-btns btn-position">Sell</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <CommonPopup show={show} handleClose={handleClose} headerName={clickedBtnValue} ClickedButton={clickedBtnValue} />
        </div>
    </>

    )
}

export default AssetDetails