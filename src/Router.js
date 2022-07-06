import Bridging from "./Bridging";
import Inventory from "./Inventory";
import Marketplace from "./Marketplace";
import Listings from "./Listings";
import Signing from "./Sigining";
import { Navigate } from "react-router-dom";

const Router = () => {
    const RedirectHandler=()=>{
        return <Navigate to="/listing" />
    }
    const routes = [
        {
            skip: true,
            path: '/listing',
            element: Listings,
        },
        {
            skip: false,
            path: '/inventory',
            element: Inventory,
        },
        {
            skip: false,
            path: '/deposit',
            element: Bridging,
        },
        {
            skip: false,
            path: '/withdrawal',
            element: Bridging,
        }, {
            skip: true,
            path: '/',
            element: RedirectHandler
        }, {
            skip: false,
            path: '/signing',
            element: Signing
        }
        , {
            skip: false,
            path: '/marketplace',
            element: Marketplace
        }

    ];
    return routes;
}

export default Router