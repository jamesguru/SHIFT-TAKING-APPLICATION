import { createBrowserRouter,Navigate,RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import Staff from "./pages/staff/Staff";
import MyShifts from "./pages/MyShifts/MyShifts";
import { useSelector } from "react-redux";
import Shift from "./pages/shift/Shift";
import Account from "./pages/account/Account";
import Statement from "./pages/statement/Statement";
import Report from "./pages/report/Report";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import UpdatePassword from "./pages/updatePassword/UpdatePassword";
function App() {
  const user = useSelector((state) => state.user);
  
  const router = createBrowserRouter([
 
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ResetPassword />,
        },
        {
          path: "/reset/KsJhRzLbWgVn4fE2aZpXqYcDxuIo0mKsJhRzLbWgVn4fE2a",
          element: <UpdatePassword />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/staff",
          element: user.currentUser ? <Staff /> : <Navigate to="/login"/>,
        },
        {
          path: "/myshifts",
          element:  user.currentUser ? <MyShifts /> : <Navigate to="/login"/> ,
        },
        {
          path: "/shift/:id",
          element: user.currentUser ? <Shift /> :  <Navigate to="/login"/> ,
        },
        {
          path: "/myaccount",
          element: user.currentUser ? <Account /> : <Navigate to="/login"/>,
        },

        {
          path: "/statements",
          element: user.currentUser ? <Statement /> : <Navigate to="/login"/>,
        },

        {
          path: "/report",
          element: user.currentUser ? <Report/> : <Navigate to="/login"/>,
        }
      
      
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
