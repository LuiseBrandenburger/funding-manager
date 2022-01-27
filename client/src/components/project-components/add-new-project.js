export default function AddNewProject() {
    return (
        <div className="main-content-right-container">
            <div className="add-new-project-container">
                <h2>Please fill out the form</h2>
                <br />
                <form action="">
                    <div className="form-left">
                        <label htmlFor="project-name">Project Name</label>
                        <input
                            type="text"
                            id="project-name"
                            placeholder="Project Name"
                        />
                        <label htmlFor="project-number">Project Number:</label>
                        <input
                            type="text"
                            id="project-number"
                            placeholder="f.ex: (K123456/2021)"
                        />
                        <label htmlFor="artist-name">Artist Name</label>
                        <input
                            type="text"
                            id="artist-name"
                            placeholder="Artist Name"
                        />
                        <label htmlFor="project-start">Project Start:</label>
                        <input
                            type="date"
                            id="project-start"
                            placeholder="Project Start"
                        />
                        <label htmlFor="project-end">Project End:</label>
                        <input
                            type="date"
                            id="project-end"
                            placeholder="Project End"
                        />
                        <label htmlFor="project-description">
                            Project Description
                        </label>
                        <textarea
                            id="project-description"
                            name=""
                            placeholder="Project Description"
                        ></textarea>
                    </div>

                    <div className="form-right">
                        <label htmlFor="funding-approved">
                            Do you already have money approved for the Project?
                        </label>
                        <input type="checkbox" id="funding-approved" />

                        <label htmlFor="funding-sum">Sum Approved Funding</label>
                        <input
                            type="number"
                            id="funding-sum"
                            placeholder="10.000,00"
                            min="0.01"
                            step="0.01"
                        />
                        <label htmlFor="funding-program">Name of the Program</label>
                        <input
                            type="text"
                            id="funding-program"
                            placeholder="Funding Program"
                        />
                        <label htmlFor="project-manager">
                            Name of the Project Manager
                        </label>
                        <input
                            type="text"
                            id="project-manager"
                            placeholder="Project Manager"
                        />

                        <button className="submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
