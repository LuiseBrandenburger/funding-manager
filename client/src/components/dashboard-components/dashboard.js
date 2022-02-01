import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { projectsReceived } from "../../redux/projects/slice";


export default function Dashboard() {
    const projects = useSelector((state) => state.projects || {});
    const dispatch = useDispatch();


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


    return (
        <div className="main-content-container">
            {/* DASHBOARD MAIN CONTENT LEFT */}

            <div className="main-content-left">
                <div className="main-content-left-container">
                    <div>
                        <ul>
                            <li>
                                <h4>Money Overview</h4>
                                <h5>10.000,00€</h5>
                            </li>
                            <li>
                                <h4>Money Overview</h4>
                                <h5>10.000,00€</h5>
                            </li>
                            <li>
                                <h4>Money Overview</h4>
                                <h5>10.000,00€</h5>
                            </li>
                            <li>
                                <h4>Money Overview</h4>
                                <h5>10.000,00€</h5>
                            </li>
                        </ul>
                    </div>

                    <div className="btns-left">
                        <button className="focus-btn">Show all Projects</button>
                        <button className="focus-btn">Add Project</button>
                    </div>
                </div>
            </div>
            {/* DASHBOARD MAIN CONTENT RIGHT */}

            <div className="main-content-right">
                <div className="main-content-right-container">
                    <div className="overview"></div>
                    <div className="chart-container"></div>
                    <div className="chart-container"></div>
                </div>
            </div>
        </div>
    );
}
