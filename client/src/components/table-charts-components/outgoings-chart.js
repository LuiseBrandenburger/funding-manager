import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { outgoingsReceived } from "../../redux/outgoings/slice";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Bar } from "react-chartjs-2";


export default function OutgoingsChart() {
    const { id } = useParams();
    console.log("id in params: ", id);

    const history = useHistory();
    const dispatch = useDispatch();
    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );
    const outgoings = useSelector((state) => state.outgoings || {});

    const labelArr = useSelector((state) => state.outgoings.map((item)=> {
        return item.option;
    }) || {});

    const dataArr = useSelector(
        (state) =>
            state.outgoings.map((item) => {
                return item.price;
            }) || {}
    );

    console.log(labelArr);
    console.log(dataArr);


    // *********************************** STATE FOR CHART *******************************

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Outgoings",
                data: [],
            },
        ],
    });

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

    // *********************************** CHART *******************************

    useEffect(() => {
        setChartData({
            datasets: [
                {
                    data: [20, 10, 30],
                    backgroundColor: ["red"],
                    barPercentage: 0.5,
                    barThickness: 10,
                    maxBarThickness: 8,
                    minBarLength: 2,
                },
            ],
            labels: ["a", "b", "c"],
        });
    }, []);

    return (
        <div>
            <h1>HelloI am in Chart</h1>
            <Bar
                data={
                    chartData
                }
                width={100}
                height={30}
                options={
                    {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }
                }
            />
        </div>
    );
}
