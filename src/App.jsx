
import './App.css'
import AbouUs from './components/AboutUs';
import Hero from './components/Hero';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import View from './components/View';
import Project from './components/Project';
import Footer from './components/Footer';
import Review from './components/Review';
import { Routes, Route } from "react-router-dom"
import Services from './components/Services';
import ServiceDetails from './components/ServiceDetails';
import ServiceCategory from './components/ServiceCategory';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ChatBot from './components/ChatBot';
import Dashboard from './components/Dashboard';
import Updateuserinfo from './components/Updateuserinfo';
import Newservice from './components/Newservice';
import EditService from './components/Editservice';
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
const api_url = 'http://127.0.0.1:8000/';

  return (
    <>
      <Navbar api_url={api_url}/>

      <Routes>
        <Route path='/' element={<>
          <Hero />
          <Home />
          <AbouUs />
          <View />
          <Project />
          <Review />
        </>} />
        <Route path='/services' element={<Services api_url={api_url} />} />
        <Route path="/services/:id" element={<ServiceDetails api_url={api_url} />} />
        <Route
          path="/services/category/:type"
          element={<ServiceCategory api_url={api_url} />}
        />
        <Route path="/login" element={<Login api_url={api_url} />} />
        <Route path="/signup" element={<SignUp api_url={api_url} />} />
        <Route path="/dashboard" element={<Dashboard api_url={api_url} />}/>
        <Route path="/updateinfo" element={<Updateuserinfo api_url={api_url} />} />
        <Route path="/newservice" element={<Newservice api_url={api_url} />}/>
        <Route path="/editservice/:id" element={<EditService api_url={api_url} />}/>
      </Routes>

      <ScrollToTopButton />
      <ChatBot api_url={api_url}/>

      <Footer />
    </>
  )
}

export default App
