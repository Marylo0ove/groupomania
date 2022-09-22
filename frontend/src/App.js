import './App.css';

import { BrowserRouter,Routes, Route} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Error404 from './pages/Error404';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
