import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import MyTrips from "../pages/MyTrip";
import CreateTrip from "../pages/CreateTrip";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "mytrip",
        element: <MyTrips/>,
      },
      {
        path: "createtrip",
        element: <CreateTrip/>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path:"signin",
        element:<SignIn/>
      },
      {
        path:"signup",
        element:<SignUp/>
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default AppRoutes;
