import { useContext, useEffect } from "react";
import { BudgetContext } from "../context/Context";

function Total() {

    const { total, calculateGrandTotal } = useContext(BudgetContext);

    useEffect(() => {
        calculateGrandTotal();
    }
        , [calculateGrandTotal])


    return (
        <div className="container mb-4">
            <div className="row">
                <div className="border col-12 col-md-7 d-flex flex-row justify-content-between mx-auto py-3 px-5 bg-success text-white">
                    <p className="fs-3">Total</p>
                    <p className="fs-3">${total}</p>
                </div>
            </div>
        </div>
    )
}

export default Total;