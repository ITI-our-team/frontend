
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

function App() {
const api_url = 'http://127.0.0.1:8000/';

  return (
    <>
      <Navbar />

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
          element={<ServiceCategory />}
        />

      </Routes>

      <Footer />
    </>
  )
}

export default App
