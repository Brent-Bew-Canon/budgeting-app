import { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../context/Context";
import Modal from "react-bootstrap/Modal";

function Header(props) {

    const { total, calculateGrandTotal, updateCurrentSheet, currentSheet } = useContext(BudgetContext);
    const [sheetData, setSheetData] = useState([]);
    const [sheetName, setSheetName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        calculateGrandTotal();
    }
        , [calculateGrandTotal])

    useEffect(() => {
        getSheetDataAPI();
    }, [])

    // Modal functions
    const showModal = () => {
        setIsOpen(true);
    };
    const showMenuModal = () => {
        setMenuOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    // API calls
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

    const createNewSheetAPI = async () => {
        try {
            const response = await fetch('http://localhost:3003/api/sheet/1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: sheetName
                })
            });
            const reply = await response.json();
            console.log("Submitted sheet name:", sheetName);
            // Reset form
            setSheetName("");
            window.location.reload();
        } catch (error) {
            if (response.status !== 200) {
                throw Error("Error creating new sheet")
            }
        }
    }

    // Event handlers and helper functions
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (sheetName === undefined || sheetName === '') {
            alert('Please enter a sheet name')
            return
        }
        createNewSheetAPI();
        hideModal();
    };

    const mapSheets = () => {
        return sheetData.map((sheet, index) => {
            return <li className="text-white fs-4" key={index}><a className="hover-cursor no-underline" onClick={(e) => { updateCurrentSheet(e.target.innerText) }}>{sheet.name}</a></li>
        });
    }

    const title = () => {
        return (props.sheetData.name ?
            <h1 className="mx-auto py-4">{props.currSheet.name}</h1>
            :
            <h1 className="mx-auto py-4">Expense Tracker</h1>
        )
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Expense Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-label="Toggle navigation" onClick={() => setMenuOpen(prevMenuOpen => !prevMenuOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarNavDarkDropdown">
                        <div className="d-flex flex-column justify-content-center mt-4">
                            <button id="new-sheet" className="mx-auto btn btn-light my-3" onClick={showModal}>
                                Create New Sheet
                            </button>

                            {/* modal */}
                            <Modal show={isOpen} onHide={hideModal}>
                                <div className="mx-auto my-5">
                                    <p className="text-center fs-5">Create New Sheet</p>
                                    <form onSubmit={handleFormSubmit}>
                                        <input type="text" className="form-control" placeholder="new sheet name..." onChange={(e) => { setSheetName(e.target.value) }} />
                                        <div className="text-center my-3">
                                            <button className="btn btn-success" type="submit">Create Sheet</button>
                                        </div>
                                        <div className="text-center my-3">
                                            <button className="btn btn-danger" type="button" onClick={hideModal}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>

                            <p className="text-white fs-4 border-bottom border-1">Choose Your Sheet To Load</p>
                        </div>
                        <ul className="navbar-nav mt-3">
                            {mapSheets()}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-3 ">
                <div className="row">
                    <div className="col-12 col-md-7 d-flex flex-column text-center mx-auto bg-success text-white rounded-top">

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



