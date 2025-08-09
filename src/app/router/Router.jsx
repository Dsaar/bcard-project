import React from "react";
import { Route, Routes } from "react-router-dom";
import CardsPage from "../../features/cards/pages/CardsPage";
import FavoriteCardsPage from "../../features/cards/pages/FavoriteCardsPage";
import MyCardsPage from "../../features/cards/pages/MyCardsPage";
import AboutPage from "../../features/about/pages/AboutPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import ErrorPage from "../../errors/ErrorPage";
import ROUTES from "../../app/router/routesDictionary";
import SandboxPage from "../../pages/SandboxPage";
import CreateCardPage from "../../features/cards/pages/CreateCardPage";
import EditCardPage from "../../features/cards/pages/EditCardPage";
import CardDetailsPage from "../../features/cards/pages/CardDetailsPage";
import UserProfilePage from "../../features/users/pages/UserProfilePage";
import EditUserPage from "../../features/users/pages/EditUserPage";
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