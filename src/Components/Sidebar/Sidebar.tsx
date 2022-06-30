import { Dispatch, SetStateAction, useState,useEffect } from "react";
import { Link,useNavigate  } from "react-router-dom"
import immuLogo from '../../assets/logo.svg';
import './Sidebar.css';
interface Props {
    setbalanceValue: any,
    sigin: () => any;
    setSideHandler:(params:boolean)=>any;
}

const Sidebar = ({ setbalanceValue,sigin,setSideHandler }: Props) => {
    const [sidebarTab, setSidebarTab] = useState("Listing");
    let navigate=useNavigate()
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
                <svg aria-hidden="true" className='pointer' onClick={()=>setSideHandler(false)}  role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5" /></svg>
            </div>
            <div className="logo">
                <img src={immuLogo} alt="immutableX" />
                <div className="sigin-btn">
                    <button className="connect-btn" onClick={sigin} type="button">Connect Wallet</button>
                </div>


            </div>
            <ul className="sidebar-options">
                {
                    sidebarConfig.map((menu, ind) => {
                        return (
                            <li key={ind} className={`${sidebarTab === menu.LabelName ? "active-tab" : "tab"} pointer`} onClick={() => {setSidebarTab(menu.LabelName)
                                navigate(menu.Link)
                            }}><i className={menu.icon} aria-hidden="true"></i><span>{menu.LabelName}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="balance-div">
                <h5>Your Balance <br></br> <span className="inline-text">{setbalanceValue?.balance?.toString()}</span></h5>
                <div className="eth-div"><span className="eth-icon"><i className='fab fa-ethereum'></i></span>ETH</div>
                <button className="bal-btn" type="button">
                    <i className="fa fa-plus-circle"></i>
                    <span className="bal-btn-text">Top Up Balance</span>
                    <i className="fa fa-angle-right"></i>
                </button>
            </div>
        </div >
    )

}

export default Sidebar