
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
import Photographers from './components/Photographers';
import WeddingPlanners from './components/WeddingPlanners';
import Videographers from './components/Videographers';

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
        <Route path='/services/photographers' element={<Photographers />} />
        <Route path='/services/wedding-planners' element={<WeddingPlanners />} />
        <Route path='/services/videographers' element={< Videographers />} />
        
      </Routes>

      <Footer />
    </>
  )
}

export default App
