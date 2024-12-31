import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="w-screen h-screen bg-slate-300 flex flex-col justify-center items-center gap-2">
      <h2 className="flex items-center justify-center bg-white px-4 py-2 font-semibold text-yellow-600 w-48">
        Admin Dashboard
      </h2>
      <Link to="/admin/videos">
        <p className="bg-yellow-500 border-b-2 border-yellow-600 hover:border-slate-300 active:scale-90 p-2 rounded-md w-48 flex justify-center font-semibold text-white hover:bg-white active:bg-slate-200 hover:text-yellow-500 cursor-pointer transition duration-200">
          Manage Videos
        </p>
      </Link>
      {/* Other admin functionalities */}
    </div>
  );
};

export default AdminDashboard;
