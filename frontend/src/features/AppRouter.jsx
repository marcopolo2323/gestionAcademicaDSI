// AppRouter.js
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './../pages/home/Home';
import LoginPage from './../pages/loginPage/LoginPage';
import RegisterPage from './../pages/registerPage/RegisterPage';
import Dashboard from './../pages/dashboard/DashBoard';
import StudentPage from './../pages/studentPage/StudentPage';
import TeacherDashboard from './../components/teacherDashboard/TeacherDashboard';

const PrivateRoute = ({ children, role, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, 
  role: PropTypes.string,
  user: PropTypes.object,
};

const AppRouter = ({ user }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute user={user}><Dashboard /></PrivateRoute>} />
        <Route path="/student" element={<PrivateRoute role="student" user={user}><StudentPage /></PrivateRoute>} />
        <Route path="/teacher-dashboard" element={<PrivateRoute role="teacher" user={user}><TeacherDashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

AppRouter.propTypes = {
  user: PropTypes.object,
};

export default AppRouter;