import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function OutgoingsTable() {

    // *********************************** STATE *******************************

    const [dataRows, setDataRows] = useState([]);
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
    const currentOutgoingData = useSelector((state) => {
        if (state.outgoings) {
            return state.outgoings.filter((outgoing) => {
                return outgoing.project_id === state.currentProjectId;
            });
        } else {
            return {};
        }
    });
    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );

    // *********************************** EFFECTS *******************************

    useEffect(() => {
        setDataRows(currentOutgoingData);
    }, [currentProjectId]);

    // *********************************** TABLE *******************************


    return (
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
                    components={{ Toolbar: GridToolbar }}
                />
            </div>
        </div>
    );
}
