import React from 'react';
// import Head from 'next/head';
import HeaderDefault from '../headers/HeaderDefault';
import HeaderMobile from '../headers/HeaderMobile';
import FooterFullwidth from '../footers/FooterFullwidth';

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
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

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
