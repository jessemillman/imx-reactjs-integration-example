
import { Link, ImmutableXClient, SyncStateEventPayload, SyncStateEventTypes } from '@imtbl/imx-sdk';
import './Inventory.css';
require('dotenv').config();

interface StateProps {
    client: ImmutableXClient,
    link: Link,
    wallet: any,
    stateDetails?: any,
}


const State = ({ client, link, wallet, stateDetails }: StateProps) => {

    return (console.log(stateDetails),
        <>
            <div className='mint-div'>
                <div className='inline-mint'>
                    <div>
                        <div className='state-h3'>
                            <h3 style={{ 'marginLeft': '21px' }}>State Details</h3>
                        </div>
                        {
                            stateDetails?.map((state: any, key: any) => {
                                return (
                                    <div key={key} className="State-details">
                                        <label>Event Type</label>
                                        <span>:</span>
                                        <span className='state-value'>{state?.eventType}</span>

                                        <label>Connected Network Id</label>
                                        <span>:</span>
                                        <span className='state-value'>{state?.connectedNetworkId}</span>

                                        <label>Connected Wallet Address</label>
                                        <span>:</span>
                                        <span className='state-value'>{state?.connectedWalletAddress}</span>
                                    </div>
                                )
                            })
                        }


                    </div>







                </div>
                <br />
            </div>
        </>
    )
}

export default State