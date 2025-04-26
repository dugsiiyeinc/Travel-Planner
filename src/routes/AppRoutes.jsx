import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import MyTrips from "../pages/MyTrip";
import CreateTrip from "../pages/CreateTrip";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import TripDetails from "../pages/TripDetails";
import BlogEuropeanCities from "../pages/BlogEuropeanCities";
import BlogPackingGuide from "../pages/BlogPackingGuide";
import BlogBudgetTravel from "../pages/BlogBudgetTravel";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        title: "Home",
        showInNav: true,
      },
      {
        path: "mytrip",
        element: <MyTrips />,
        title: "My Trips",
        showInNav: true,
      },
      {
        path: "mytrip/:tripId",
        element: <TripDetails />,
        title: "Trip Details",
      },
      {
        path: "createtrip",
        element: <CreateTrip />,
        title: "Create Trip",
        showInNav: true,
      },
      {
        path: "signin",
        element: <SignIn />,
        title: "Sign In",
      },
      {
        path: "signup",
        element: <SignUp />,
        title: "Sign Up",
      },
      {
        path: "blog/european-cities-2025",
        element: <BlogEuropeanCities />,
        title: "European Cities 2025",
      },
      {
        path: "blog/packing-guide",
        element: <BlogPackingGuide />,
        title: "Packing Guide",
      },
      {
        path: "blog/budget-travel",
        element: <BlogBudgetTravel />,
        title: "Budget Travel",
      },
      {
        path: "*",
        element: <NotFound />,
        title: "Not Found",
      },
    ],
  },
]);

export default AppRoutes;