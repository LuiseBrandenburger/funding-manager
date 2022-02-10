import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// FIXME: finish Delet BTN

export default function DeleteProjectBtn({ userId }) {
    const dispatch = useDispatch();

    // ********************* STATE ***************************
    const projects = useSelector((state) => state.projects || {});
    const currentProjectId = useSelector(
        (state) => state.currentProjectId || {}
    );
    let id = currentProjectId;
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


    const deleteProject = ()=> {
        console.log("delete Project", currentProjectId);

        fetch("/delete-project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentProjectId),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.success) {
                    console.log("this worked");

                } else {
                    // setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch /edit-outgoings", err);
                // setError(true);
            });
    };

    return (
        <button className="submit-btn-two" onClick={deleteProject}>
            Delete Project
        </button>
    );
}
