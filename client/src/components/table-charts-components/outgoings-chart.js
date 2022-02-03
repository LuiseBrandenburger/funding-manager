import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Bar } from "react-chartjs-2";


export default function OutgoingsChart() {

    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );
    // const outgoings = useSelector((state) => state.outgoings || {});

    // const labelArr = useSelector((state) => state.outgoings.map((item)=> {
    //     return item.position;
    // }) || {});

    // const dataEstimatedCosts = useSelector(
    //     (state) =>
    //         state.outgoings.map((item) => {
    //             return item.price;
    //         }) || {}
    // );
    // const dataFinalCosts = useSelector(
    //     (state) =>
    //         state.outgoings.map((item) => {
    //             return item.total;
    //         }) || {}
    // );

    // const currentOutgoingData = useSelector((state) => {
    //     if (state.outgoings) {
    //         return state.outgoings.filter((outgoing) => {
    //             return outgoing.project_id === state.currentProjectId;
    //         });
    //     } else {
    //         return {};
    //     }
    // });

    const dataEstimatedCosts = useSelector((state) => {
        if (state.outgoings) {

            const currentOut = state.outgoings.filter((outgoing) => {
                // I only want an array where there is a value
                return outgoing.project_id === state.currentProjectId
                // {
                //     return outgoing.price;
                // }
            });
            const currentPrice = currentOut.map((outgoing) => {
                return outgoing.price;
            });
            return currentPrice;

        } else {
            return {};
        }
    });

    const labelArr = useSelector((state) => {
        if (state.outgoings) {

            const currentOut = state.outgoings.filter((outgoing) => {
                return outgoing.project_id === state.currentProjectId;
            });
            const currentPosition = currentOut.map((outgoing) => {
                return outgoing.position;
            });
            return currentPosition;

        } else {
            return {};
        }
    });

    const dataFinalCosts = useSelector((state) => {
        if (state.outgoings) {

            const currentOut = state.outgoings.filter((outgoing) => {
                return outgoing.project_id === state.currentProjectId;
            });
            const currentTotal = currentOut.map((outgoing) => {
                return outgoing.total;
            })
            return currentTotal;

        } else {
            return {};
        }
    });

    console.log("cuurent Outgoing in Chart Price: ", dataEstimatedCosts);



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

    // useEffect(() => {
    //     setDataEstimatedCosts(currentOutgoingData);
    // }, [currentProjectId]);

    // useEffect(() => {
    //     setDataFinalCosts(currentOutgoingData);
    // }, [currentProjectId]);


    useEffect(() => {
        setChartData({
            labels: labelArr,
            datasets: [
                {
                    data: dataEstimatedCosts,
                    label: "Estimated Costs",
                    backgroundColor: ["#12455977"],
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    barPercentage: 10,
                    barThickness: 20,
                    maxBarThickness: 20,
                    minBarLength: 2,
                },
                {
                    data: dataFinalCosts,
                    label: "Final Costs",
                    backgroundColor: ["#f5b80077"],
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    barPercentage: 10,
                    barThickness: 20,
                    maxBarThickness: 20,
                    minBarLength: 2,
                },
            ],
        },
        
        );
    }, [currentProjectId]);

    // *********************************** CHART *******************************



    return (
        <div>
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
