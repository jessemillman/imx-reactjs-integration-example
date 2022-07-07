import { useParams } from "react-router-dom";
import { Link, ImmutableXClient, ImmutableMethodResults, MintableERC721TokenType } from '@imtbl/imx-sdk';
import './AssetDetails.css'
interface AsserProps {
    client: ImmutableXClient,
    link: Link,
    wallet: string,
    details?: any;
}
type LocationState = {
   from:{pathName:string,
    id:any
   }
  }
const AssetDetails = ({ client, link, wallet, details }: AsserProps) => {


    const clickFn = ()=>{
        
    }
     const {pageName, id} = useParams();
    return (
        console.log(details,pageName,id),
        <div className='mint-div'>
            <div className='inline-mint'>
                <div className="main-asset">
                    <div className="img-section">
                        <img src={pageName==="listing"?details['sell']['data']['properties']['image_url']:"Inventory-section"} alt='test' />
                    </div>

                    <div className="detail-section">
                        <div className='sub-container'>
                            <img className='avatar-img'
                                src={pageName==="listing"?details['sell']['data']['properties']['collection']['icon_url']:"Inventory-section"} alt="" />
                            <span className='text-spn'>{pageName==="listing"?details['sell']['data']['properties']['collection']['name']:'Inventory-section'}</span>
                        </div>
                        <div>
                            <h1>{pageName==="listing"?details['sell']['data']['properties']['name']:'Inventory-section'}</h1>
                            <span className='own-label'>Owned by </span><span className='eth-amount'>{pageName==="listing"?`${details?.user?.slice(0, 8)}...${details?.user?.slice(-4)}`:`Inventory-section`}</span>
                        </div>

                        <div className='btn-section'>
                            <div>
                                <i className='fab fa-ethereum'></i><span>0.14105($165.28 USD)</span>
                            </div>


                            {pageName==="listing"?<button onClick={ ()=>clickFn()}className="invent-btns btn-position">Buy</button>:<div>Inventory-section</div>}

                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default AssetDetails