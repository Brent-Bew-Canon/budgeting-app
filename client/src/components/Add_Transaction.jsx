import { useState, useContext, useEffect } from "react";
import { BudgetContext } from "../context/Context";


function Add_Transaction() {
    const { saveTransaction } = useContext(BudgetContext);

    const [storeTransaction, setStoreTransaction] = useState({});
    const [category, setCategory] = useState('');
    const [transactionName, setTransactionName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [storeVals, setStoreVals] = useState([]);


    useEffect(() => {
        let data = localStorage.getItem('categories');
        if (data) {
            setStoreVals(JSON.parse(data));
        }
    }, [])

    const loopCategories = () => {
        return (storeVals.length > 0 ?
            storeVals.map((category, index) => {
                return <option key={index}>{category.categoryName}</option>
            })
            :
            <></>
        )
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (category === undefined || transactionName === undefined || transactionAmount === undefined) {
            alert('Please complete the form to add a transaction')
            return
        }

        // find the category in the storeVals array and return the index of the matching category
        let catIndex = storeVals.findIndex((element) => element.categoryName === category);
        console.log(catIndex)
        saveTransaction(catIndex, { transactionName, transactionAmount })

        // put save transactions here................

        // saveToLocalStorage('categories', storeTransaction)
        // setStoreTransaction({})
        // refresh page
        window.location.reload();
    }

    return (
        <>
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 col-md-7 mx-auto  py-3  px-5 rounded">
                        <h2 className="text-center ">Create New Transaction</h2>
                        <hr className="pb-3" />
                        <form onSubmit={handleSubmit}>
                            <div className=" col-12 col-md-6 mx-auto">
                                <select className='my-2 form-select fs-5' onChange={(e) => { setCategory(e.target.value) }}>
                                    <option>Select Category</option>
                                    {loopCategories()}
                                </select>
                            </div>
                            <div className=" col-12 col-md-6 mx-auto">
                                <input name="transactionName" type="text" placeholder="Transaction Name" className='my-2 form-control fs-5' value={transactionName} onChange={(e) => { setTransactionName(e.target.value) }} />
                            </div>
                            <div className=" col-12 col-md-6 mx-auto">
                                <input name="transactionAmount" type="number" placeholder="Amount" className='my-2 form-control fs-5' value={transactionAmount} onChange={(e) => { setTransactionAmount(e.target.value) }} />
                            </div>
                            <div className="text-center">
                                <button type='submit' className=" btn btn-secondary fs-5  mt-2">Add New Transaction</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add_Transaction;