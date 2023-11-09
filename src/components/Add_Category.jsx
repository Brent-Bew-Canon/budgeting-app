import { useState, useContext } from "react";
import { BudgetContext } from "../context/Context";


function Add_Category() {
    const { saveToLocalStorage } = useContext(BudgetContext);

    let [storeCat, setStoreCat] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        if (storeCat.categoryName === undefined) {
            alert('Please enter a category name')
            return
        }
        saveToLocalStorage('categories', storeCat)
        setStoreCat({})
        // refresh page
        window.location.reload();
    }

    return (
        <>
            <div className="container py-4">
                <div className="row">
                    <div className="col-6 mx-auto text-center">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Name" className='my-2 form-control' value={storeCat.categoryame} onChange={(e) => { setStoreCat({ categoryName: e.target.value, transactions: [] }) }} />
                            <button type='submit'>Add New Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add_Category;