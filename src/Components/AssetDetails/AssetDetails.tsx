import { useParams } from "react-router-dom";
import { Link, ImmutableXClient, ImmutableMethodResults, MintableERC721TokenType } from '@imtbl/imx-sdk';
import { useState } from "react";
import './AssetDetails.css'
import CommonPopup from '../../Components/Popup/CommonPopup';

interface AsserProps {
    client: ImmutableXClient,
    link: Link,
    wallet: string,
    details?: any;
}
type LocationState = {
    from: {
        pathName: string,
        id: any
    }
}

const AssetDetails = ({ client, link, wallet, details }: AsserProps) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const clickFn = () => {

    }
    const { pageName, id } = useParams();


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

                        <div className="detail-section">
                            <div className='sub-container'>
                                <img className='avatar-img'
                                    src={pageName === "listing" ? details['sell']['data']['properties']['collection']['icon_url'] : details['collection'].icon_url} alt="" />
                                <span className='text-spn'>{pageName === "listing" ? details['sell']['data']['properties']['collection']['name'] : details['collection'].name}</span>
                            </div>
                            <div className="amount-section">
                                <i className='fab fa-ethereum'></i>
                                <span className="eth-amount">0.14105<span className="usd-amount">($165.28 USD)</span></span>
                            </div>
                            {pageName === "listing" ? <button onClick={() => clickFn()} className="invent-btns btn-position buy-now-btn">Buy</button> : <div className="btn-style ">
                                <button onClick={() => setShow(true)} className="invent-btns btn-position">transfer</button>
                                <button onClick={() => setShow(true)} className="invent-btns btn-position">Sale</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CommonPopup show={show} handleClose={handleClose} />
    </>

    )
}

export default AssetDetails