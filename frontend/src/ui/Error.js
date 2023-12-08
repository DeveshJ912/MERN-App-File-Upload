import { Button } from '@mui/material'
import React from 'react'
import {useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    const gotoLogin=()=>{
        navigate('/');
    }
  return (
    <main style={{textAlign:'center'}}>
    <h1>Page Not Found</h1>
    <Button variant='contained' type='button' color='primary' onClick={gotoLogin}>Go To Login</Button>
  </main>
  )
}

export default Error