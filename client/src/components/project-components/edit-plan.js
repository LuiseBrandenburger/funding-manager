import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    updateProjectFCSumOutgoings, 
    updateProjectSumFundingLeft, 
    updateProjectSumTotalCostsPaid 
} from "../../redux/projects/slice";
import { outgoingsReceived, addOutgoing, deleteOutgoing, updateOutgoing } from "../../redux/outgoings/slice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function EditPlan() {
    const dispatch = useDispatch();

    // *********************************** STATE *******************************

    const [userInputOutgoings, setUserInputOutgoings] = useState({});
    const [error, setError] = useState(false);
    const [dataColumns, setDataColumns] = useState([
        { field: "category", headerName: "Category", width: 100 },
        { field: "option", headerName: "Option", width: 200 },
        { field: "position", headerName: "Expense Description", width: 200 },
        {
            field: "price",
            headerName: "Cost",
            type: "number",
            width: 120,
            editable: true 
        },
        {
            field: "total",
            headerName: "Paid Amount",
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
        { field: "notes", headerName: "Transaction Notes", width: 300 },
        { field: "id", headerName: "ID", width: 60 },

    ]);
    const [dataRows, setDataRows] = useState([]);
    const [itemPopulateListClicked, setItemPopulateListClicked] = useState(false);
    const [idItemPopulateList, setIdItemPopulateList] = useState();
    const [selectionMarketing, setSelectionMarketing] = useState(['-----Select Option-----','2.01. Promotion Print',
        '2.02. Promotion Radio',
        '2.03. Promotion TV',
        '2.04. Promotion Online', 
        '2.05. Advertisements',
        '2.06. Online Marketing',
        '2.07. Other Marketing',
        '2.08. Press Releases, Biography', 
        '2.09. Internet presence',
        '2.10. Production Expenses', 
        '2.11. Shipping Expenses',
        '2.12. PR travel',
        '2.13. Video / Content Production', 
        '2.14. Product management',
        '2.15. Other',
    ]);
    const [selectionProduction, setSelectionProduction] = useState(['-----Select Option-----','1.01. Studio Rental for Recording',
        '1.02. Studio Rental for Mixing',
        '1.03. Mastering',
        '1.04. Guest Musicians',
        '1.05. Producer',
        '1.05. Producer', 
        '1.07. Pressing Expenses (CD, Vinyl, Tapes)',
        '1.10. GEMA',
        '1.13. Artwork', 
        '1.14. Photography & Media', 
        '1.15. Composition Creation - Material Expenses',
        '1.16. Composition Creation - Fees',
        '1.17. Rehearsal - Material Expenses', 
        '1.18. Rehearsal - Fees', 
        '1.20. Other',
    ]);
    const [selectionTour, setSelectionTour] = useState(['-----Select Option-----','3.01. Travel Expenses',
        '3.02. Vehicle Rental',
        '3.03. Fuel Expenses',
        '3.04. Toll, Ferry, Other Travel Expenses',
        '3.05. Musician\'s Salary',
        '3.06. Guest Musician\'s  Fees',
        '3.07. Crew Technician\'s  (Sound, Lighting, Merchandise)  Fees',
        '3.08. Tour Management',
        '3.09. Equipment Rental',
        '3.10. Booking Fees',
        '3.11. Rehearsals Fees',
        '3.12. Other',
    ]);
    const [optionList, setOptionList] = useState([]);
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


    // *********************************** REF *******************************

    const categoryRef = useRef();
    const optionRef = useRef();
    const positionRef = useRef();
    const priceRef = useRef();
    const notesRef = useRef();
    const totalRef = useRef();
    const paidDateRef = useRef();

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
            // console.log("clicked Item in Table", clickedItemInTable[0].total);

            console.log("clicked Item in Table", clickedItemInTable[0]);

        }
    },[clickedItemInTable]);

    useEffect(()=>{
        setOptionList([]);
        if (categoryRef.current.value === "Production") {

            let optionList =
            selectionProduction.length > 0 &&
            selectionProduction.map((item, i) => {
                return (
                    <option key={i} value={item}>
                        {item}
                    </option>
                );
            }, this);
            setOptionList(optionList);
        } 
        if (categoryRef.current.value === "Marketing") {

            let optionList =
            selectionMarketing.length > 0 &&
            selectionMarketing.map((item, i) => {
                return (
                    <option key={i} value={item}>
                        {item}
                    </option>
                );
            }, this);
            setOptionList(optionList);
        } 
        if (categoryRef.current.value === "Tour") {

            let optionList =
            selectionTour.length > 0 &&
            selectionTour.map((item, i) => {
                return (
                    <option key={i} value={item}>
                        {item}
                    </option>
                );
            }, this);
            setOptionList(optionList);
        }
       
        // console.log("UserInput Outgoings: ", userInputOutgoings);

    },[userInputOutgoings]);

    useEffect(()=>{

        console.log("item clicken?", itemPopulateListClicked);

    }, [itemPopulateListClicked]);
    
    // ******************************* HANDLE CHANGES & SUBMITS *************************
    
    const handleChange = ({ target }) => {
        setUserInputOutgoings({
            ...userInputOutgoings,
            [target.name]: target.value,
        });
        // console.log("UserInput Outgoings: ", userInputOutgoings);
    };

    const handleItemClick =() => {
        
        itemPopulateListClicked? setItemPopulateListClicked(false):setItemPopulateListClicked(true);

        if (!itemPopulateListClicked) {
            // setUserInputOutgoings();

            // categoryRef.current.value ="";
            // optionRef.current.defaultValue="";
            // positionRef.current.defaultValue="";
            // priceRef.current.defaultValue=null;
            // notesRef.current.defaultValue="";
            // totalRef.current.defaultValue=null;
            // paidDateRef.current.defaultValue=null;
        }
    };

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

                    categoryRef.current.value ="";
                    optionRef.current.value="";
                    positionRef.current.value="";
                    priceRef.current.value=null;
                    notesRef.current.value="";
                    totalRef.current.value=null;
                    paidDateRef.current.value=null;

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
        
        // IF I CHANGE SOMETHING I OVERRIDE THE VALUES
        const userInputForUpdate = {
            category: categoryRef.current.value,
            option: optionRef.current.value,
            position: positionRef.current.value,
            price: parseFloat(priceRef.current.value),
            notes: notesRef.current.value,
            total: parseFloat(totalRef.current.value),
            paidDate: new Date(paidDateRef.current.value)
        };

        // ITEM CLICKED IS TRUE

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
                    dispatch(updateOutgoing(data.updatedOutgoing, data.updatedOutgoing.id));
                    setDataRows(currentOutgoingData);

                    // ITEM CLICKED IS TRUE
                    // wenn ich etwas anderes aendere ich das User Input Outgoing Value
                    // ich muss alle geaenderten Values leeren
                    // console.log("user input outgoings when i change something: ", userInputOutgoings);
                    // wenn ein Item Clicked false ist loesche setzte den user Input auf null

                    // document.getElementById("price").value = "";
                    categoryRef.current.value ="";
                    optionRef.current.value="";
                    positionRef.current.value="";
                    priceRef.current.value=null;
                    notesRef.current.value="";
                    totalRef.current.value=null;
                    paidDateRef.current.value=null;

                } else {
                    setError(true);
                }
            }).then(()=>{
                // setUserInputOutgoings();
                // categoryRef.current.value ="";
                // optionRef.current.value="";
                // positionRef.current.value="";
                // priceRef.current.value=null;
                // notesRef.current.value="";
                // totalRef.current.value=null;
                // paidDateRef.current.value=null;
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

                    // categoryRef.current.value ="";
                    // optionRef.current.value="";
                    // positionRef.current.value="";
                    // priceRef.current.value=null;
                    // notesRef.current.value="";
                    // totalRef.current.value=null;
                    // paidDateRef.current.value=null;
                    // setIdItemPopulateList();

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
                                    Select Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    ref={categoryRef}
                                    onChange={handleChange}
                                    defaultValue={(itemPopulateListClicked)? clickedItemInTable[0].category : ""}
                                >
                                    {(itemPopulateListClicked)?
                                        <option 
                                            defaultValue={clickedItemInTable[0].category}
                                            value={clickedItemInTable[0].category}>{clickedItemInTable[0].category}
                                        </option>:
                                        <>
                                            <option value="">-- Category --</option>
                                            <option value="Production">
                                            Production
                                            </option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Tour">Tour</option>
                                        </>

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
                                    defaultValue={(itemPopulateListClicked)? clickedItemInTable[0].option : ""}
                                >
                                    { (itemPopulateListClicked)?
                                        <option value={clickedItemInTable[0].option}>{clickedItemInTable[0].option}</option>:
                                        <>{optionList}</>
                                    }
                                </select>
                            </div>

                            <div>
                                <label htmlFor="position">Expense Description</label>
                                <input
                                    type="text"
                                    id="position"
                                    ref={positionRef}
                                    defaultValue={(itemPopulateListClicked)? clickedItemInTable[0].position : ""}
                                    // value={(itemPopulateListClicked)? clickedItemInTable[0].position : ""}
                                    name="position"
                                    placeholder="Describe Position"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="price">Estimated Cost</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    ref={priceRef}
                                    placeholder="E.g. 1000,00"
                                    defaultValue={(itemPopulateListClicked)? clickedItemInTable[0].price : null}
                                    // value={(itemPopulateListClicked)? clickedItemInTable[0].price : null}
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
                                    defaultValue={(itemPopulateListClicked)? new Date(clickedItemInTable[0].paiddate).toISOString().slice(0, 10) : ""}
                                    // value={(itemPopulateListClicked)? new Date(clickedItemInTable[0].paiddate).toISOString().slice(0, 10) : ""}
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
                                    placeholder="E.g. 1000,00"
                                    defaultValue={(itemPopulateListClicked)? clickedItemInTable[0].total : null}
                                    // value={(itemPopulateListClicked)? clickedItemInTable[0].total : null}
                                    min="0.01"
                                    step="0.01"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="notes">Transaction Notes</label>
                                <input
                                    type="text"
                                    id="notes"
                                    ref={notesRef}
                                    placeholder="E.g. Invoice Number"
                                    name="notes"
                                    defaultValue={(itemPopulateListClicked)? clickedItemInTable[0].notes: ""}
                                    // value={(itemPopulateListClicked)? clickedItemInTable[0].notes: ""}
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
                                    setIdItemPopulateList(itm[0]);
                                    handleItemClick();
                                }
                                }
                                components={{ Toolbar: GridToolbar }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
