import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";

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
