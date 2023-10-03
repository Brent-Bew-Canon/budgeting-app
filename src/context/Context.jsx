import { createContext, useCallback, useState } from "react";

export const BudgetContext = createContext();

const BudgetContextProvider = (props) => {
    const [total, setTotal] = useState(0);
    const [categoryTotal, setCategoryTotal] = useState([]);



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
        <BudgetContext.Provider value={{ total, addToCat, calculateTotal }} {...props} />
    )
}

export default BudgetContextProvider;
