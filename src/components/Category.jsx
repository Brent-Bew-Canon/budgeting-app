
import Transactions from "./Transactions";
import { useState, useContext, useEffect } from "react";

import { BudgetContext } from "../context/Context";

function Category(props) {

    const { addToCat } = useContext(BudgetContext);

    const calculateTotal = () => {
        let catTotal = 0;
        props.category.transactions.forEach((transaction) => {
            const amount = parseFloat(transaction.transactionAmount) || 0; // Convert to number or use 0 if not a valid number
            catTotal += amount
        });
        return catTotal;

    }

    const [catTotal, setCatTotal] = useState(0);

    useEffect(() => {
        const total = calculateTotal();
        setCatTotal(total);
        addToCat(props.category.categoryName, total);
    }, [props.category.transactions]);



    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-7 d-flex flex-row justify-content-between mx-auto pt-3 text-white px-5 rounded-pill" style={{ backgroundColor: props.backgroundColor, padding: '10px', margin: '5px' }}>
                        <p className="fs-3">{props.category.categoryName}</p>
                        <p className="fs-3">${catTotal}</p>
                    </div>
                </div>
            </div>
            <Transactions transactions={props.category.transactions} />
        </>
    );
}

export default Category;