import './App.css';
import { Link, ImmutableXClient, ImmutableMethodResults } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import { useNavigate ,Route, Routes } from 'react-router-dom';
import Marketplace from './Marketplace';
import Inventory from './Inventory';
import Bridging from './Bridging';
import Sidebar from './Components/Sidebar/Sidebar';
import getRoutes from './Router';
require('dotenv').config();



const App = () => {
  let navigate = useNavigate();
  // initialise Immutable X Link SDK
const link = new Link(process.env.REACT_APP_ROPSTEN_LINK_URL)

  // general
  const [tab, setTab] = useState('marketplace');
  const [wallet, setWallet] = useState('undefined');
  const [balance, setBalance] = useState<ImmutableMethodResults.ImmutableGetBalanceResult>(Object);
  const [client, setClient] = useState<ImmutableXClient>(Object);
  const [sidebar, setSidebar] = useState(true)

  useEffect(() => {
    buildIMX()
  }, [])

  // initialise an Immutable X Client to interact with apis more easily
  async function buildIMX() {
    const publicApiUrl: string = process.env.REACT_APP_ROPSTEN_ENV_URL ?? '';
    setClient(await ImmutableXClient.build({ publicApiUrl }))
  }

  // register and/or setup a user
  async function linkSetup(): Promise<void> {
    // console.log('APP COMPONENT')
    const res = await link.setup({})
    setWallet(res.address)
    setBalance(await client.getBalance({ user: res.address, tokenAddress: 'eth' }))
    navigate('/listing')
  };

  function handleTabs() {
    if (client.address) {
      switch (tab) {
        case 'inventory':
          if (wallet === 'undefined') return <div>Connect wallet</div>
          return <Inventory
            client={client}
            link={link}
            wallet={wallet}
          />
        case 'bridging':
          if (wallet === 'undefined') return <div>Connect wallet</div>
          return <Bridging
            client={client}
            link={link}
            wallet={wallet}
          />
        default:
          return <Marketplace
            client={client}
            link={link}
          />
      }
    }
    return null
  }

  const setSidebarHandler = (value: boolean) => {
    return setSidebar(value)
  };

  return (
    <div className="App">
      <div className='sidebar'>
        {sidebar && <Sidebar  setbalanceValue={balance} sigin={linkSetup} setSideHandler={setSidebarHandler}/>}
        <div className='inner-section'>
          <div className='header-title'>
            {!sidebar&&<div className='hamburger-div'>
              <svg aria-hidden="true" className='pointer' onClick={() => setSidebarHandler(true)} role="img" width="3em" height="3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5" /></svg>
            </div>}
            <div>
              <h1>Powering the next generation of web3 games
              </h1>
              <div className='header-btn'>
                <button className='button1' type="button">Start Building</button>
                <button className='button2' type="button">Contact Us</button>
              </div>
            </div>
            <div className='logoframe'>
              <iframe src={'https://player.vimeo.com/video/720459459?h=8ce82285ae&autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&background=1:'}></iframe>
            </div>
          </div>
          <div className='sub-content'>
            <Routes>
              {getRoutes().map((item, key) => (
                // item.skip ? (
                //   < Route
                //     path={item.path}
                //     key={key}
                //     element={<item.element />}
                //   >
                //   </Route>
                // ) : (
                < Route
                  path={item.path}
                  key={key}
                  element={(wallet === 'undefined') ? <div>Connect wallet</div> : <item.element client={client}
                    link={link}
                    wallet={wallet} />}
                >
                </Route>
                // )

              ))}
            </Routes>
          </div>
        </div>
      </div>





      {/* <button onClick={linkSetup}>Setup</button>
      <div>
        Active wallet: {wallet}
      </div>
      <div>
        ETH balance (in wei): {balance?.balance?.toString()}
      </div>
      <button onClick={() => setTab('marketplace')}>Marketplace</button>
      <button onClick={() => setTab('inventory')}>Inventory</button>
      <button onClick={() => setTab('bridging')}>Deposit and withdrawal</button>
      <br/><br/><br/>
      {handleTabs()} */}
    </div >
  );
}

export default App;
