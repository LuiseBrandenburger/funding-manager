import useForm from "../../hooks/use-form";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function EditPlan() {
    const [userInputOutgoings, setUserInputOutgoings] = useState({});
    const [userInputIncome, setUserInputIncome] = useState({});
    const [fileInputOutgoings, setFileInputOutgoings] = useState({});
    const [file, setFile] = useState({});

    const [error, setError] = useState(false);
    const categorySelectionRef = useRef();


    // *********************************** STATE *******************************


    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );

    // ******************************* HANDLE CHANGES *************************
  

    const handleChange = ({ target }) =>
        setUserInputOutgoings({
            ...userInputOutgoings,
            [target.name]: target.value,
        });

    const handleIncomeChange = ({ target }) =>
        setUserInputIncome({
            ...userInputIncome,
            [target.name]: target.value,
        });

    const handleFileChangeOutgoings = ({ target }) =>
        setFileInputOutgoings({
            ...userInputOutgoings,
            [target.name]: target.files[0],
        });


// **********************TODO: SET OPTION VALUES **********************

    // let marketingArr = ["2.01.	Promotion Print",
    //     "2.02.	Promotion Radio",
    //     "2.03.	Promotion TV ",
    //     "2.04.	Promotion Online ",
    //     "2.05.	Anzeigen",
    //     "2.06.	Online Marketing",
    //     "2.07.	Sonstiges Marketing ",
    //     "2.08.	Pressetexte, Biographie ",
    //     "2.09.	Internetauftritt ",
    //     "2.10.	Produktionskosten ",
    //     "2.11.	Versandkosten",
    //     "2.12.	PR-Reisen ", 
    //     "2.13.	Video-/Contentproduktion", 
    //     "2.14.	Produktmanagement", 
    //     "2.15.	Sonstiges" ]
    
    // let optionListMarketing =
    //     marketingArr.map((project, i) => {
    //         return (
    //             <option key={i} value={project}>
    //                 {project}
    //             </option>
    //         );
    //     }, this);

    // useEffect(() => {

    //     // TODO: finish
    //     if (userInputOutgoings.category === "Marketing") {
    //         console.log("Marketing was choosen");
    //         setOptionValues(
    //             <option value="1.01.	Studiomiete/Aufnahme">
    //                                     1.01. Studiomiete/Aufnahme
    //             </option>
    //         )
    //     } else {
    //     }
    //     console.log(userInputOutgoings.category);

    // }, [userInputOutgoings]);


    // ********************* SUBMITS ***********************

    const handleSubmitOutgoings = (e) => {
        e.preventDefault();
        console.log("project id in handle submit: ", currentProjectId);
        const fd = new FormData();

        // TODO: fix file input
        // fd.append("file", this.state.file);

        fetch("/api/edit-outgoings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userInputOutgoings, currentProjectId}),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.success) {
                    // TODO: SOMETHING WHEN SUCCESS
                    // location.replace("/");
                    console.log("data when posted:", data);
                    console.log("this worked");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch /edit-outgoings", err);
                setError(true);
            });
    };

    const handleSubmitIncome = (e) => {
        e.preventDefault();
        fetch("/api/edit-incomings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userInputIncome, currentProjectId}),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.success) {
                    // TODO: SOMETHING WHEN SUCCESS
                    // Show a succsess notification and remove the inputs
                    // location.replace("/");
                    console.log("this worked");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch /incomings", err);
                setError(true);
            });
    };



    // ********************* RENDER***********************

    return (
        <div className="main-content-right-container">
            <div className="edit-project-container">
                <h3>You can add Positions to your Project Plan here:</h3>
                <div className="project-plan-outgoings">
                    <h2>OUTGOINGS</h2>
                    <form action="">
                        <div className="edit-plan-form-top">
                            <div className="group-container">
                                <label htmlFor="category">
                                    Select Item Category
                                </label>
                                <select
                                    ref={categorySelectionRef}
                                    name="category"
                                    id="category"
                                    onChange={handleChange}
                                >
                                    <option value="hide">-- Category --</option>
                                    <option value="Production">
                                        Production
                                    </option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Tour">Tour</option>
                                </select>
                            </div>

                            <div className="option">
                                <label htmlFor="option">Select Option</label>
                                <select
                                    name="option"
                                    id="option"
                                    onChange={handleChange}
                                >
                                    <option value="hide">
                                        -- Expense Category --
                                    </option>
                                    <option value="1.01.	Studiomiete/Aufnahme">
                                        1.01. Studiomiete/Aufnahme
                                    </option>
                                    <option value="1.02.	Studiomiete/Mischen">
                                        1.02. Studiomiete/Mischen
                                    </option>
                                    <option value="1.03.	Mastering">
                                        1.03. Mastering
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="position">Item Name</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    placeholder="Describe Position"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="price">Item Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="1000,00"
                                    min="0.01"
                                    step="0.01"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* <div>
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="1"
                                    step="1"
                                    onChange={handleChange}
                                />
                            </div> */}
                            <div>
                                <label htmlFor="paid">Paid?</label>
                                <input
                                    type="checkbox"
                                    id="paid"
                                    name="isPaid"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="edit-plan-form-bottom">
                            <div>
                                <label htmlFor="paiddate">
                                    Date of Payment
                                </label>
                                <input
                                    type="date"
                                    id="paiddate"
                                    name="paidDate"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="finalsum">Paid Amount</label>
                                <input
                                    type="number"
                                    id="finalsum"
                                    name="finalSum"
                                    placeholder="10.000,00"
                                    min="0.01"
                                    step="0.01"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="notes">Notes on Payment</label>
                                <input
                                    type="text"
                                    id="notes"
                                    placeholder="Please enter Notes"
                                    name="notes"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="file-label" htmlFor="file">
                                    <img src="/upload-btn.svg" alt="" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    title="upload file here"
                                    name="file"
                                    onChange={handleFileChangeOutgoings}
                                />
                            </div>
                        </div>

                        <div className="single-position-costs">
                            {/* <span>
                                TOTAL:
                                <span id="total-sum-outgoings">0,00 €</span>
                            </span> */}
                            <button
                                className="add-btn"
                                onClick={handleSubmitOutgoings}
                            >
                                <img src="/add-btn.svg" alt="" />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="project-plan-income">
                    <h2>INCOME</h2>

                    <form action="">
                        <div className="edit-plan-form-top">
                            <div className="group-container">
                                <label htmlFor="incomeCategory">
                                    Select Category
                                </label>
                                <select
                                    name="incomeCategory"
                                    id="selection-group"
                                    onChange={handleIncomeChange}
                                >
                                    <option value="hide">-- Category --</option>
                                    <option value="Mittelanforderung">
                                        Mittelanforderung
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="incomePosition">Position</label>
                                <input
                                    type="text"
                                    id="incomePosition"
                                    name="incomePosition"
                                    onChange={handleIncomeChange}
                                    placeholder="Describe Position"
                                />
                            </div>

                            <div>
                                <label htmlFor="incomeAmount">Amount</label>
                                <input
                                    type="number"
                                    id="incomeAmount"
                                    name="incomeAmount"
                                    onChange={handleIncomeChange}
                                    placeholder="1000,00"
                                    min="0.01"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label htmlFor="isIncomePaid">Received?</label>
                                <input
                                    type="checkbox"
                                    id="isIncomePaid"
                                    name="isIncomePaid"
                                    onChange={handleIncomeChange}
                                />
                            </div>
                        </div>

                        <div className="edit-plan-form-bottom">
                            <div>
                                <label htmlFor="incomePaidDate">
                                    Date of Payment
                                </label>
                                <input
                                    type="date"
                                    id="incomePaidDate"
                                    name="incomePaidDate"
                                    onChange={handleIncomeChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="incomeReceived">
                                    Received Amount
                                </label>
                                <input
                                    type="number"
                                    id="incomeReceived"
                                    name="incomeReceived"
                                    onChange={handleIncomeChange}
                                    placeholder="10.000,00"
                                    min="0.01"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label htmlFor="incomeNotes">Notes</label>
                                <input
                                    type="text"
                                    id="incomeNotes"
                                    name="incomeNotes"
                                    onChange={handleIncomeChange}
                                    placeholder="Please enter Notes"
                                />
                            </div>

                            <div>
                                <label
                                    className="file-label"
                                    htmlFor="incomeFile"
                                >
                                    <img src="/upload-btn.svg" alt="" />
                                </label>
                                <input
                                    type="file"
                                    id="incomeFile"
                                    name="incomeFile"
                                    onChange={handleIncomeChange}
                                    title="upload file here"
                                />
                            </div>
                        </div>

                        <div className="single-position-costs">
                            <button
                                className="add-btn income"
                                onClick={handleSubmitIncome}
                            >
                                <img src="/add-btn.svg" alt="" />
                            </button>
                        </div>
                    </form>

                    <button className="submit-btn">Show Table</button>
                </div>
            </div>
        </div>
    );
}
