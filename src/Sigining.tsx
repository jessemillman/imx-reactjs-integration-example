import { useEffect, useState } from 'react';
import { Link, ImmutableXClient } from '@imtbl/imx-sdk';
import './Inventory.css';
require('dotenv').config();

interface SigningProps {
    client: ImmutableXClient,
    link: Link,
    wallet: string
}

const Signing = ({ client, link, wallet }: SigningProps) => {

    const sigin = () => {
        link.sign({
            message: 'Welcome to Wallet',
            description: 'Message that a user will see',
        });
    }

    const [signin, setSignin] = useState("");
    return (
        <>
            <div className='mint-div'>
                <div className='inline-mint'>
                    <div className='theader-signin'>
                        <h3 style={{ 'marginLeft': '21px' }}>Sign In </h3>
                    </div>
                    <div className='signin-input-controls'>
                        {/* <label>
                           User Name */}
                        <input type="text" className='sigin-field' value={signin} onChange={e => setSignin(e.target.value)} />
                        {/* </label> */}
                        <button className='invent-btns' onClick={sigin}>Sign In</button>
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}

export default Signing