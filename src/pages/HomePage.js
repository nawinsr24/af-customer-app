import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

import PageContainer from '../components/layouts/PageContainer';
import ShopPage from './shop/shop';

function HomePage() {
    const { ctxtUser, setLoadingScreen } = useAuthContext();
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log("call use effect ---------------------");
    //     setLoadingScreen(true);
    //     console.log(ctxtUser?.token);
    //     if (ctxtUser?.token && ctxtUser?.type === 'sa')
    //         navigate(route.saBoLists, { replace: true });
    //     else
    //         navigate(route.login, { replace: true });

    //     setLoadingScreen(false);

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        // <PageContainer title="Multipurpose Marketplace React Ecommerce Template">
        //     <main id="homepage-1">

        //     </main>
        // </PageContainer>

        <ShopPage />
    );
}

export default HomePage