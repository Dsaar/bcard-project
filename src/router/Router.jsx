import React from "react";
import { Route, Routes } from "react-router-dom";
import CardsPage from "./../pages/CardsPage";
import FavoriteCardsPage from "./../pages/FavoriteCardsPage";
import MyCardsPage from "./../pages/MyCardsPage";
import AboutPage from "./../pages/AboutPage";
import LoginPage from "./../pages/LoginPage";
import RegisterPage from "./../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import ROUTES from "./routesDictionary";
import SandboxPage from "../pages/SandboxPage";
import CreateCardPage from "../pages/CreateCardPage";
import EditCardPage from "../pages/EditCardPage";
import CardDetailsPage from "../pages/CardDetailsPage";
import UserProfilePage from "../pages/UserProfilePage";
import EditUserPage from "../pages/EditUserPage";
function Router() {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<CardsPage />} />
      <Route path={ROUTES.favorite} element={<FavoriteCardsPage />} />
      <Route path={ROUTES.myCards} element={<MyCardsPage />} />
      <Route path={ROUTES.about} element={<AboutPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path={ROUTES.sandbox} element={<SandboxPage />} />
      <Route path={ROUTES.createCard} element={<CreateCardPage />} />
      <Route path={ROUTES.editCard} element={<EditCardPage />} />
      <Route path="/card/:id" element={<CardDetailsPage />} />
      <Route path={ROUTES.profile} element={<UserProfilePage />} />
      <Route path={ROUTES.profileEdit} element={<EditUserPage />} />
      


      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default Router;