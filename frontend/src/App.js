import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './ui/Login';
import Home from './ui/Home';
import Header from './ui/core/Header';
import { useSelector } from 'react-redux';
import Error from './ui/Error';

function App() {
  const logged = useSelector(state => state.userState.loggedIn);

  return (
    <>
      <div className='container'>
        {logged && <Header />}
        <Routes>
          <Route index element={<Login />} onEnter />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
