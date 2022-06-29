import Bridging from "./Bridging";
import Inventory from "./Inventory";
import Marketplace from "./Marketplace";
import listing from './Listings';
const Router = () => {
    const routes = [
        {
            path: '/listing',
            element: listing,
        },
        {
            path: '/inventory',
            element: Inventory,
        },
        {
            path: '/marketplace',
            element: Marketplace,
        },
        // {
        //     path: '*',
        //     redirectTo: initialRoute,
        // },
    ];
    return routes;
}

export default Router