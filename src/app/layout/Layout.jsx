import React from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import Main from "../layout/main/Main";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Main className="flex-grow pb-20">{children}</Main>
      <Footer />
    </div>
  );
}

export default Layout;
