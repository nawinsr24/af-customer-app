import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import './App.css';
import "./i18next";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { createTheme, ThemeProvider } from "@mui/material"
import MissingPage from "./pages/MissingPage";
import BoListPage from "./pages/SA/BoListPage";
import AddBoPage from "./pages/SA/AddBoPage";
import RequireAuth from "./components/RequireAuth";
import HomePage from "./pages/HomePage";
import LoadingScreen from "./components/loadingScreen";
import { useAuthContext } from "./context/AuthContext";
import EditBoPage from "./pages/SA/EditBoPage";
import AddUserPage from "./pages/AddUserPage/index.js";
import EditUserPage from "./pages/EditUserPage";
import BoInfoPage from "./pages/BoInfoPage";
import UserInfoPage from "./pages/UserInfoPage";
import UserListPage from "./pages/SA/UserListPage";
import AboutInfoPage from "./pages/SA/AboutInfoPage";
import EditAboutPage from "./pages/SA/EditAboutPage";
import PricFacInfoPage from "./pages/SA/PricFacInfoPage";
import DashboardPage from "./pages/BO/DashboardPage";
import CustListPage from "./pages/BO/CustListPage";
import AddCustPage from "./pages/BO/AddCustPage";
import EditCustPage from "./pages/BO/EditCustPage";
import CustInfoPage from "./pages/BO/CustInfoPage";
import TrkOpListPage from "./pages/BO/TrkOpListPage";
import TrkOpInfoPage from "./pages/BO/TrkOpInfoPage";
import TruckInfoPage from "./pages/BO/TruckInfoPage";
import CustReqListPage from "./pages/BO/CustReqListPage";
import TrkOpReqListPage from "./pages/BO/TrkOpReqListPage";
import AddCustReqPage from "./pages/BO/AddCustReqPage";
import CustReqInfoPage from "./pages/BO/CustReqInfoPage";
import EditCustReqPage from "./pages/BO/EditCustReqPage";
import AddTrkOpReqPage from "./pages/BO/AddTrkOpReqPage";
import EditTrkOpReqPage from "./pages/BO/EditTrkOpReqPage";
import BoUserInfoPage from "./pages/BO/BoUserInfoPage";
import ShipmentListPage from "./pages/BO/ShipmentListPage";
import AddShipmtPage from "./pages/BO/AddShipmtPage";
import AddTrkPg from "./pages/BO/AddTrkPg";
import EditTrkPg from "./pages/BO/EditTrkPg";
import AddTrkOpPage from "./pages/BO/AddTrkOpPage";
import EditTrkOpPage from "./pages/BO/EditTrkOpPage";
import ShipmtInfoPage from "./pages/BO/ShipmtInfoPage";
import TrkOpReqInfoPage from "./pages/BO/TrkOpReqInfoPage";
import SamplePricCalc from "./pages/SamplePricCalc";
import ReportConfigList from "./pages/SA/ReportConfigList";
import ReportsListPage from "./pages/BO/ReportsListPage";
import LogPage from "./pages/SA/LogPage";
import TrkListByTpPage from "./pages/BO/TrkListByTpPage";
import AdrReqListPage from "./pages/BO/AdrReqListPage";


