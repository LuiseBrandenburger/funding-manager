import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

export default function OutgoingsTable() {
    const { id } = useParams();
    console.log("id in params: ", id);
    const dispatch = useDispatch();

    // *********************************** STATE *******************************

    const [dataColumns, setDataColumns] = useState([
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
        }, 
        { field: "id", headerName: "ID", width: 60 },
    ]);
    const [dataRows, setDataRows] = useState([]);
    const [idItemPopulateList, setIdItemPopulateList] = useState();
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

    console.log("current Outgoing data:", currentOutgoingData)
    // *********************************** EFFECTS *******************************

    useEffect(() => {
        setDataRows(currentOutgoingData);
    }, [currentProjectId]);

    useEffect(() => {
        setDataRows(currentOutgoingData);
    }, [outgoings]);

    // *********************************** TABLE *******************************

    useEffect(() => {
        setDataRows(currentOutgoingData);

    }, []);


    return (
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
    );
}
