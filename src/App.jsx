
import './App.css'
import AbouUs from './components/AboutUs';
import Hero from './components/Hero';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import View from './components/View';
import Project from './components/Projects';
import Reviews from './components/Reviews';


function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Home />
      <AbouUs />
      <View />
      <Project />
      <Reviews />
    </>
  )
}

export default App
