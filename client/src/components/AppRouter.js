import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {useContext, Suspense} from "react";
import {Context} from "../index.js";
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Suspense fallback={""}>
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>)}
                <Route path="*" element={<Navigate replace to={SHOP_ROUTE}/>}/>

            </Routes>
        </Suspense>
    );
});

export default AppRouter;