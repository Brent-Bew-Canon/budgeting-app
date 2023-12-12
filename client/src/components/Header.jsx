import { useContext, useEffect } from "react";
import { BudgetContext } from "../context/Context";

function Header() {

    const { total, calculateGrandTotal } = useContext(BudgetContext);

    useEffect(() => {
        calculateGrandTotal();
    }
        , [calculateGrandTotal])

    return (
        <>
            <div className="container mt-3 ">
                <div className="row">
                    <div className="col-12 col-md-7 d-flex flex-row text-center mx-auto bg-success text-white rounded-top">
                        <h1 className="mx-auto py-4">Expense Tracker</h1>

                    </div>
                </div>
            </div>
            <div className="container mb-5">
                <div className="row">
                    <div className=" col-12 col-md-7 d-flex flex-row justify-content-between mx-auto py-3 px-5 bg-success text-white rounded-bottom">
                        <p className="fs-3">Total</p>
                        <p className="fs-3">${total}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;