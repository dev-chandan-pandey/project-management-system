interface Props{
    tasks:any[]
}

export default function LatestTasks({tasks}:Props){

return(

<div className="bg-white rounded-lg shadow p-5">

<h2 className="font-bold text-lg mb-4">

Latest Tasks

</h2>

<div className="space-y-3">

{

tasks.map(task=>(

<div
key={task._id}
className="border rounded p-3">

<h3 className="font-semibold">

{task.title}

</h3>

<p>

{task.project?.name}

</p>

<p>

Assigned :

{task.assignedTo?.name}

</p>

<p>

Status :

{task.status}

</p>

</div>

))

}

</div>

</div>

)

}