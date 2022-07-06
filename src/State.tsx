import { useEffect, useState } from 'react';
import { Link, ImmutableXClient, SyncStateEventPayload, SyncStateEventTypes } from '@imtbl/imx-sdk';
import './Inventory.css';
require('dotenv').config();

interface StateProps {
    client: ImmutableXClient,
    link: Link,
    wallet: string
}


const State = ({ client, link, wallet }: StateProps) => {

    const [stateDetail, SetStateDetails] = useState<any>();
    useEffect(() => {
        getState();
    }, [])

    const getState = async () => {
        const syncStateObservable = await link.syncState({})

        syncStateObservable.subscribe((syncStateEvent: SyncStateEventPayload) => {
            SetStateDetails(syncStateEvent);
            console.log('syncStateEvent', syncStateEvent) // 'syncStateEvent', { eventType: 'INIT', connectedNetworkId: '0x3', connectedWalletAddress: '0x123456789...' }
        })
    }
    return (
        <>
            <div className='mint-div'>
                <div className='inline-mint'>
                    <div>
                        <div>
                            <h3 style={{ 'marginLeft': '21px' }}>State Details</h3>
                        </div>

                        <div className="State-details">
                            <label>Event Type</label>
                            <span>:</span>
                            <span>{stateDetail?.eventType}</span>

                            <label>Connected Network Id</label>
                            <span>:</span>
                            <span>{stateDetail?.connectedNetworkId}</span>

                            <label>Connected Wallet Address</label>
                            <span>:</span>
                            <span>{stateDetail?.connectedWalletAddress}</span>
                        </div>

                    </div>







                </div>
                <br />
            </div>
        </>
    )
}

export default State