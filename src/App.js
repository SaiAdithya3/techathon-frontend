import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footbar from './components/Footbar';
import HeroSection from './components/landing';
function App() {
  return (
    <>
      <Navbar/>
     {/* <HeroSection /> */}
      <Home />
      <Footbar />
    </>
  );
}

export default App;
