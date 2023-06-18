import React from 'react';

import BreadCrumb from '../../components/BreadCrumb';
import UserInformation from '../../components/user-information/user-information';
import FooterDefault from '../../components/footers/FooterFullwidth';
import PageContainer from '../../components/layouts/PageContainer';
// import Newletters from '~/components/partials/commons/Newletters';

const UserInformationPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'User Information',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="User Information">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <UserInformation />
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};

export default UserInformationPage;
