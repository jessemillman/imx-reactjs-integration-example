
import './App.css';
import { Link, ImmutableXClient, SyncStateEventPayload, ProviderPreference } from '@imtbl/imx-sdk';
import { getConfig, BalancesApi } from '@imtbl/core-sdk';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Marketplace from './Marketplace';
import Inventory from './Inventory';
import Bridging from './Bridging';
import Sidebar from './Components/Sidebar/Sidebar';
import getRoutes from './Router';
import ConnectWalletSection from './Components/ConnectWalletSection/ConnectWalletSection';
import State from './State';
import { ethers } from 'ethers';
require('dotenv').config();



const App = () => {
  const networkType: any = process.env.REACT_APP_NETWORK_TYPE
  const config = getConfig(networkType);
  const balanceApi = new BalancesApi(config.api);
const [selectedDetails,setSelectedDetails]=useState<any>(Object)
  // initialise Immutable X Link SDK
  const link = new Link(process.env.REACT_APP_ROPSTEN_LINK_URL)

  // general
  const [tab, setTab] = useState('marketplace');
  const [wallet, setWallet] = useState('undefined');
  const [balance, setBalance] = useState<any>(Object);
  const [client, setClient] = useState<ImmutableXClient>(Object);
  const [sidebar, setSidebar] = useState(true)
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [statemaintain, setStatemaintain] = useState<any>([]);
  // const [assetdetail, setAssets] = useState();
  const stateArr: any = [];
  useEffect(() => {
    // navigate('/listing')
    buildIMX()
  }, [])

  const setAssets=(data:any)=>{
    localStorage.setItem("assetdetail",JSON.stringify(data))
  }
  useEffect(() => {
    // setStatemaintain(stateArr)
  }, [statemaintain])

  useEffect(()=>{
setSelectedDetails(JSON.parse(localStorage.getItem("assetdetail")||"{}"))
  },[localStorage.getItem("assetdetail")])

  // initialise an Immutable X Client to interact with apis more easily
  async function buildIMX() {
    const publicApiUrl: string = process.env.REACT_APP_ROPSTEN_ENV_URL ?? '';
    setClient(await ImmutableXClient.build({ publicApiUrl }))
  }

  // register and/or setup a user
  async function linkSetup(): Promise<void> {
    // console.log('APP COMPONENT')
    const res = await link.setup({ providerPreference: ProviderPreference.NONE })
    // const res = await link.setup({})
localStorage.setItem("address",res.address)
    setWallet(res.address)
    const balnaceresponce: any = await balanceApi.getBalance({ owner: res.address, address: 'eth' })
    balnaceresponce['data']['balance'] = ethers.utils.formatUnits(balnaceresponce['data']['balance'], 18);
    localStorage.setItem("balance",JSON.stringify(balnaceresponce['data']))
    setBalance(balnaceresponce['data'])

    

    const syncStateObservable = await link.syncState({})
    syncStateObservable.subscribe((syncStateEvent: any) => {
      // let isavailable = stateArr.filter((singlestate: any) => {
      //   return singlestate.connectedWalletAddress.toLowerCase() == syncStateEvent['connectedWalletAddress'].toLowerCase()
      // })
      // if (isavailable.length == 0) {
      // setTimeout(()=>{
      // stateArr.push(syncStateEvent)
      // console.log('inser', stateArr)
      
      localStorage.setItem("stateDetails",JSON.stringify(syncStateEvent))
      setStatemaintain(syncStateEvent)
      // },100)

      // }
    })

  };
  const disconnectWalletHandler = () => {
    setWallet('undefined')
    localStorage.removeItem("address");
    localStorage.removeItem("balance");
    localStorage.removeItem("stateDetails");
    localStorage.removeItem("assetdetail");
  }

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
            selectedOrderId={selectedOrderId}
          />
      }
    }
    return null
  }

  const setSidebarHandler = (value: boolean) => {
    return setSidebar(value)
  };

  const redirect = (btnName: any) => {
    if (btnName == 'Start') {
      window.open('https://docs.x.immutable.com/', '_blank', 'noopener,noreferrer');
      // window.location.href = "";
    } else if (btnName == 'Contact') {
      window.open('https://www.immutable.com/contact', '_blank', 'noopener,noreferrer');
      // window.location.href = "";
    }

  }

  const getSelectedDetails=()=>{
   setSelectedDetails(JSON.parse(localStorage.getItem("assetdetail")||"{}"))
   setBalance(JSON.parse(localStorage.getItem("balance")||"{}"))
   setWallet(localStorage.getItem("address")||'undefined')
   setStatemaintain(JSON.parse(localStorage.getItem("stateDetails")||'{}'))
   
  }

  return (
    <div className="App">
      <div className='sidebar'>
        {sidebar && <Sidebar setbalanceValue={balance} address={wallet} sigin={linkSetup} setSideHandler={setSidebarHandler} disconnectWalletHandler={disconnectWalletHandler} getSelectedDetails={getSelectedDetails} />}
        <div className='inner-section'>
          <div className='header-title'>
            {!sidebar && <div className='hamburger-div'>
              <svg aria-hidden="true" className='pointer' onClick={() => setSidebarHandler(true)} role="img" width="3em" height="3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5" /></svg>
            </div>}
            <div className='header-text-div'>
              <h1>Powering the next generation of web3 games
              </h1>
              <div className='header-btn'>
                <button className='button1' onClick={(e) => redirect('Start')} type="button">Start Building</button>
                <button className='button2' onClick={(e) => redirect('Contact')} type="button">Contact Us</button>
              </div>
            </div>
            <div className='logoframe'>
              <iframe src={'https://player.vimeo.com/video/720459459?h=8ce82285ae&autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&background=1:'}></iframe>
            </div>
          </div>
          <div className='sub-content'>


            <Routes>

              {getRoutes().map((item, key) => (

                // item.path == '/state' ? (
                //   < Route
                //     path='/state'
                //     key={key}
                //     element={(wallet === 'undefined' && !item.skip) ? <ConnectWalletSection /> : <item.element client={client}
                //       link={link}
                //       wallet={wallet} stateDetails={stateArr} />}
                //   >
                //   </Route>
                // ) : (
                < Route
                  path={item.path}
                  key={key}
                  element={(wallet && wallet !== "undefined") || item.skip ? <item.element client={client} selectedOrderId={selectedOrderId}
                    setSelectedOrderId={setSelectedOrderId}
                    link={link}
                    wallet={localStorage.getItem("address")} sigin={linkSetup} stateDetails={[statemaintain]} details={selectedDetails} getSelectedDetails={getSelectedDetails} setAssets={setAssets} /> : <ConnectWalletSection />}
                >
                </Route>
                // )

              ))}
            </Routes>



            {/* {wallet === 'undefined' 
            return(
            <div>Connect wallet</div>
            )
              
            } */}

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
