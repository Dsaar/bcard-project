import { BrowserRouter } from "react-router-dom";
import Router from "../src/app/router/Router";
import Layout from "../src/app/layout/Layout";
import CustomThemeProvider from "../src/app/providers/CustomThemeProvider";
import UserProvider from "../src/app/providers/UserProvider";
import SnackBarProvider from "../src/app/providers/SnackBarProvider";


function App() {


  return (
    <>
    <UserProvider>
      <CustomThemeProvider>
        <SnackBarProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
          </SnackBarProvider>
      </CustomThemeProvider>
      </UserProvider>


    </>
  );
}

export default App;