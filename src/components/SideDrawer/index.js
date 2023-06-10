import { Box, List } from '@mui/material';
import React from 'react';
import route from '../../Routes';
import SDListItem from '../SDListItem';
import selHome from '../../assets/svg/selHome.svg';
import deselHome from '../../assets/svg/deselHome.svg';
import selPeople from '../../assets/svg/selPeople.svg';
import deselPeople from '../../assets/svg/deselPeople.svg';
import selDollar from '../../assets/svg/selDollar.svg';
import deselDollar from '../../assets/svg/deselDollar.svg';
import selFile from '../../assets/svg/selFile.svg';
import deselFile from '../../assets/svg/deselFile.svg';
import { useAuthContext } from '../../context/AuthContext';
import deselHistory from '../../assets/svg/deselHistory.svg';
// import deselReq from '../../assets/svg/deselReq.svg';
// import deselShipmt from '../../assets/svg/deselShipmt.svg';
import shipmtSdDeSelImg from '../../assets/svg/shipmtSdDeSel.svg';
import shipmtSdSelImg from '../../assets/svg/shipmtSdSel.svg';
import reqListSdDeSelImg from '../../assets/svg/reqListSdDeSel.svg';
import reqListSdSelImg from '../../assets/svg/reqListSdSel.svg';
import trkOpSdDeSelImg from '../../assets/svg/trkOpSdDeSel.svg';
import trkOpSdSelImg from '../../assets/svg/trkOpSdSel.svg';
import selHistoryImg from '../../assets/svg/selHistory.svg';

import selAboutInfoSVG from '../../assets/svg/selAboutInfo.svg';
import deselAboutInfoSVG from '../../assets/svg/deselAboutInfo.svg';
import selLogSVG from '../../assets/svg/selLog.svg';
import deselLogSVG from '../../assets/svg/deselLog.svg';

function SideDrawer() {
    const { ctxtUser } = useAuthContext();
    const saMenuItems = [
        {
            title: 'Home',
            selImgPath: selHome,
            deSelImgPath: deselHome,
            path: route.saBoLists,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Users',
            selImgPath: selPeople,
            deSelImgPath: deselPeople,
            path: route.users,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Price Calculation',
            selImgPath: selDollar,
            deSelImgPath: deselDollar,
            path: route.priceFactors,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Report Config',
            selImgPath: selFile,
            deSelImgPath: deselFile,
            path: route.saReportConfigs,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Logs',
            selImgPath: selLogSVG,
            deSelImgPath: deselLogSVG,
            path: route.saLog,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Terms and Conditions',
            selImgPath: selAboutInfoSVG,
            deSelImgPath: deselAboutInfoSVG,
            path: route.about,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
    ];

    const boMenuItems = [
        {
            title: 'Home',
            selImgPath: selHome,
            deSelImgPath: deselHome,
            path: route.boDashboard,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Customers',
            selImgPath: selPeople,
            deSelImgPath: deselPeople,
            path: route.boCustList,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Truck Operators',
            selImgPath: trkOpSdSelImg,
            deSelImgPath: trkOpSdDeSelImg,
            path: route.boTrkOpList,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Requests',
            selImgPath: reqListSdSelImg,
            deSelImgPath: reqListSdDeSelImg,
            path: route.boCustReqList + 'current',
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Shipments',
            selImgPath: shipmtSdSelImg,
            deSelImgPath: shipmtSdDeSelImg,
            path: route.boShipmtList + 'current',
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'History',
            selImgPath: selHistoryImg,
            deSelImgPath: deselHistory,
            path: 'history',
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        },
        {
            title: 'Reports',
            selImgPath: selFile,
            deSelImgPath: deselFile,
            path: route.boReportsList,
            selsStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
            deSelStyle: {
                height: '1.48rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
            },
        }
    ];

    // const StyledListItem = styled(ListItemButton)(({ theme }) => ({
    //     alignItems: "center", py: 2,
    //     backgroundColor: location.pathname === i.path && "#E8E4FB",
    //     color: theme.palette.common
    // }));

    return (
        <Box
            bgcolor="otherColors.white"
            height={'100%'}
            sx={{ borderRight: 1, borderColor: '#E3E3E3' }}
        >
            <List>
                {(ctxtUser?.type === 'sa' ? saMenuItems : boMenuItems).map(
                    (i) => (
                        <SDListItem i={i} key={i.title} />
                    )
                )}
            </List>
        </Box>
    );
}

export default SideDrawer;
