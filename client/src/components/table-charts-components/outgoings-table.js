import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { outgoingsReceived } from "../../redux/outgoings/slice";
import { DataGrid } from "@mui/x-data-grid";

export default function OutgoingsTable() {
    const { id } = useParams();
    // console.log("id in params: ", id);

    const history = useHistory();
    const dispatch = useDispatch();
    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );
    const outgoings = useSelector((state) => state.outgoings || {});
    console.log("outgoings from state: ", outgoings);

    const [dataColumns, setDataColumns] = useState([]);
    const [dataRows, setDataRows] = useState([]);

    console.log(dataRows);

    // *********************************** EFFECTS *******************************

    useEffect(() => {
        // console.log("id in params after mounted: ", id);
        // fetch(`/all-outgoings/${currentProjectId}`)
        //     .then((data) => data.json())
        //     .then(({ data }) => {
        //         console.log(
        //             "data in GET Route /all-outgoings: ",
        //             data,
        //         );
        //         // setCurrentProjectId(data[0].id);
        //         // dispatch(currentProjectIdReceived(data[0].id));
        //         // dispatch(projectsReceived(data));
        //     })
        //     .catch((err) => {
        //         //    location.replace("/");
        //         console.log("error to get all Projects: ", err);
        //     });

        // TODO: fetch data with ID from Params!

        fetch(`/all-outgoings`)
            .then((data) => data.json())
            .then(({ data }) => {
                console.log("data in GET Route /all-outgoings: ", data);
                dispatch(outgoingsReceived(data));
            })
            .catch((err) => {
                //    location.replace("/");
                console.log("error to get all Projects: ", err);
            });
    }, [currentProjectId]);

    // *********************************** TABLE *******************************


        useEffect(() => {
            setDataColumns([
                { field: "id", headerName: "ID", width: 70 },
                { field: "firstName", headerName: "First name", width: 130 },
                { field: "lastName", headerName: "Last name", width: 130 },
                {
                    field: "age",
                    headerName: "Age",
                    type: "number",
                    width: 90,
                },
                {
                    field: "fullName",
                    headerName: "Full name",
                    description: "This column has a value getter and is not sortable.",
                    sortable: false,
                    width: 160,
                    valueGetter: (params) =>
                        `${params.getValue(params.id, "firstName") || ""} ${
                            params.getValue(params.id, "lastName") || ""
                        }`,
                },
            ]);
            setDataRows([
                { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
                { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
                { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
                { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
                { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
                { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
                { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
                { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
                { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
            ]);
    }, []);



    return (
        <div>
            <h1>HelloI am in table</h1>
            <div
                className="data-table"
                style={{ height: "100%", width: "100%" }}
            >
                <DataGrid
                    rows={dataRows}
                    columns={dataColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}
