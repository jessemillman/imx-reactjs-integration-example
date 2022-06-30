import { Link } from "react-router-dom"
import immuLogo from '../../assets/logo.svg';
import './Sidebar.css';
interface Props {
    setbalanceValue: any,
    sigin: () => any;
}

const Sidebar = ({ setbalanceValue,sigin }: Props) => {

    const sidebarConfig = [
        {
            LabelName: 'Listing',
            Link: '/listing'
        },
        {
            LabelName: 'Inventory',
            Link: '/inventory'
        },
        {
            LabelName: 'Signing',
            Link: '/signing'
        }, {
            LabelName: 'State',
            Link: '/state'
        }, {
            LabelName: 'Deposit',
            Link: '/deposit'
        },
        {
            LabelName: 'Withdrawal',
            Link: '/withdrawal'
        }, {
            LabelName: 'Settings',
            Link: '/settings'
        }

    ]



    return (
        <div className="main-sidebar">

            <div className="logo">
                <img src={immuLogo} alt="immutableX" />
                <div className="sigin-btn">
                    <button className="connect-btn" onClick={sigin} type="button">Connect Wallet</button>
                </div>


            </div>



            {
                sidebarConfig.map((menu, ind) => {
                    return (
                        <ul key={ind}>
                            <li><Link to={menu.Link}>{menu.LabelName}</Link>
                            </li>
                        </ul>
                    )
                })
            }

            <div className="balance-div">
                <h5>Your Balance <br></br> <span className="inline-text">{setbalanceValue?.balance?.toString()}</span></h5>

                <button className="bal-btn" type="button">Top Up Balance</button>



            </div>

        </div >
    )

}

export default Sidebar