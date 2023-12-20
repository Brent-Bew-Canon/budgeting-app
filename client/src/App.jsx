
import Category from './components/Category';
import Header from './components/Header';
import Total from './components/Total';
import { BudgetContext } from './context/Context';
import Footer from './components/Footer';
import Add_Category from './components/Add_Category';
import Add_Transaction from './components/Add_Transaction';

import { useState, useEffect, useContext } from 'react';


function App() {

  const { updateCurrentSheet, currentSheet, updateSheetInfo } = useContext(BudgetContext);

  const [storeVals, setStoreVals] = useState([]);
  const [sheetData, setSheetData] = useState({});
  const [currSheet, setCurrSheet] = useState({ "current_sheet": 1 });

  useEffect(() => {
    getCategoriesAPI();
    getSheetDataAPI();

    console.log(currentSheet)
  }, [])

  useEffect(() => {
    getCurrentSheetAPI();
    console.log(currentSheet)
  }, [currentSheet])

  const getCurrentSheetAPI = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/book/1');
      const reply = await response.json();
      setCurrSheet(reply);
      console.log("this is the current sheet here:", reply.current_sheet)
    } catch (error) {
      throw Error("Error getting the current sheet data from the database")
    }
  }

  const getSheetDataAPI = async () => {
    const response = await fetch(`http://localhost:3003/api/sheet/${currSheet.current_sheet}`);
    const body = await response.json();
    console.log('This is the api url', `http://localhost:3003/api/sheet/${currSheet.current_sheet}`);
    console.log('This is the sheet data:', body);
    if (body) {
      setSheetData(body[0]);
      updateSheetInfo(body);
    }
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  // call the api from useffect to get the data for the sheet
  const getCategoriesAPI = async () => {
    const response = await fetch(`http://localhost:3003/api/category/${currSheet.current_sheet}`);
    const body = await response.json();
    console.log(body);
    if (body) {
      setStoreVals(body);
    }
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

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

          return <Category key={index} category={category} backgroundColor={backgroundColor} currSheet={currentSheet} />
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
      <Header sheetData={sheetData} currSheet={currentSheet} />
      {/* <Total /> */}
      {loopCategories()}
      <Add_Category currSheet={currentSheet} />
      <Add_Transaction categories={storeVals} currSheet={currentSheet} />
      <Footer />
    </>
  );
}

export default App;
