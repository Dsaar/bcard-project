import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Layout from "./layout/Layout";
import CustomThemeProvider from "./providers/CustomThemeProvider";
import UserProvider from "./users/providers/UserProvider";
import SnackBarProvider from "./providers/SnackBarProvider";


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