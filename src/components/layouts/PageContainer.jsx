import React from 'react';
// import Head from 'next/head';
import HeaderDefault from '../headers/HeaderDefault';
import HeaderMobile from '../headers/HeaderMobile';
import FooterFullwidth from '../footers/FooterFullwidth';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const initHeaders = (
    <>
        <HeaderDefault />
        <HeaderMobile />
    </>
);
const initFooters = (
    <>
        <FooterFullwidth />
    </>
);

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
    title = 'Page',
}) => {
    let titleView;

    if (title !== '') {
        titleView = "AF-CUSTOMER | " + title;
    } else {
        titleView = "AF-CUSTOMER | " + process.env.titleDescription;
    }
    useDocumentTitle(titleView)
    return (
        <>
            {/* <head> */}
            <title>{titleView}</title>
            {/* </head> */}
            {header}
            {children}
            {footer}
        </>
    );
};

export default PageContainer;
