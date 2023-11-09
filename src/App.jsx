
import Category from './components/Category';
import Header from './components/Header';
import Total from './components/Total';
import BudgetProvider from './context/Context';
import Footer from './components/Footer';
import Add_Category from './components/Add_Category';
import Add_Transaction from './components/Add_Transaction';
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';


function App() {
  const [storeVals, setStoreVals] = useState([]);


  useEffect(() => {
    let data = localStorage.getItem('categories');
    if (data) {
      setStoreVals(JSON.parse(data));
    }
  }, [])



  // let categories = [food, entertainment, gas]
  let categories = [{
    categoryName: "Entertainment", transactions: [
      { name: "Cinemark", amount: 15 },
      { name: "Top Golf", amount: 15 },
    ]
  }, {
    categoryName: "Food", transactions: [
      { name: "Wendys", amount: 11 },
      { name: "McDonalds", amount: 15 },
      { name: "Burger King", amount: 20 }
    ]
  }]

  const loopCategories = () => {
    return (storeVals.length > 0 ?
      storeVals.map((category, index) => {
        return <Category key={index} category={category} />
      })
      :
      <></>
    )
  }

  return (
    <>
      <BudgetProvider>
        <Header />
        <Total />
        {loopCategories()}
        <Add_Category />
        <Add_Transaction />
        <Footer />
      </BudgetProvider>
    </>
  );
}

export default App;
