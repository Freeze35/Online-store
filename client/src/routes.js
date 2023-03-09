import AdminPanel from "./pages/AdminPanel/AdminPanel";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Basket from "./pages/Basket/Basket";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DeviceShop/DevicePage";

export const authRoutes = [
    {
        path:ADMIN_ROUTE,
        Component:AdminPanel
    },
    {
        path:BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path:SHOP_ROUTE,
        Component:Shop
    },
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Auth
    },

    {
        path:DEVICE_ROUTE +"/:id",
        Component: DevicePage
    },
    {
        path:BASKET_ROUTE +"/:id",
        Component: Basket
    }

]