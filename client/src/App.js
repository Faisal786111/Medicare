import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home/Home.js';
import HomePage from "./pages/HomePage";
import CommonPage from "./pages/CommonPage";
import AdminHome from "./pages/admin/AdminHome";
import Aprofile from './pages/admin/Aprofile.js';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatLogin from "./pages/ChatApp/pages/Login";
import ChatRegister from "./pages/ChatApp/pages/Register";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/ChatApp/pages/Chat";
import Chatbot from "./pages/Chatbot";
import Medical from './pages/Medical';
import Blogs from "./pages/Blogs/Pages/Blogs";
import CreateBlog from './pages/Blogs/Pages/CreateBlog';
import BlogDetails from './pages/Blogs/Pages/BlogDetails';
import UserBlogs from './pages/Blogs/Pages/UserBlogs';
import DoctorHome from "./pages/doctor/DoctorHome";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";


function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatlogin"
              element={<ChatLogin />}
            />
            <Route
              path="/chatregister"
              element={<ChatRegister />}
            />
            <Route
              path="/setAvatar"
              element={<SetAvatar />}
            />
            <Route
              path="/chat"
              element={<Chat />}
            />
            <Route
              path="/medical"
              element={
                <ProtectedRoute>
                  <Medical />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctorhome"
              element={
                <ProtectedRoute>
                  <DoctorHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/commonPage"
              element={
                <ProtectedRoute>
                  <CommonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserHome"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AdminHome"
              element={
                <ProtectedRoute>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminprofile"
              element={
                <ProtectedRoute>
                  <Aprofile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs"
              element={
                <ProtectedRoute>
                  <Blogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-blogs"
              element={
                <ProtectedRoute>
                  <UserBlogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog-details/:id"
              element={
                <ProtectedRoute>
                  <BlogDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-blog"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
