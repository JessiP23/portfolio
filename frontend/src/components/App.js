import React, {useState, useEffect} from "react";
const Projects = () => {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fecthData = async () => {
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
        fecthData();
    }, []);

    if(!projects){
        return <div>Loading ...</div>
    }

    return (
        <div>
            <h1> {projects.title}</h1>
            <p>{projects.description}</p>
            <img src="{{image.image.url}}" alt="{{image.project.title}} image" />
        </div>
    );
};

export default Projects;