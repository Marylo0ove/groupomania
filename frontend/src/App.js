import './App.css';

import { BrowserRouter,Routes, Route} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Profil from './pages/Profil';
import { useState } from 'react';
import { UidContext } from './components/AppContent';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user';

function App() {
  /*const [uid, setupId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {

    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true
    })
    .then((res) => setupId(res.data))
    .catch((err) => console.log("No token"));
  }
  fetchToken();

  if (uid) dispatch(getUser(uid))
 }, [uid]);*/
  return (
   // <UidContext.Provider value={uid}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Profil" element={<Profil/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </BrowserRouter>
   // </UidContext.Provider>
  );
}

export default App;
