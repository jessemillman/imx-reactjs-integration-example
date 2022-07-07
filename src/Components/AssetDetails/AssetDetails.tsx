import { useLocation } from "react-router-dom";
import { Link, ImmutableXClient, ImmutableMethodResults, MintableERC721TokenType } from '@imtbl/imx-sdk';
import './AssetDetails.css'
interface AsserProps {
    client: ImmutableXClient,
    link: Link,
    wallet: string,
    details?: any;
}
const AssetDetails = ({ client, link, wallet, details }: AsserProps) => {


    const clickFn = ()=>{
        
    }

    // const location = useLocation();
    // console.log(location)
    return (
        console.log(details),
        <div className='mint-div'>
            <div className='inline-mint'>
                <div className="main-asset">
                    <div className="img-section">
                        <img src={details['sell']['data']['properties']['image_url']} alt='test' />
                    </div>

                    <div className="detail-section">
                        <div className='sub-container'>
                            <img className='avatar-img'
                                src={details['sell']['data']['properties']['collection']['icon_url']} alt="" />
                            <span className='text-spn'>{details['sell']['data']['properties']['collection']['name']}</span>
                        </div>
                        <div>
                            <h1>{details['sell']['data']['properties']['name']}</h1>
                            <span className='own-label'>Owned by </span><span className='eth-amount'>{details?.user?.slice(0, 8)}...{details?.user?.slice(-4)}</span>
                        </div>

                        <div className='btn-section'>
                            <div>
                                <i className='fab fa-ethereum'></i><span>0.14105($165.28 USD)</span>
                            </div>


                            <button onClick={ ()=>clickFn()}className="invent-btns btn-position">Buy</button>

                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default AssetDetails