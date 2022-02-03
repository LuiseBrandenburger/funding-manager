import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import OutgoingsTable from "../table-charts-components/outgoings-table";
import OutgoingsChart from "../table-charts-components/outgoings-chart";


export default function ShowProjectOverview() {
    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );

    const currentProjectData = useSelector((state) => {
        if (state.projects) {
            return state.projects.filter((project) => {
                return project.id === state.currentProjectId;
            });
        } else {
            return {};
        }
    });

    console.log(currentProjectData[0]);

    //     approved_funding: "20000.00"
    // artist_name: "Elder"
    // funding_received: "0.00"
    // id: 6
    // name: "Elder - New Album 2022"
    // project_number: "E123"
    // sum_accounted: "0.00"
    // sum_fc_total: "24500.00"
    // sum_left: "6499.44"
    // sum_total: "13500.56"
    // sumspend: "0.00"

    return (
        <div className="main-content-right-container">
            <BrowserRouter>
                <div className="project-plan-table-container">
                    <div className="project-plan-overview">
                        <div className="project-plan-overview-left">
                            <h2>{currentProjectData[0].name || ""}</h2>
                            <br/>
                            <h3>Project Number:</h3>
                            <h3 className="text-highlight-yellow">{currentProjectData[0].project_number || ""}</h3>
                            <h3>Funding Received:</h3>
                            <h3 className="text-highlight-yellow">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(currentProjectData[0].funding_received) || ""}</h3>
                            
                            <h3>Estimated Costs:</h3>
                            <h3 className="text-highlight-yellow">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(currentProjectData[0].sum_fc_total) || ""}</h3>
                            
                            

                        </div>
                        <div className="project-plan-overview-right">
                            <h3>Paid Costs:</h3>
                            <h3 className="text-highlight-yellow">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(currentProjectData[0].sum_total) || ""}</h3>

                            <h3>Funding Balance:</h3>
                            <h3 className="text-highlight-yellow">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(currentProjectData[0].sum_left) || ""}</h3>
                            <br/>
                            
                            <div>
                                {currentProjectId ? (
                                    <Link to={`/projects/show-project/outgoings-table`}>
                                        <button className="focus-btn">Outgoings Table</button>
                                    </Link>
                                ) : (
                                    ""
                                )}
                                {currentProjectId ? (
                                    <Link to={`/projects/show-project/outgoings-chart`}>
                                        <button className="focus-btn">Outgoings Chart</button>
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>
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
