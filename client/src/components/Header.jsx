import { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../context/Context";

function Header(props) {

    const { total, calculateGrandTotal } = useContext(BudgetContext);
    const [isOpen, setIsOpen] = useState(false);
    const [sheetData, setSheetData] = useState([]);

    useEffect(() => {
        calculateGrandTotal();
    }
        , [calculateGrandTotal])

    useEffect(() => {
        getSheetDataAPI();
        // map over sheetData which is an array of objects and return a p tag for each object.name


    }, [])

    const mapSheets = () => {
        return sheetData.map((sheet, index) => {
            return <li className="text-white fs-4" key={index}><a onClick={(e) => { console.log(e.target.innerText) }}>{sheet.name}</a></li>
        });
    }

    const getSheetDataAPI = async () => {
        try {
            const response = await fetch('http://localhost:3003/api/book');
            const body = await response.json([]);
            console.log(body[0].sheets);
            setSheetData(body[0].sheets);
        } catch (error) {
            if (response.status !== 200) {
                throw Error("Error getting sheet data")
            }
        }
    }


    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    const title = () => {
        return (props.sheetData.name ?
            <h1 className="mx-auto py-4">{props.sheetData.name}</h1>
            :
            <h1 className="mx-auto py-4">Expense Tracker</h1>
        )
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Expense Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-label="Toggle navigation" onClick={toggleCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse${isOpen ? ' show' : ''}`} id="navbarNavDarkDropdown">
                        <p className="text-white fs-4 border-bottom border-1">Choose Your Sheet To Load</p>
                        <ul className="navbar-nav mt-3">
                            {mapSheets()}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-3 ">
                <div className="row">
                    <div className="col-12 col-md-7 d-flex flex-row text-center mx-auto bg-success text-white rounded-top">
                        {title()}
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