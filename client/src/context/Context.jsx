import { createContext, useCallback, useState } from "react";

export const BudgetContext = createContext();

const BudgetContextProvider = (props) => {
    const [total, setTotal] = useState(0);
    const [categoryTotal, setCategoryTotal] = useState([]);
    const [currentSheet, setCurrentSheet] = useState({});

    const totalAPICall = async (theTotal) => {
        try {
            const response = await fetch(`http://localhost:3003/api/sheet/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    grand_total: theTotal,
                })
            });
            const reply = await response.json();
        } catch (error) {
            if (response.status !== 200) {
                throw Error(body.message)
            }
        }
    }

    const updateCurrentSheet = (sheet) => {
        setCurrentSheet(sheet);
    };

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
    const calculateGrandTotal = useCallback(() => {
        let total = 0;
        Object.values(categoryTotal).forEach((value) => {
            total += value;
        });
        setTotal(total);
        totalAPICall(total);
    }, [categoryTotal]);

    return (
        <BudgetContext.Provider value={{ total, addToCat, calculateGrandTotal, saveToLocalStorage, saveTransaction, currentSheet, updateCurrentSheet }} {...props} />
    )
}

export default BudgetContextProvider;
