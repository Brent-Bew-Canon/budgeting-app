import { createContext, useCallback, useState } from "react";

export const BudgetContext = createContext();

const BudgetContextProvider = (props) => {
    const [total, setTotal] = useState(0);
    const [categoryTotal, setCategoryTotal] = useState([]);

    // function to save new data to local storage by appending to the existing data
    const saveToLocalStorage = (key, value) => {
        let existing = localStorage.getItem(key);
        existing = existing ? JSON.parse(existing) : [];
        existing.push(value);
        localStorage.setItem(key, JSON.stringify(existing));
    };

    // save new transactions to the transactions array in the categories object by using the passed in index for the category   
    const saveTransaction = (index, transaction) => {
        let existing = localStorage.getItem('categories');
        existing = existing ? JSON.parse(existing) : [];
        existing[index].transactions.push(transaction);
        localStorage.setItem('categories', JSON.stringify(existing));
    };

    //  function to update the category total object by adding key-value pairs
    const addToCat = (key, value) => {
        setCategoryTotal((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    // function to update the total by adding up the category totals
    const calculateTotal = useCallback(() => {
        let total = 0;
        Object.values(categoryTotal).forEach((value) => {
            total += value;
        });
        setTotal(total);
    }, [categoryTotal]);

    return (
        <BudgetContext.Provider value={{ total, addToCat, calculateTotal, saveToLocalStorage, saveTransaction }} {...props} />
    )
}

export default BudgetContextProvider;
