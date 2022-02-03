import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import OutgoingsTable from "../table-charts-components/outgoings-table";
import OutgoingsChart from "../table-charts-components/outgoings-chart";


export default function ShowProjectOverview() {
    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );


    return (
        <div className="main-content-right-container">
            <BrowserRouter>
                <div className="project-plan-table-container">
                    <div className="project-plan-overview">
                        <div className="project-plan-overview-left">
                            <h2>Project Plan Forecase</h2>
                            <br />
                            <h3>Money spend per Position</h3>
                            <h3>Money spend per Marketing</h3>
                            <h3>Money spend per Tour</h3>
                            <h3>Money spend per Production</h3>
                            <br />
                            <h2>Total:</h2>
                        </div>
                        <div className="project-plan-overview-right">
                            {currentProjectId ? (
                                <Link to={`/projects/show-project/outgoings-table`}>
                                    <button>Outgoings Table</button>
                                </Link>
                            ) : (
                                ""
                            )}
                            {currentProjectId ? (
                                <Link to={`/projects/show-project/outgoings-chart`}>
                                    <button>Outgoings Chart</button>
                                </Link>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="project-plan-table">
                        {currentProjectId ? (
                            <Route path={`/projects/show-project/outgoings-table`}>
                                <OutgoingsTable />
                            </Route>
                        ) : (
                            ""
                        )}
                        {currentProjectId ? (
                            <Route path={`/projects/show-project/outgoings-chart`}>
                                <OutgoingsChart />
                            </Route>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}
