import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { projectsReceived } from "../../redux/projects/slice";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Bar } from "react-chartjs-2";

export default function Dashboard() {
    const dispatch = useDispatch();
    
    const projects = useSelector((state) => state.projects || {});
    const dataArrApprovedFund = useSelector(
        (state) =>
            state.projects.map((item) => {
                return item.approved_funding;
            }) || {}
    );
    const dataArrFundBalance = useSelector(
        (state) =>
            state.projects.map((item) => {
                return item.sum_left;
            }) || {}
    );
    const dataArrCostsFC = useSelector(
        (state) =>
            state.projects.map((item) => {
                return item.sum_fc_total;
            }) || {}
    );
    const dataArrCostsFinal = useSelector(
        (state) =>
            state.projects.map((item) => {
                return item.sum_total;
            }) || {}
    );
    const labelArr = useSelector((state) => state.projects.map((item)=> {
        return item.name;
    }) || {});
    // *********************************** STATE FOR CHART *******************************

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Funding",
                data: [],
            },
        ],
    });

    useEffect(() => {
        fetch(`/all-projects`)
            .then((data) => data.json())
            .then(({ data }) => {
                console.log(
                    "data in GET Route /all-projects: ",
                    data,
                    data[0].id
                );
                dispatch(projectsReceived(data));
            })
            .catch((err) => {
                //    location.replace("/");
                console.log("error to get all Projects: ", err);
            });
    }, []);


    useEffect(() => {
        setChartData({
            labels: labelArr,
            datasets: [
                {
                    data: dataArrApprovedFund,
                    label: "Apporoved Funding Sum",
                    backgroundColor: ["#124559"],
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    barPercentage: 10,
                    barThickness: 50,
                    maxBarThickness: 50,
                    minBarLength: 2,
                },
                {
                    data: dataArrFundBalance,
                    label: "Funding Balance",
                    backgroundColor: ["#f5b700"],
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    barPercentage: 10,
                    barThickness: 50,
                    maxBarThickness: 50,
                    minBarLength: 2,
                },
                {
                    data: dataArrCostsFC,
                    label: "Estimated Costs",
                    backgroundColor: ["#9f4a54"],
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    barPercentage: 10,
                    barThickness: 50,
                    maxBarThickness: 50,
                    minBarLength: 2,
                },
                {
                    data: dataArrCostsFinal,
                    label: "Costs Paid",
                    backgroundColor: ["#7ca982"],
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    barPercentage: 10,
                    barThickness: 50,
                    maxBarThickness: 50,
                    minBarLength: 2,
                },
            ],
        },
        
        );
    }, [projects]);

    return (
        <div className="main-content-container">
            {/* DASHBOARD MAIN CONTENT LEFT */}

            <div className="main-content-left">
                <div className="main-content-left-container">
                    <div>
                        <h3>My Projects</h3>
                        <ul>
                            {projects &&
                            projects.map((project) => (
                                <li key={project.id}>
                                    <h4 key={project.id}>
                                        {project.name}
                                    </h4>
                                    <h5>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(project.approved_funding)}</h5>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="btns-left">
                        {/* <button className="focus-btn">Show all Projects</button>
                        <button className="focus-btn">Add Project</button> */}
                    </div>
                </div>
            </div>
            {/* DASHBOARD MAIN CONTENT RIGHT */}

            <div className="main-content-right">
                <div className="main-content-right-container">
                    <div className="project-preview-container">
                        {projects &&
                            projects.map((project) => (
                                <div className="project-preview-box" key={project.id}>
                                    <h5 key={project.id}>
                                        {project.name}
                                    </h5>
                                    <h6>{project.artist_name}</h6>
                                    <h6>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(project.approved_funding)}</h6>
                                    <h6>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(project.sum_total)}</h6>
                                    <h6>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(project.sum_left)}</h6>
                                
                                </div>
                            ))}
                    </div>
                    <div className="chart-container">
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
                </div>
            </div>
        </div>
    );
}
