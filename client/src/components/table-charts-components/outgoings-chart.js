import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Bar } from "react-chartjs-2";


export default function OutgoingsChart() {

    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );
    const outgoings = useSelector((state) => state.outgoings || {});
    const labelArr = useSelector((state) => state.outgoings.map((item)=> {
        return item.position;
    }) || {});
    const dataEstimatedCosts = useSelector(
        (state) =>
            state.outgoings.map((item) => {
                return item.price;
            }) || {}
    );
    const dataFinalCosts = useSelector(
        (state) =>
            state.outgoings.map((item) => {
                return item.total;
            }) || {}
    );


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
                // {
                //     data: dataArrCostsFC,
                //     label: "Estimated Costs",
                //     backgroundColor: ["#9f4a5477"],
                //     hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                //     barPercentage: 10,
                //     barThickness: 50,
                //     maxBarThickness: 50,
                //     minBarLength: 2,
                // },
                // {
                //     data: dataArrCostsFinal,
                //     label: "Costs Paid",
                //     backgroundColor: ["#7ca98277"],
                //     hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                //     barPercentage: 10,
                //     barThickness: 50,
                //     maxBarThickness: 50,
                //     minBarLength: 2,
                // },
            ],
        },
        
        );
    }, [outgoings]);

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
