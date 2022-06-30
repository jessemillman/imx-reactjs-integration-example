import Bridging from "./Bridging";
import Inventory from "./Inventory";
import Marketplace from "./Marketplace";
import listing from './Listings';
// import Signing from "./Signing";
const Router = () => {
    const routes = [
        {
            skip:false,
            path: '/listing',
            element: listing,
        },
        {
            skip:false,
            path: '/inventory',
            element: Inventory,
        },
        {
            skip:false,
            path: '/marketplace',
            element: Marketplace,
        }
        // {
        //     path: '*',
        //     redirectTo: initialRoute,
        // },
    ];
    return routes;
}

export default Router