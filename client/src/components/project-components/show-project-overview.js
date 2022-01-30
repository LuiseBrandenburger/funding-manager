import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import OutgoingsTable from "../table-charts-components/outgoings-table";
import OutgoingsChart from "../table-charts-components/outgoings-chart";


export default function ShowProjectOverview() {
    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );

    let id = currentProjectId;
    console.log("both ids from overview", currentProjectId, id);

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
                            {/* TODO: FIXME: */}
                            {currentProjectId ? (
                                <Link to={`/projects/show-project/outgoings-table/${id}`}>
                                    <button>Outgoings Table</button>
                                </Link>
                            ) : (
                                ""
                            )}

                            {currentProjectId ? (
                                <Link to={`/projects/show-project/outgoings-chart/${id}`}>
                                    <button>Outgoings Chart</button>
                                </Link>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="project-plan-table">
                        {/* TODO: FIXME: */}
                        {currentProjectId ? (
                            <Route path={`/projects/show-project/outgoings-table/:id`}>
                                <OutgoingsTable />
                            </Route>
                        ) : (
                            ""
                        )}
                        {/* TODO: FIXME: */}
                        {currentProjectId ? (
                            <Route path={`/projects/show-project/outgoings-chart/:id`}>
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
