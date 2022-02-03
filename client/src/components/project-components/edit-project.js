import useForm from "../../hooks/use-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function EditProject() {
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);

    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );

    const projects = useSelector((state) => state.projects || {});

    const currentProjectData = useSelector((state) => {
        if (state.projects) {
            return state.projects.filter((project) => {
                return project.id === state.currentProjectId;
            });
        } else {
            return {};
        }
    });

    console.log(currentProjectData[0].name);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/update-project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.success) {
                    location.reload();
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch /update-projects", err);
                setError(true);
            });
    };

    // approved_funding: "20000.00"
    // artist_name: "Elder"
    // funding_received: "0.00"
    // id: 6
    // name: "Elder - New Album 2022"
    // project_number: "E123"
    // sum_accounted: "0.00"
    // sum_fc_total: "21000.00"
    // sum_left: "14000.00"
    // sum_total: "6000.00"
    // sumspend: "0.00"


    return (
        <div className="main-content-right-container">
            <div className="add-new-project-container">
                <h2>You can Update Your Project here</h2>
                <br />
                <form action="">
                    <div className="form-left">
                        <label htmlFor="project-name">Project Name</label>
                        <input
                            type="text"
                            id="project-name"
                            name="projectName"
                            placeholder="Project Name"
                            value={currentProjectData?.name || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="project-number">Project Number:</label>
                        <input
                            type="text"
                            id="project-number"
                            name="projectNumber"
                            placeholder="f.ex: (K123456/2021)"
                            value={currentProjectData?.project_number || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="artist-name">Artist Name</label>
                        <input
                            type="text"
                            id="artist-name"
                            name="artistName"
                            placeholder="Artist Name"
                            value={currentProjectData?.artist_name || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="project-start">Project Start:</label>
                        <input
                            type="date"
                            id="project-start"
                            name="projectStart"
                            placeholder="Project Start"
                            // value={currentProjectData?.artist_name || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="project-end">Project End:</label>
                        <input
                            type="date"
                            id="project-end"
                            name="projectEnd"
                            placeholder="Project End"
                            onChange={handleChange}
                        />
                        <label htmlFor="project-description">
                            Project Description
                        </label>
                        <textarea
                            id="project-description"
                            name="projectDescription"
                            placeholder="Project Description"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-right">
                        <label htmlFor="funding-approved">
                            Do you already have money approved for the Project?
                        </label>
                        <input
                            type="checkbox"
                            id="funding-approved"
                            name="approved"
                            onChange={handleChange}
                        />

                        <label htmlFor="funding-sum">
                            Sum Approved Funding
                        </label>
                        <input
                            type="number"
                            id="funding-sum"
                            name="approvedFunding"
                            placeholder="1000,00 or 1000.00"
                            min="0.01"
                            step="0.01"
                            onChange={handleChange}
                        />
                        <label htmlFor="funding-program">
                            Name of the Program
                        </label>
                        <input
                            type="text"
                            id="funding-program"
                            placeholder="Funding Program"
                            name="programName"
                            onChange={handleChange}
                        />
                        <label htmlFor="project-manager">
                            Name of the Project Manager
                        </label>
                        <input
                            type="text"
                            id="project-manager"
                            placeholder="Project Manager"
                            name="manager"
                            onChange={handleChange}
                        />

                        <button className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
