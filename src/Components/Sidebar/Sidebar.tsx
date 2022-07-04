import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import immuLogo from '../../assets/logo.svg';
import useOnclickOutside from "react-cool-onclickoutside";
import './Sidebar.css';
interface Props {
    setbalanceValue: any,
    address: any,
    sigin: () => any;
    setSideHandler: (params: boolean) => any;
    disconnectWalletHandler: () => any
}

const Sidebar = ({ setbalanceValue, address, sigin, setSideHandler, disconnectWalletHandler }: Props) => {
    const [sidebarTab, setSidebarTab] = useState("listing");
    const [addressDropdown, setAddressDropdown] = useState(false);
    let navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        setSidebarTab(location?.pathname?.split("/")[1])
    }, [location?.pathname])


    const dropDownuterClick = useOnclickOutside(() => {
        setAddressDropdown(false);
    });


    const sidebarConfig = [
        {
            LabelName: 'Listing',
            Link: '/listing',
            icon: "fa fa-briefcase"
        },
        {
            LabelName: 'Inventory',
            Link: '/inventory',
            icon: "fa fa-user"
        },
        {
            LabelName: 'Signing',
            Link: '/signing',
            icon: "far fa-edit"
        }, {
            LabelName: 'State',
            Link: '/state',
            icon: "fa fa-hdd-o"
        }, {
            LabelName: 'Deposit',
            Link: '/deposit',
            icon: "fa fa-hand-o-up"
        },
        {
            LabelName: 'Withdrawal',
            Link: '/withdrawal',
            icon: "fa fa-hand-o-down"
        }, {
            LabelName: 'Settings',
            Link: '/settings',
            icon: 'fa fa-gear'
        }

    ]



    return (
        <div className="main-sidebar">
            <div className='hamburger-div'>
                <svg aria-hidden="true" className='pointer'
                    onClick={() => setSideHandler(false)} role="img" width="2em" height="2em"
                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5" /></svg>
            </div>
            <div className="logo">
                <img src={immuLogo} alt="immutableX" />
                <div className="sigin-btn" ref={dropDownuterClick}>
                    <button className={(address && address !== "undefined") ? "connect-btn address-text" : "connect-btn"}
                        onClick={(address && address !== "undefined") ? () => setAddressDropdown(!addressDropdown) : sigin}
                        type="button">
                        {(address && address !== "undefined") ? <>{address?.slice(0, 6)}...{address?.slice(-4)}<i className="fa fa-angle-down"></i></>
                            : `Connect Wallet`}
                    </button>
                    {addressDropdown && <div className="addressDropdown">
                        <div className="disconnect-wallet pointer" onClick={() => {
                            disconnectWalletHandler()
                            setAddressDropdown(false)
                        }}>
                            Disconnect Wallet
                        </div>
                    </div>}
                </div>
            </div>
            <ul className="sidebar-options">
                {
                    sidebarConfig.map((menu, ind) => {
                        return (
                            <li key={ind} className={`${menu.Link.includes(sidebarTab) ? "active-tab" : "tab"} ${(!address || address === "undefined") && "active-tab"}  pointer`}
                                onClick={() => { (address && address !== "undefined") && navigate(menu.Link) }}>
                                <i className={menu.icon} aria-hidden="true"></i>
                                <span>{menu.LabelName}</span>
                            </li>
                        )
                    })
                }
            </ul>
            {(address && address !== "undefined") && <div className="balance-div">
                <h5>Your Balance <br></br> <div className="inline-text">{setbalanceValue?.balance?.toString()}</div></h5>
                <div className="eth-div"><span className="eth-icon"><i className='fab fa-ethereum'></i></span>ETH</div>
                <button className="bal-btn" type="button">
                    <i className="fa fa-plus-circle"></i>
                    <span className="bal-btn-text">Top Up Balance</span>
                    <i className="fa fa-angle-right"></i>
                </button>
            </div>}
        </div >
    )

}

export default Sidebar