const theme = createTheme({
  palette: {
    primary: {
      main: "#5E47DD",
    },
    secondary: {
      main: "#949494"
    },
    action: {
      hover: "#E8E4FB"
    },
    otherColors: {
      white: "#ffff",
      txtFieldColor: "#F5F6F8"
    }
  },
  typography: {
    fontFamily: [
      "Outfit", "Arial", "sans-serif",
    ].join(','),
    button: {
      textTransform: 'none'
    }
  },
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       "*::-webkit-scrollbar": {
  //         width: "1.3%",
  //         maxWidth: "5px"
  //       },
  //       "*::-webkit-scrollbar-thumb": {
  //         backgroundColor: "purple"
  //       },
  //       "*:hover": {
  //         "&::-webkit-scrollbar-thumb": {
  //           backgroundColor: "green"
  //         }
  //       }
  //       /* Equivalent alternative:
  //       "*:hover::-webkit-scrollbar-thumb": {
  //         backgroundColor: "green"
  //       }
  //        */
  //     }
  //   }
  // }
})


function App() {
  const { loading } = useAuthContext();
  return (
    <ThemeProvider theme={theme}>
      {loading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/SamplePricCalc" element={<SamplePricCalc />} /> */}

        <Route element={<RequireAuth allowedRoles={['sa']} />}>
          <Route path="/sa" element={<Layout />}>
            <Route path="Backoffices" element={<BoListPage />} />
            <Route path="AddBackoffice" element={<AddBoPage />} />
            <Route path="EditBackOffice/:boId" element={<EditBoPage />} />
            <Route path="AddUser" element={<AddUserPage />} />
            <Route path="EditUser/:staffId" element={<EditUserPage />} />
            <Route path="BoInfo/:boId" element={<BoInfoPage />} />
            <Route path="UserInfo/:staffId" element={<UserInfoPage />} />
            <Route path="Users" element={<UserListPage />} />
            <Route path="about" element={<AboutInfoPage />} />
            <Route path="EditAbout" element={<EditAboutPage />} />
            <Route path="PriceFactors" element={<PricFacInfoPage />} />
            <Route path="ReportConfigs" element={<ReportConfigList />} />
            <Route path="LogPage" element={<LogPage />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={['staff']} />}>
          <Route path="/bo" element={<Layout />}>
            <Route path="Dashboard" element={<DashboardPage />} />
            <Route path="CustList" element={<CustListPage />} />
            <Route path="AddCust" element={<AddCustPage />} />
            <Route path="EditCust/:custId" element={<EditCustPage />} />
            <Route path="CustInfo/:custId" element={<CustInfoPage />} />
            <Route path="TrkOpList" element={<TrkOpListPage />} />
            <Route path="TrkOpInfo/:trkOpId" element={<TrkOpInfoPage />} />
            <Route path="TrkInfo/:trkId" element={<TruckInfoPage />} />
            <Route path="CustReqList/:time" element={<CustReqListPage />} />
            <Route path="TrkOpReqList/:time" element={<TrkOpReqListPage />} />
            <Route path="AddCustReq" element={<AddCustReqPage />} />
            <Route path="EditCustReq/:custReqId" element={<EditCustReqPage />} />
            <Route path="CustReqInfo/:custReqId" element={<CustReqInfoPage />} />
            <Route path="AddTrkOpReq" element={<AddTrkOpReqPage />} />
            <Route path="EditTrkOpReq/:trkOpReqId" element={<EditTrkOpReqPage />} />
            <Route path="profile" element={<BoUserInfoPage />} />
            <Route path="staff/:staffId" element={<UserInfoPage />} />
            <Route path="EditUser/:staffId" element={<EditUserPage />} />
            <Route path="about" element={<AboutInfoPage />} />
            <Route path="shipments/:time" element={<ShipmentListPage />} />
            <Route path="addShipmt" element={<AddShipmtPage />} />
            <Route path="addtruck" element={<AddTrkPg />} />
            <Route path="editTruck/:trkId" element={<EditTrkPg />} />
            <Route path="addTrkOp" element={<AddTrkOpPage />} />
            <Route path="editTrkOp/:trkOpId" element={<EditTrkOpPage />} />
            <Route path="shipmentInfo/:shipmtId" element={<ShipmtInfoPage />} />
            <Route path="trkOpReqInfo/:trkOpReqId" element={<TrkOpReqInfoPage />} />
            <Route path="ReportsList" element={<ReportsListPage />} />
            <Route path="trucks/:trkOpId" element={<TrkListByTpPage />} />
            <Route path="aadhaarRequests" element={<AdrReqListPage />} />
          </Route>
        </Route>


        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;