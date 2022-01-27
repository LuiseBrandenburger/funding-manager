import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Dashboard() {
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
