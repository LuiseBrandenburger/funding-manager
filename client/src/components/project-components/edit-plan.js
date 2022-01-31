import useForm from "../../hooks/use-form";
import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { 
    updateProjectFCSumOutgoings, 
    updateProjectSumFundingLeft, 
    updateProjectSumTotalCostsPaid 
} from "../../redux/projects/slice";
import { outgoingsReceived, addOutgoing, deleteOutgoing, updateOutgoing } from "../../redux/outgoings/slice";
import {OutgoingsTable} from "../table-charts-components/outgoings-table";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";


export default function EditPlan() {
    const dispatch = useDispatch();
    const { id } = useParams();

    // *********************************** STATE *******************************

    const [userInputOutgoings, setUserInputOutgoings] = useState({});
    const [error, setError] = useState(false);
    const [dataColumns, setDataColumns] = useState([
        { field: "position", headerName: "Position", width: 170 },
        { field: "option", headerName: "Option", width: 170 },
        {
            field: "price",
            headerName: "Costs",
            type: "number",
            width: 120,
            editable: true 
        },
        {
            field: "total",
            headerName: "Paid",
            type: "number",
            width: 120,
            editable: true 
        },
        {
            field: "paiddate",
            headerName: "Date",
            type: "date",
            width: 100,
            editable: true 
        }, 
        { field: "id", headerName: "ID", width: 60 },
    ]);
    const [dataRows, setDataRows] = useState([]);
    const [idItemPopulateList, setIdItemPopulateList] = useState();

    // *********************************** REF *******************************

    const categoryRef = useRef();
    const optionRef = useRef();
    const positionRef = useRef();
    const priceRef = useRef();
    const notesRef = useRef();
    const totalRef = useRef();
    const paidDateRef = useRef();

    // *********************************** STATE *******************************

    const outgoings = useSelector((state) => state.outgoings || {});
    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );
    const currentOutgoingData = useSelector((state) => {
        if (state.outgoings) {
            return state.outgoings.filter((outgoing) => {
                return outgoing.project_id === state.currentProjectId;
            });
        } else {
            return {};
        }
    });

    const clickedItemInTable = useSelector((state) => {
        if (state.outgoings) {
            return state.outgoings.filter((outgoing) => {
                return outgoing.id === idItemPopulateList;
            });
        } else {
            return {};
        }
    });

    // *********************************** EFFECTS *******************************
    
    useEffect(() => {
        fetch(`/all-outgoings`)
            .then((data) => data.json())
            .then(({ data }) => {
                setDataRows(currentOutgoingData);
                dispatch(outgoingsReceived(data));
            })
            .catch((err) => {
                console.log("error to get all Projects: ", err);
            });
    }, []);
    
    useEffect(() => {
        setDataRows(currentOutgoingData);
    }, [currentProjectId]);

    useEffect(() => {
        setDataRows(currentOutgoingData);
    }, [outgoings]);

    useEffect(()=>{
        if (clickedItemInTable[0]) {
            // console.log(clickedItemInTable[0]);
            // console.log("category item clicked: ",clickedItemInTable[0].category);

        }
    },[clickedItemInTable]);

    // ******************************* HANDLE CHANGES *************************
  
    const handleChange = ({ target }) =>
        setUserInputOutgoings({
            ...userInputOutgoings,
            [target.name]: target.value,
        });

    // ********************* SUBMITS ***********************

    const handleSubmitOutgoings = (e) => {
        e.preventDefault();
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
                    dispatch(updateProjectFCSumOutgoings(currentProjectId, data.sumFcTotalCosts));
                    dispatch(updateProjectSumFundingLeft(currentProjectId, data.sumFundingLeft));
                    dispatch(updateProjectSumTotalCostsPaid(currentProjectId, data.sumTotalCostsPaid));
                    dispatch(addOutgoing(data.addedOutgoing));
                    setDataRows(currentOutgoingData);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch /edit-outgoings", err);
                setError(true);
            });
    };

    const handleUpdateOutgoings = (e) => {
        e.preventDefault();

        const userInputForUpdate = {
            category: categoryRef.current.value,
            option: optionRef.current.value,
            position: positionRef.current.value,
            price: parseInt(priceRef.current.value),
            notes: notesRef.current.value,
            total: parseInt(totalRef.current.value),
            paidDate: new Date(paidDateRef.current.value)
        };

        fetch("/api/update-outgoings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userInputForUpdate, clickedItemInTable}),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch(updateProjectFCSumOutgoings(currentProjectId, data.sumFcTotalCosts));
                    dispatch(updateProjectSumFundingLeft(currentProjectId, data.sumFundingLeft));
                    dispatch(updateProjectSumTotalCostsPaid(currentProjectId, data.sumTotalCostsPaid));
                    //FIXME:  dispatch(updateOutgoing())
                    setDataRows(currentOutgoingData);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch /edit-outgoings", err);
                setError(true);
            });
    };

    const handleDeleteOutgoings = (e) => {
        e.preventDefault();
        fetch("/api/delete-outgoings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({clickedItemInTable}),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch(deleteOutgoing(clickedItemInTable[0].id));
                    dispatch(updateProjectFCSumOutgoings(currentProjectId, data.sumFcTotalCosts));
                    dispatch(updateProjectSumFundingLeft(currentProjectId, data.sumFundingLeft));
                    dispatch(updateProjectSumTotalCostsPaid(currentProjectId, data.sumTotalCostsPaid));

                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch /edit-outgoings", err);
                setError(true);
            });

    };

    // ********************* RENDER***********************
    

    return (
        <div className="main-content-right-container">
            <div className="edit-project-container">
                <div className="project-plan-outgoings">
                    <h2>PROJECT COSTS</h2>
                    <form action="">
                        <div className="edit-plan-form-top">
                            <div className="group-container">
                                <label htmlFor="category">
                                    Select Item Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    ref={categoryRef}
                                    onChange={handleChange}
                                >
                                    { (clickedItemInTable[0] && clickedItemInTable[0].category)?
                                        <option value={clickedItemInTable[0].category}>{clickedItemInTable[0].category}</option>:
                                        <><option value="hide">-- Category --</option><option value="Production">
                                            Production
                                        </option><option value="Marketing">Marketing</option><option value="Tour">Tour</option></>
                                    }
                                </select>
                            </div>

                            <div className="option">
                                <label htmlFor="option">Select Option</label>
                                <select
                                    name="option"
                                    id="option"
                                    ref={optionRef}
                                    onChange={handleChange}
                                    defaultValue={(clickedItemInTable[0])? clickedItemInTable[0].option : ""}
                                >
                                    { (clickedItemInTable[0] && clickedItemInTable[0].option)?
                                        <option value={clickedItemInTable[0].option}>{clickedItemInTable[0].option}</option>:
                                        <><option value="hide">
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
                                        </option></>
                                    }
                                </select>
                            </div>

                            <div>
                                <label htmlFor="position">Item Name</label>
                                <input
                                    type="text"
                                    id="position"
                                    ref={positionRef}
                                    defaultValue={(clickedItemInTable[0])? clickedItemInTable[0].position : ""}
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
                                    ref={priceRef}
                                    placeholder="1000,00"
                                    defaultValue={(clickedItemInTable[0])? clickedItemInTable[0].price : ""}
                                    min="0.01"
                                    step="0.01"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* <div>
                                <label htmlFor="paid">Paid?</label>
                                <input
                                    type="checkbox"
                                    id="paid"
                                    name="isPaid"
                                    onChange={handleChange}
                                    defaultValue={(clickedItemInTable[0])? clickedItemInTable[0].idPaid : "" }
                                />
                            </div> */}
                        </div>

                        <div className="edit-plan-form-bottom">
                            <div>
                                <label htmlFor="paiddate">
                                    Date of Payment
                                </label>
                                <input
                                    type="date"
                                    id="paiddate"
                                    ref={paidDateRef}
                                    name="paidDate"
                                    defaultValue={(clickedItemInTable[0] && clickedItemInTable[0].paiddate)? new Date(clickedItemInTable[0].paiddate).toISOString().slice(0, 10) : ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="finalsum">Paid Amount</label>
                                <input
                                    type="number"
                                    id="finalsum"
                                    name="finalSum"
                                    ref={totalRef}
                                    placeholder="10.000,00"
                                    defaultValue={(clickedItemInTable[0])? clickedItemInTable[0].total : ""}
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
                                    ref={notesRef}
                                    placeholder="Please enter Notes"
                                    name="notes"
                                    defaultValue={(clickedItemInTable[0])? clickedItemInTable[0].notes: ""}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <div className="single-position-costs">
                            <button
                                className="submit-btn-delete"
                                onClick={handleDeleteOutgoings}
                            >
                                delete
                            </button>
                            <button
                                className="submit-btn-three"
                                onClick={handleUpdateOutgoings}
                            >
                                update
                            </button>
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
                    <div className="data-table">
                        <div
                            style={{ flexGrow: 1 }}
                        >
                            <DataGrid
                                rowHeight={30} 
                                rows={dataRows}
                                columns={dataColumns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                checkboxSelection
                                onSelectionModelChange={itm => {
                                    // console.log(itm[0]);
                                    setIdItemPopulateList(itm[0]);
                                }
                                }
                            />
                        </div>
                    </div>
                    {/* <Route exact path="/projects/edit-plan/:id" component={OutgoingsTable}>
                        <OutgoingsTable />
                    </Route> */}
                    {/* <Route exact path="/projects/edit-plan/:id" render={(props)=>{return(
                        <OutgoingsTable id={props.match.params.id}/>);
                    }} /> */}
                </div>
            </div>
        </div>
    );
}
