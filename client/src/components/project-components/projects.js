import { BrowserRouter, Route, Link } from "react-router-dom";
import ShowProjectOverview from "./show-project-overview";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsReceived } from "../../redux/projects/slice";
import useForm from "../../hooks/use-form";

import EditPlan from "./edit-plan";
import EditProject from "./edit-project";
import AddNewProject from "./add-new-project";

export default function Projects({ userId }) {
    const dispatch = useDispatch();
    const [userInput, handleChange] = useForm();
    const [currentProjectId, setCurrentProjectId] = useState(0);
    // const [currentProject, setCurrentProject] = useState(0);

    const projects = useSelector((state) => state.projects);

    useEffect(() => {
        fetch(`/all-projects`)
            .then((data) => data.json())
            .then(({ data }) => {
                console.log(
                    "data in GET Route /all-projects: ",
                    data,
                    data[0].id
                );
                setCurrentProjectId(data[0].id);
                // set the current Project to true;

                dispatch(projectsReceived(data));
            })
            .catch((err) => {
                //    location.replace("/");
                console.log("error to get all Projects: ", err);
            });
    }, []);

    let projectsList =
        projects.length > 0 &&
        projects.map((project, i) => {
            return (
                <option key={i} value={project.id}>
                    {project.name}
                </option>
            );
        }, this);

    const currentProject = useSelector(
        (state) =>
            state.projects &&
            state.projects.filter((project) => {
                // console.log("project ID in State: ", project.id);
                return project.id === currentProjectId;
            })
    );

    // console.log("current Project is: ", currentProject[0]);

    useEffect(() => {
        if (userInput) {
            let inputId = parseInt(userInput.selection);
            setCurrentProjectId(inputId);
            console.log("current Project after change is: ", currentProject[0]);
        }
    }, [userInput]);


    return (
        <div className="main-content-container">
            {/* PROJECTS MAIN CONTENT LEFT */}
            <BrowserRouter>
                <div className="main-content-left">
                    <div className="main-content-left-container">
                        <div className="content-left-container">
                            <div className="choose-project">
                                <label htmlFor="selection">Project</label>
                                <select
                                    onChange={handleChange}
                                    name="selection"
                                    id="selection"
                                >
                                    {projectsList}
                                </select>
                            </div>
                            <br />
                            <h4>Recent Projekt</h4>
                            <ul>
                                <li>
                                    {/* <h4>{currentProject[0].sumspend}</h4> */}
                                    <h5>Money Spend</h5>
                                </li>
                                <li>
                                    {/* <h4>{currentProject[0].approved_funding}</h4> */}
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
