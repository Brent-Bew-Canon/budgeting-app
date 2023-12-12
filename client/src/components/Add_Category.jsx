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
            <div className="container py-4 mt-3">
                <div className="row ">
                    <div className="col-12 col-md-7 mx-auto  py-3  px-5 rounded">
                        <h2 className="text-center ">Create New Category</h2>
                        <hr className="pb-3" />
                        <form onSubmit={handleSubmit} >
                            <div className=" col-12 col-md-6 mx-auto">
                                <input type="text" placeholder="Category Name" className='my-2 form-control fs-5' value={storeCat.categoryName} onChange={(e) => { setStoreCat({ categoryName: e.target.value, transactions: [] }) }} />
                            </div>
                            <div className="text-center">
                                <button type='submit' className="btn btn-secondary fs-5 mt-2">Add New Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add_Category;