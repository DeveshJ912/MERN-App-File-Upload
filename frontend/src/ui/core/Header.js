import React from 'react'
import classes from './Header.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../store/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state=>state.userState.user);
  const navigate = useNavigate();
  // const resetState=()=>{
  //   dispatch(resetState())
  // }

  const navigation=(route)=>{
    if(route == '/'){
    dispatch(resetState())
  }
  navigate(route);

  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              // style={({ isActive }) => ({
              //   textAlign: isActive ? 'center' : 'left',
              // })}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <a
              // to="/"
              onClick={()=>navigation('/')}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Logout ({userDetails.username})
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;