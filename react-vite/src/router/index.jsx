import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import DisplayFeed from "../components/DisplayFeed/DisplayFeed";
import CreatePin from "../components/CreatePin/CreatePin";
import PinDetails from "../components/PinDetails/PinDetails";
import UpdateSucess from "../components/UpdateSuccess/UpdateSuccess";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
        path: "/pins/update-success",
        element: <UpdateSucess />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
