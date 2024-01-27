import React, {useState, useEffect} from "react";

const Projects = () => {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fecthData = async () => {
            //get project_index endpoint
            try{
                const response = await fecthData('/project_index');
                if(!response.ok){
                    throw new Error('Failed to fecth about me data');
                }
                const data = await response.json();
                setProjects(data);
            }catch(error){
                console.log("Error fetching about me data: ", error);
            }
        };
        //call asynchronous function
        fecthData();
    }, []);

    if(!projects){
        //if projects is false or null
        return <div>Loading ...</div>
    }
    //if projects is not null
    return (
        <div>
            <h1> {projects.title}</h1>
            <p>{projects.description}</p>
            <img src="{{image.image.url}}" alt="{{image.project.title}} image" />
        </div>
    );
};

export default Projects;