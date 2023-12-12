
import Category from './components/Category';
import Header from './components/Header';
import Total from './components/Total';
import BudgetProvider from './context/Context';
import { BudgetContext } from './context/Context';
import Footer from './components/Footer';
import Add_Category from './components/Add_Category';
import Add_Transaction from './components/Add_Transaction';

import { useState, useEffect, useContext } from 'react';


function App() {
  const [storeVals, setStoreVals] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem('categories');
    if (data) {
      setStoreVals(JSON.parse(data));
    }
  }, [])

  const loopCategories = () => {

    // Retrieve colors from local storage or generate new ones
    const storedColors = JSON.parse(localStorage.getItem('categoryColors')) || {};

    return (
      storeVals.length > 0 ?
        storeVals.map((category, index) => {
          // Generate a random dark color
          const backgroundColor = storedColors[index] || generateRandomDarkColor();

          // Store the color in local storage
          storedColors[index] = backgroundColor;
          localStorage.setItem('categoryColors', JSON.stringify(storedColors));

          return <Category key={index} category={category} backgroundColor={backgroundColor} />
        })
        :
        <></>
    )
  }

  // Function to generate a random dark color
  const generateRandomDarkColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue
    const saturation = Math.floor(Math.random() * 50) + 50; // Random saturation between 50 and 100
    const lightness = Math.floor(Math.random() * 25) + 25; // Random lightness between 25 and 50

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <>
      <BudgetProvider>
        <Header />
        {/* <Total /> */}
        {loopCategories()}
        <Add_Category />
        <Add_Transaction />
        <Footer />
      </BudgetProvider>
    </>
  );
}

export default App;
