import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetState, setLoader, setProfileImage, verifyUser } from '../store/userSlice';
import { toast } from 'react-toastify';
import { Avatar, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useForm } from "react-hook-form-mui";
import Validators from '../utils/validators';
import Loader from './core/Loader';
function Login() {

  const [signIn, setSignIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paperStyle = { padding: 20, width: 280, margin: '20px auto' }

  useEffect(() => {
    dispatch(resetState())
  }, [])

  const onSubmit = (data) => {
    data.profileImage = '';
    dispatch(setLoader(true));

    dispatch(signIn ? verifyUser(data) : registerUser(data))
      .unwrap()
      .then((response) => {
        if (response.statusCode === 200 || response.statusCode === 201) {
          toast.success('You are successfully logged in!');
          dispatch(setProfileImage(response.data.profileImage))
          navigate('/home');
          dispatch(setLoader(false));
        }
      })
      .catch((error) => {
        toast.error(error);
        dispatch(setLoader(false));
      })

  }
  const formContext = useForm({
    mode: "onBlur" // I want to change it to onBlur
  });

  const toggleSignIn = () => {
    setSignIn(!signIn);
  }

  const nameValidator = {
    required: 'Please enter name',
    validate: {
      //   length: (v) => Validators.firstNameLengthValidator(v)||"", 
      pattern: (v) => Validators.firstNamePatternValidator(v) || "Please enter valid first name"
    }
  };

  const emailValidator = {
    required: 'Please enter email address',
    validate: {
      //   length: (v) => Validators.emailLengthValidator(v)||"Email can be of 10 digits max", 
      pattern: (v) => Validators.emailPatternValidator(v) || "Please enter valid email"
    }
  };

  return (
    <>
      {signIn &&
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={{ backgroundColor: '#1bbd7e' }}><LockOutlinedIcon /> </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <FormContainer formContext={formContext} onSuccess={onSubmit}>
              <Stack spacing={2}>
                <TextFieldElement name={'username'} label={'username'} placeholder={'username'} required validation={{ required: 'Please enter username' }} fullWidth />
                <TextFieldElement name={'password'} label={'password'} placeholder={'password'} type='password' required validation={{ required: 'Please enter password' }} fullWidth />
                <Button variant='contained' type='submit' color='primary' fullWidth>Submit</Button>
                <Typography>Don't have an account? <span className='icon-custom' onClick={toggleSignIn}>Sign Up</span></Typography>
              </Stack>
            </FormContainer>
          </Paper>
        </Grid>}

      {!signIn &&
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={{ backgroundColor: '#1bbd7e' }}><LockOutlinedIcon /> </Avatar>
              <h2>Register</h2>
            </Grid>
            <FormContainer formContext={formContext} onSuccess={onSubmit}>
              <Stack spacing={2}>
                <TextFieldElement name={'name'} label={'Name'} placeholder={'name'} required validation={nameValidator} fullWidth />
                <TextFieldElement name={'username'} label={'username'} placeholder={'username'} required validation={{ required: 'Please enter username' }} fullWidth />
                <TextFieldElement name={'email'} label={'Email'} placeholder={'email'} required validation={emailValidator} fullWidth />
                <TextFieldElement name={'password'} label={'password'} placeholder={'password'} type='password' required validation={{ required: 'Please enter password' }} fullWidth />
                <Button variant='contained' type='submit' color='primary' fullWidth>Submit</Button>
                <Typography>Already have an account? <span className='icon-custom' onClick={toggleSignIn}>Sign In</span></Typography>
              </Stack>
            </FormContainer>
          </Paper>
        </Grid>}
      <Loader />
    </>
  );
}

export default Login;
