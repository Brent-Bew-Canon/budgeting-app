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
            <div className="container py-4 border border-2">
                <div className="row">
                    <div className="col-6 mx-auto text-center">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <select className='my-2 form-control' onChange={(e) => { setCategory(e.target.value) }}>
                                    <option>Select Category</option>
                                    {loopCategories()}
                                </select>
                            </div>
                            <input name="transactionName" type="text" placeholder="Name" className='my-2 form-control' value={transactionName} onChange={(e) => { setTransactionName(e.target.value) }} />
                            <input name="transactionAmount" type="number" placeholder="Amount" className='my-2 form-control' value={transactionAmount} onChange={(e) => { setTransactionAmount(e.target.value) }} />
                            <button type='submit'>Add New Transaction</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add_Transaction;