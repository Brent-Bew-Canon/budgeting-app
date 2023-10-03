
import Transactions from "./Transactions";
import { useState, useContext } from "react";

import { BudgetContext } from "../context/Context";

function Category(props) {

    const { addToCat } = useContext(BudgetContext);

    const calculateTotal = () => {
        let catTotal = 0;
        props.category.transactions.forEach((transaction) => {
            catTotal += transaction.amount;
        });

        addToCat(props.category.categoryName, catTotal);
        return catTotal;

    }



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-7 d-flex flex-row justify-content-between mx-auto bg-primary py-3 text-white px-5">
                        <p className="fs-3">{props.category.categoryName}</p>
                        <p className="fs-3">${calculateTotal()}</p>
                    </div>
                </div>
            </div>
            <Transactions transactions={props.category.transactions} />
        </>
    );
}

export default Category;