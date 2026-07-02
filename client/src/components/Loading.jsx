import { Link } from "react-router-dom";

const Sidebar = () => {

    return (

        <div className="w-64 min-h-screen bg-gray-100 p-4">

            <ul className="space-y-4">

                <li><Link to="/dashboard">Dashboard</Link></li>

                <li><Link to="/interview">Interview</Link></li>

                <li><Link to="/history">History</Link></li>

                <li><Link to="/analytics">Analytics</Link></li>

                <li><Link to="/bookmarks">Bookmarks</Link></li>

                <li><Link to="/profile">Profile</Link></li>

            </ul>

        </div>

    );

};

export default Sidebar;