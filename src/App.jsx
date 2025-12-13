
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
import WeddingVenue from './components/WeddingVenue';

function App() {


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
        <Route path='/services' element={<Services />} />
        <Route path='/services/wedding-venues' element={<WeddingVenue />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
