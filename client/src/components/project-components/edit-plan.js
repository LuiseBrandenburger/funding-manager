import useForm from "../../hooks/use-form";
import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { 
    updateProjectFCSumOutgoings, 
    updateProjectSumFundingLeft, 
    updateProjectSumTotalCostsPaid 
} from "../../redux/projects/slice";
import { outgoingsReceived } from "../../redux/outgoings/slice";

import {OutgoingsTable} from "../table-charts-components/outgoings-table";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";


export default function EditPlan() {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log("id in params: ", id);

    const [userInputOutgoings, setUserInputOutgoings] = useState({});
    // const [fileInputOutgoings, setFileInputOutgoings] = useState({});
    const [error, setError] = useState(false);
    
    const categorySelectionRef = useRef();

    const [dataColumns, setDataColumns] = useState([]);
    const [dataRows, setDataRows] = useState([]);

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
    // console.log("outgoings in state: ", outgoings);
    // console.log("currentOutgoingData in state: ", currentOutgoingData);


    // *********************************** EFFECTS *******************************
    
    useEffect(() => {
        fetch(`/all-outgoings`)
            .then((data) => data.json())
            .then(({ data }) => {
                // console.log(
                //     "data in GET Route /all-outgoings: ",
                //     data,
                // );
                dispatch(outgoingsReceived(data));
            })
            .catch((err) => {
                console.log("error to get all Projects: ", err);
            });
    }, []);
    
    useEffect(() => {
        setDataColumns([
            { field: "id", headerName: "ID", width: 60 },
            { field: "position", headerName: "Position", width: 100 },
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
            } 
        ]);
        setDataRows(currentOutgoingData);
    }, [currentProjectId]);


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
                    // TODO: SOMETHING WHEN SUCCESS
                    console.log("data when posted:", data);
                    console.log("this worked");
                    dispatch(updateProjectFCSumOutgoings(currentProjectId, data.sumFcTotalCosts));
                    // dispatch(outgoingsReceived())
                    // location.reload();
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

            // TODO: UPSERT For editing outcome values
    // defaultValue=
    // default Value wenn es kein Value gibt


        fetch("/api/update-outgoings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userInputOutgoings, outgoingId}),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.success) {
                    // TODO: SOMETHING WHEN SUCCESS
                    console.log("data when posted:", data);
                    console.log("this worked");
                    dispatch(updateProjectFCSumOutgoings(currentProjectId, data.sumFcTotalCosts));
                    dispatch(updateProjectSumFundingLeft(currentProjectId, data.sumFundingLeft));
                    dispatch(updateProjectSumTotalCostsPaid(currentProjectId, data.sumTotalCostsPaid));


                    // dispatch(outgoingsReceived())
                    // location.reload();


                    // addedOutgoing:
                        // category: "Marketing"
                        // created_at: "2022-01-31T10:09:26.474Z"
                        // fc_total: "0.00"
                        // file: null
                        // id: 110
                        // notes: null
                        // option: "1.02.\tStudiomiete/Mischen"
                        // paid: null
                        // paiddate: null
                        // position: "production"
                        // price: "10.00"
                        // project_id: 3
                        // quantity: "1"
                        // sender_id: 1
                        // total: "1.00"
                        // [[Prototype]]: Object
                    // success: true
                    // sumFcTotalCosts: "5180.00"
                    // sumFundingLeft: "98443.00"
                    // sumTotalCostsPaid: "1557.00"



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

                        </div>
                        <div className="single-position-costs">
                            <button
                                className="submit-btn-two"
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
                                rows={dataRows}
                                columns={dataColumns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                checkboxSelection
                                onSelectionModelChange={itm => 
                                // define a function what should happen once the itm is clicked
                                    console.log(itm[0])
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
