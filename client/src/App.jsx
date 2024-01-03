// App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import { HomePage,Create,LoginForm,SignUpForm,Setting } from './pages';
import Redirector from './pages/components/RedirectToOrignal';
import About from './pages/About Us';
import Contact from './pages/Contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/signup" element={<SignUpForm />} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/url/create" element={<Create/>} />
        <Route path="/:shortUrl" element={<Redirector/>}/>
        <Route path="/user/account/settings" element={<Setting/>}/>
        <Route path="/page/about" element={<About/>}/>
        <Route path="/page/contact" element={<Contact/>}/>
      </Routes>
    </Router>
  );
}


export default App;
