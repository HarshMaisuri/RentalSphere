import { Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/Landing.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import PasswordReset from "./components/Auth/PasswordReset.jsx";

import PMDashboard from "./components/ManagerDashboard/PMDashboard.jsx";
import PMRentManage from "./components/ManagerDashboard/PMRentManage.jsx";
import PMLeaseManage from "./components/ManagerDashboard/PMLeaseManage.jsx";
import PMViolationLog from "./components/ManagerDashboard/PMViolationLog.jsx";
import PMServiceReqs from "./components/ManagerDashboard/PMServiceReqs.jsx";
import PMAnnouncements from "./components/ManagerDashboard/PMAnnouncements.jsx";
import PMOverview from "./components/ManagerDashboard/PMOverview.jsx";
import PMTenantApprovals from "./components/ManagerDashboard/PMTenantApprovals.jsx";
import PMPendingApproval from "./components/ManagerDashboard/PMPendingApproval.jsx";
import NewPropertyManager from "./components/ManagerDashboard/NewPropertyManager.jsx";
import PMNewProperty from "./components/ManagerDashboard/PMNewProperty.jsx";

import TenantDashboard from "./components/TenantDashboard/TenantDashboard.jsx";
import TenantOverview from "./components/TenantDashboard/TenantOverview.jsx";
import TenantPayments from "./components/TenantDashboard/TenantPayments.jsx";
import TenantRequests from "./components/TenantDashboard/TenantRequests.jsx";
import TenantAnnouncements from "./components/TenantDashboard/TenantAnnouncements.jsx";
import TenantDocuments from "./components/TenantDashboard/TenantDocuments.jsx";
import TenantContacts from "./components/TenantDashboard/TenantContacts.jsx";
import TenantCommunity from "./components/TenantDashboard/TenantCommunity.jsx";
import TenantNewPost from "./components/TenantDashboard/TenantNewPost.jsx";
import TenantNewRequest from "./components/TenantDashboard/TenantNewRequest.jsx";

import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import ApprovedPMs from "./components/AdminDashboard/ApprovedPMs.jsx";
import RequestDetails from "./components/AdminDashboard/RequestDetails.jsx";
import PropertyDetails from "./components/PropertyDetails.jsx";
import TenantAccount from "./components/TenantDashboard/TenantAccount.jsx";
// import TenantNewPropertyApplication from "./components/TenantDashboard/TenantNewPropertyApplication.jsx";
import CommunityPostDetails from "./components/TenantDashboard/CommunityPostDetails.jsx";
import AddLease from "./components/ManagerDashboard/AddLease.jsx";
import NewTenantApp from "./components/NewTenantApp.jsx";
import AddViolationLog from "./components/ManagerDashboard/AddViolationLog.jsx";
import TenantViolations from "./components/TenantDashboard/TenantViolations.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/home/:id" element={<PropertyDetails />} />
      <Route exact path="/home/:id/apply" element={<NewTenantApp />} />
      <Route path="*" element={<ErrorPage />} />
      {/*  */}
      {/* Authentication Routes */}
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forgotpassword" element={<ForgotPassword />} />
      <Route exact path="/reset-password/:token" element={<PasswordReset />} />
      {/*  */}
      {/* Property Manager Routes */}
      <Route exact path="/new-manager" element={<NewPropertyManager />} />
      <Route exact path="/managerdashboard" element={<PMDashboard />}>
        <Route exact path="overview" element={<PMOverview />} />
        <Route exact path="announcements" element={<PMAnnouncements />} />
        <Route exact path="tenantapprovals" element={<PMTenantApprovals />} />
        <Route exact path="rentmanagement" element={<PMRentManage />} />
        <Route exact path="leasemanagement" element={<PMLeaseManage />} />
        <Route exact path="add-new-lease" element={<AddLease />} />
        <Route exact path="violationlog" element={<PMViolationLog />} />
        <Route exact path="add-violationlog" element={<AddViolationLog />} />
        <Route exact path="servicerequests" element={<PMServiceReqs />} />
        <Route exact path="pending" element={<PMPendingApproval />} />
        <Route exact path="newproperty" element={<PMNewProperty />} />
      </Route>
      {/*  */}
      {/* Tenant Routes */}
      <Route exact path="/tenantdashboard" element={<TenantDashboard />}>
        <Route exact path="overview" element={<TenantOverview />} />
        <Route exact path="payments" element={<TenantPayments />} />
        <Route exact path="requests" element={<TenantRequests />} />
        <Route exact path="account" element={<TenantAccount />} />
        <Route
          exact
          path="requests/new-request"
          element={<TenantNewRequest />}
        />
        <Route exact path="announcements" element={<TenantAnnouncements />} />
        <Route exact path="documents" element={<TenantDocuments />} />
        <Route exact path="contacts" element={<TenantContacts />} />
        <Route exact path="community" element={<TenantCommunity />} />
        <Route exact path="community/:id" element={<CommunityPostDetails />} />
        <Route exact path="community/new-post" element={<TenantNewPost />} />
        <Route exact path="violations" element={<TenantViolations />} />
        new-post
      </Route>
      {/*  */}
      {/* Admin Routes */}
      <Route exact path="/admin" element={<AdminDashboard />} />
      <Route exact path="/approved-managers" element={<ApprovedPMs />} />
      <Route exact path="/admin/:id" element={<RequestDetails />} />
    </Routes>
  );
};

export default AppRoutes;
