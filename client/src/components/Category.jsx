
import Transactions from "./Transactions";
import { useState, useContext, useEffect, useMemo } from "react";

import { BudgetContext } from "../context/Context";

function Category(props) {

    const { addToCat, calculateGrandTotal } = useContext(BudgetContext);

    const calculateTotal = () => {
        let catTotal = 0;
        props.category.transactions.forEach((transaction) => {
            const amount = parseFloat(transaction.amount) || 0; // Convert to number or use 0 if not a valid number
            catTotal += amount
        });
        return catTotal;
    }

    const memoizedTotal = useMemo(() => calculateTotal(props.category.transactions), [props.category.transactions]);

    useEffect(() => {
        setCatTotal(memoizedTotal);
        addToCat(props.category.name, memoizedTotal);
    }, [memoizedTotal, props.category.name]);

    const [catTotal, setCatTotal] = useState(0);

    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-7 d-flex flex-row justify-content-between mx-auto pt-3 text-white px-5 rounded-pill" style={{ backgroundColor: props.backgroundColor, padding: '10px', margin: '5px' }}>
                        <p className="fs-3">{props.category.name}</p>
                        <p className="fs-3">{props.currSheet.name}</p>
                        <p className="fs-3">${catTotal}</p>
                    </div>
                </div>
            </div>
            <Transactions transactions={props.category.transactions} />
        </>
    );
}

export default Category;