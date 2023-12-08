import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
const Loader = () => {
  const loading = useSelector(state=>state.userState.loading);

  return (
    
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
    // onClick={handleClose}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  )
}

export default Loader