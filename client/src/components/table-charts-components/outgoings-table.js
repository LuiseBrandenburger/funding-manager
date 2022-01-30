import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { outgoingsReceived } from "../../redux/outgoings/slice";
import { DataGrid } from "@mui/x-data-grid";

export default function OutgoingsTable() {
    const { id } = useParams();
    console.log("id in params: ", id);
    const dispatch = useDispatch();

    // *********************************** STATE *******************************

    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );
    const outgoings = useSelector((state) => state.outgoings || {});
    console.log("outgoings from state: ", outgoings);

    const [dataColumns, setDataColumns] = useState([]);
    const [dataRows, setDataRows] = useState([]);

    // *********************************** EFFECTS *******************************

    useEffect(() => {
        // console.log("id in params after mounted: ", id);
        fetch(`/all-outgoings/${id}`)
            .then((data) => data.json())
            .then(({ data }) => {
                console.log(
                    "data in GET Route /all-outgoings: ",
                    data,
                );
                // setCurrentProjectId(data[0].id);
                // dispatch(currentProjectIdReceived(data[0].id));
                // dispatch(projectsReceived(data));


                setDataColumns([
                    { field: "id", headerName: "ID", width: 60 },
                    { field: "position", headerName: "Position", width: 170 },
                    { field: "option", headerName: "Option", width: 170 },
                    {
                        field: "price",
                        headerName: "Costs",
                        type: "number",
                        width: 100,
                        editable: true 
                    },
                    {
                        field: "total",
                        headerName: "Paid",
                        type: "number",
                        width: 100,
                        editable: true 
                    }   
                ]);
                setDataRows(data);
            })
            .catch((err) => {
                //    location.replace("/");
                console.log("error to get all Projects: ", err);
            });
    }, [currentProjectId]);

    // *********************************** TABLE *******************************


    useEffect(() => {
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
