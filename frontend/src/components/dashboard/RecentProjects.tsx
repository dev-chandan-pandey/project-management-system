interface Props{
projects:any[]
}

export default function RecentProjects({
projects
}:Props){

return(

<div className="bg-white rounded-lg shadow p-5">

<h2 className="font-bold mb-4">

Recent Projects

</h2>

<div className="space-y-3">

{

projects.map(project=>(

<div
key={project._id}
className="border rounded p-3">

<h3>

{project.name}

</h3>

<p>

{project.status}

</p>

</div>

))

}

</div>

</div>

)

}