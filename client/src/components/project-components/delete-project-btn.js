import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function DeleteProjectBtn({ userId }) {
    const dispatch = useDispatch();
    // const [currentProject, setCurrentProject] = useState(0);

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
                    // dispatch(deleteOutgoing(clickedItemInTable[0].id));
                    // dispatch(updateProjectFCSumOutgoings(currentProjectId, data.sumFcTotalCosts));
                    // dispatch(updateProjectSumFundingLeft(currentProjectId, data.sumFundingLeft));
                    // dispatch(updateProjectSumTotalCostsPaid(currentProjectId, data.sumTotalCostsPaid));
                    // setUserInputOutgoings({});
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
