// App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import { HomePage,Create,LoginForm,SignUpForm } from './pages';
import Redirector from './pages/components/RedirectToOrignal';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/signup" element={<SignUpForm />} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/url/create" element={<Create/>} />
        <Route path="/:shortUrl" element={<Redirector/>}/>
      </Routes>
    </Router>
  );
}


export default App;
