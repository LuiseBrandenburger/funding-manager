import { BrowserRouter, Route, Link } from "react-router-dom";
import ShowProjectOverview from "./show-project-overview";
import { useState, useEffect } from "react";

import EditPlan from "./edit-plan";
import EditProject from "./edit-project";
import AddNewProject from "./add-new-project";

export default function Projects({ userId }) {
    useEffect(() => {
        console.log("UserId in Projects:", userId);
        // get all corresponding Projects to the userId

        fetch(`/all-projects`)
            .then((data) => data.json())
            .then(({ data }) => {
                // console.log("data in GET Route friends-and-wannabees: ", data);
                //    dispatch(receiveFriendsAndWannabees(data));
            })
            .catch((err) => {
                //    location.replace("/");
                console.log("error to get all Projects: ", err);
            });
    }, []);

    return (
        <div className="main-content-container">
            {/* PROJECTS MAIN CONTENT LEFT */}
            <BrowserRouter>
                <div className="main-content-left">
                    <div className="main-content-left-container">
                        <div className="content-left-container">
                            <div className="choose-project">
                                <label htmlFor="selection-group">Project</label>
                                <select
                                    name="selection-group"
                                    id="selection-group"
                                >
                                    <option value="hide">-- Project --</option>
                                    <option value="Production">
                                        Project Number
                                    </option>
                                    <option value="Marketing">
                                        Project Number
                                    </option>
                                    <option value="Tour">Project Number</option>
                                </select>
                            </div>
                            <br />
                            <h4>Recent Projekt</h4>
                            <ul>
                                <li>
                                    <h4>0,00</h4>
                                    <h5>Money Spend</h5>
                                </li>
                                <li>
                                    <h4>10.000,00</h4>
                                    <h5>Funding Sum</h5>
                                </li>
                                <li>
                                    <h4>10.000,00</h4>
                                    <h5>Left</h5>
                                </li>
                                <li>
                                    <h4>0,00</h4>
                                    <h5>Accounted</h5>
                                </li>
                                <li>
                                    <h4>0,00</h4>
                                    <h5>Funding received</h5>
                                </li>
                            </ul>

                            <Link to="/edit-project">
                                <button className="submit-btn">
                                    Edit Project
                                </button>
                            </Link>

                            <Link to="/edit-plan">
                                <button className="submit-btn">
                                    Edit Plan
                                </button>
                            </Link>

                            {/* <Link to="/show-project">
                            <button className="submit-btn">
                                Show Overview
                            </button>
                        </Link> */}
                        </div>
                        <div className="btns-left">
                            <Link to="/add-project">
                                <button className="submit-btn-two">
                                    Add New Project
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/*PROJECTS MAIN CONTENT RIGHT */}

                <div className="main-content-right">
                    <Route exact path="/projects">
                        <ShowProjectOverview userId={userId} />
                    </Route>
                    <Route path="/edit-project">
                        <EditProject userId={userId} />
                    </Route>
                    <Route path="/edit-plan">
                        <EditPlan userId={userId} />
                    </Route>
                    <Route path="/add-project">
                        <AddNewProject userId={userId} />
                    </Route>
                    {/* <Route path="/">
                        <ShowProjectOverview />
                    </Route> */}
                </div>
            </BrowserRouter>
        </div>
    );
}
