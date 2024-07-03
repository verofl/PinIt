import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import DisplayFeed from "../components/DisplayFeed/DisplayFeed";
import CreatePin from "../components/CreatePin/CreatePin";
import PinDetails from "../components/PinDetails/PinDetails";
import Landing from "../components/Landing/Landing";
import { ProfilePage } from "../components/ProfilePage/ProfilePage";
import SearchResults from "../components/Search/SearchResults";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/feed",
        element: <DisplayFeed />,
      },
      {
        path: "/pins/:pin_id",
        element: <PinDetails />,
      },
      {
        path: "/pins/new",
        element: <CreatePin />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },

      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
    ],
  },
]);
