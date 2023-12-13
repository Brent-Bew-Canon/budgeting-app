import { useState, useContext, useEffect } from "react";
import { BudgetContext } from "../context/Context";


function Add_Transaction(props) {
    const [category, setCategory] = useState('');
    const [transactionName, setTransactionName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [categoryData, setcategoryData] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem('categories');
        if (data) {
            setcategoryData(JSON.parse(data));
        }
    }, [])

    const addTransactionAPI = async () => {
        try {
            let categoryId = props.categories.find((element) => element.name === category);
            const response = await fetch(`http://localhost:3003/api/transaction/${categoryId.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: transactionName,
                    amount: transactionAmount,
                })
            });
            const reply = await response.json();
            console.log(reply);
            // refresh page
            window.location.reload();
        } catch (error) {
            if (response.status !== 200) {
                throw Error(body.message)
            }
        }
    }

    const loopCategories = () => {
        return (props.categories.length > 0 ?
            props.categories.map((category) => {
                return <option key={category.id} id={category.id} name={category.name}>{category.name}</option>
            })
            :
            <></>
        )
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (category === undefined || transactionName === undefined || transactionAmount === undefined || category === '' || transactionName === '' || transactionAmount === 0) {
            alert('Please complete the form to add a transaction')
            return
        }

        addTransactionAPI();
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