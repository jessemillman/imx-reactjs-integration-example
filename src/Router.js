import Bridging from "./Bridging";
import Inventory from "./Inventory";
import Marketplace from "./Marketplace";
import listing from './Listings';
import Listings from "./Listings";
// import Signing from "./Signing";
const Router = () => {
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
            path: '*',
            element: Listings
        }

    ];
    return routes;
}

export default Router