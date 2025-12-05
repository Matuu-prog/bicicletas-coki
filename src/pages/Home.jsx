import React from 'react';
import HeroFull from '../components/HeroFull';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = () => {
  return (
    <>
      <HeroFull />
      <Categories />
      <FeaturedProducts />
    </>
  );
};

export default Home;