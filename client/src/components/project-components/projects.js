import { BrowserRouter, Route, Link } from "react-router-dom";
import ShowProjectOverview from "./show-project-overview";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsReceived } from "../../redux/projects/slice";
import {
    currentProjectIdReceived,
    updateCurrentProjectId,
} from "../../redux/currentProjectId/slice";

import useForm from "../../hooks/use-form";
import EditPlan from "./edit-plan";
import EditProject from "./edit-project";
import AddNewProject from "./add-new-project";

export default function Projects({ userId }) {
    const dispatch = useDispatch();
    const [userInput, handleChange] = useForm();
    // const [currentProject, setCurrentProject] = useState(0);

    // ********************* STATE ***************************
    const projects = useSelector((state) => state.projects || {});
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


    // ********************* EFFECTS ***************************

    useEffect(() => {
        fetch(`/all-projects`)
            .then((data) => data.json())
            .then(({ data }) => {
                console.log(
                    "data in GET Route /all-projects: ",
                    data,
                    data[0].id
                );
                dispatch(currentProjectIdReceived(data[0].id));
                dispatch(projectsReceived(data));
            })
            .catch((err) => {
                //    location.replace("/");
                console.log("error to get all Projects: ", err);
            });
    }, []);

    useEffect(() => {
        if (userInput) {
            let inputId = parseInt(userInput.selection);
            dispatch(updateCurrentProjectId(inputId));
        }
    }, [userInput]);


    // useEffect(() => {
    //     console.log("project ID has changed");

    //     fetch(`/project-sum-fc/${currentProjectId}`)
    //         .then((data) => data.json())
    //         .then(({ data }) => {
    //             console.log(
    //                 "data in GET Route /project-sum-fc/:id",
    //                 data,
    //             );
    //         })
    //         .catch((err) => {
    //             //    location.replace("/");
    //             console.log("error to get all Projects: ", err);
    //         });
    // }, [currentProjectId]);
    
    // console.log("currentProjectData", currentProjectData);

    let projectsList =
        projects.length > 0 &&
        projects.map((project, i) => {
            return (
                <option key={i} value={project.id}>
                    {project.name}
                </option>
            );
        }, this);


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
                            {currentProjectData && currentProjectData.length ? (
                                <ul>
                                    <li>
                                        <h4>
                                            {currentProjectData[0].sum_fc_total}
                                        </h4>
                                        <h5>Costs FC</h5>
                                    </li>
                                    <li>
                                        <h4>
                                            {
                                                currentProjectData[0]
                                                    .approved_funding
                                            }
                                        </h4>
                                        <h5>Funding Sum</h5>
                                    </li>
                                    <li>
                                        <h4>
                                            {currentProjectData[0].sum_left}
                                        </h4>
                                        <h5>Left</h5>
                                    </li>
                                    <li>
                                        <h4>
                                            {currentProjectData[0].sumspend}
                                        </h4>
                                        <h5>Accounted</h5>
                                    </li>
                                    <li>
                                        <h4>
                                            {
                                                currentProjectData[0]
                                                    .approved_funding
                                            }
                                        </h4>
                                        <h5>Funding received</h5>
                                    </li>
                                </ul>
                            ) : (
                                ""
                            )}
                            <Link to="/projects/edit-project">
                                <button className="submit-btn">
                                    Edit Project
                                </button>
                            </Link>

                            <Link to="/projects/edit-plan">
                                <button className="submit-btn">
                                    Edit Plan
                                </button>
                            </Link>

                            <Link to="/projects/show-project">
                                <button className="submit-btn">
                                    Show Overview
                                </button>
                            </Link>
                        </div>
                        <div className="btns-left">
                            <Link to="/projects/add-project">
                                <button className="submit-btn-two">
                                    Add New Project
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/*PROJECTS MAIN CONTENT RIGHT */}

                <div className="main-content-right">
                    <Route exact path="/projects/show-project">
                        <ShowProjectOverview userId={userId} />
                    </Route>
                    <Route path="/projects/edit-project">
                        <EditProject userId={userId} />
                    </Route>
                    <Route path="/projects/edit-plan">
                        <EditPlan userId={userId} />
                    </Route>
                    <Route path="/projects/add-project">
                        <AddNewProject userId={userId} />
                    </Route>
                    {/* <Route path="/projects">
                        <ShowProjectOverview />
                    </Route> */}
                </div>
            </BrowserRouter>
        </div>
    );
}
