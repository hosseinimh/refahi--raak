import React from "react";
// import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";

// import store from "../state/store";
// import { AuthRoute } from "./navigation";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import LoginPage from "./pages/user/LoginPage";
import MasterPage from "./pages/masterPage/MasterPage";
import NewUserPage from "./pages/user/NewUserPage";
import UserListPage from "./pages/user/UserListPage";
import TransfrmPage from "./pages/transfrm/TransfrmPage";
import AddPlacePage from "./pages/Place/AddPlacePage";
import PlaceListPage from "./pages/Place/PlaceListPage";
import AuthProvider from "./components/providers/userProvider/AuthPrivider";
import TranslistPage from "./pages/translist/TranslistPage";
import EditUserPage from "./pages/user/EditUserPage";
import "./index.css";
import EditPlacePage from "./pages/Place/EditPlacePage";
import AddPlaceEquipmentPage from "./pages/Place/AddPlaceEquipmentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestPage from "./pages/TestPage";
import HomePage from "./pages/homePage/HomePage";
// import CodePlacePage from "./pages/Place/CodePlacePage";

function App() {
    return (
        <AuthProvider>
            <ToastContainer />
            <Routes>
                {/* <Route path="login" element={<LoginPage />} /> */}
                <Route path="/" element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="panel" element={<MasterPage />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="users" element={<UserListPage />} />
                    <Route path="newuser" element={<NewUserPage />} />
                    <Route path="edituser/:id" element={<EditUserPage />} />
                    <Route path="category" element={<CategoryPage />} />
                    <Route path="places" element={<PlaceListPage />} />
                    <Route path="addplace" element={<AddPlacePage />} />
                    <Route
                        path="addPlaceEquipment/:id"
                        element={<AddPlaceEquipmentPage />}
                    />
                    {/* <Route
                        path="codePlace/:id"
                        element={<CodePlacePage />}
                    /> */}
                    <Route path="editplace/:id" element={<EditPlacePage />} />
                    <Route path="placeRent/:id" element={<TransfrmPage />} />
                    <Route path="translist" element={<TranslistPage />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);
