import React from 'react';
import Carousel from '../Components/Carousel';
import Features from '../Components/Features';
import Footer from '../Components/Footer';
import About from './About';

const Home = () => {
  return (
    <>
      <Carousel />
      <About />
      <Features/>
    </>
  );
};
export default Home;
