import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const loggedIn = useSelector(state=>state.userState.loggedIn);
  return (
     loggedIn ? (
        <Route path="/home" element={<component/>} />
      ) : (
        <Navigate to="/" replace />
      ))
};

export default PrivateRoute;