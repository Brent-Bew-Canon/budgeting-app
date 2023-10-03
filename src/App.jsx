
import Category from './components/Category';
import Header from './components/Header';
import Total from './components/Total';
import BudgetProvider from './context/Context';
import Footer from './components/Footer';
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


function App() {

  let food = {
    categoryName: "Food", categoryTotal: 25, transactions: [
      { name: "Wendys", amount: 11 },
      { name: "McDonalds", amount: 15 },
      { name: "Burger King", amount: 20 }
    ],
    color: "blue"
  }

  let entertainment = {
    categoryName: "Entertainment", categoryTotal: 30, transactions: [
      { name: "Cinemark", amount: 15 },
      { name: "Top Golf", amount: 15 },
    ],
    color: "red"
  }

  return (
    <>
      <BudgetProvider>
        <Header />
        <Total />
        <Category category={food} />
        <Category category={entertainment} />
        <Footer />
      </BudgetProvider>
    </>
  );
}

export default App;
