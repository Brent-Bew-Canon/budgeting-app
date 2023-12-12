import { useState } from "react";

function Transactions(props) {

    return (
        <div className="container">
            <div className="row">
                {props.transactions.map((transaction, index) => (
                    <div key={index} className="col-12 col-md-7 d-flex flex-row justify-content-between mx-auto py-3 px-5">
                        <p className="fs-3">{transaction.transactionName}</p>
                        <p className="fs-3">${transaction.transactionAmount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Transactions;