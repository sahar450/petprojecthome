import Admin from "./Pages/Admin";
import BasicCard from './components/Material/Customcard';
import StickyHeadTable from "./components/Material/Table";
import Veterinarian from './Pages/Veterinarian';
import Editversion from './Pages/Editversion';
import Supervisor from "./Pages/Supervisor";
import Petfriend from "./Pages/Petfriend";
import MeetingsPage from "./Pages/Meetings";
import { Navigate } from "react-router-dom";
const routes = [
    { path: "/", element: <Admin /> },

    { path: "/admin", element: < Admin /> },
    { path: "/Veterinarian", element: <Veterinarian /> },
    { path: "/Editversion", element: <Editversion /> },
    { path: "/Supervisor", element: <Supervisor /> },
    { path: "/Petfriend", element: <Petfriend /> },
    { path: "/MeetingsPage", element: <MeetingsPage /> },
]


export default routes