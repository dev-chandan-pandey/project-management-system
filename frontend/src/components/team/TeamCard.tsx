interface Props {
  user: any;
}

const roleColor: Record<string, string> = {
  Admin: "bg-red-100 text-red-700",
  "Project Manager": "bg-blue-100 text-blue-700",
  "Team Member": "bg-green-100 text-green-700",
};

export default function TeamCard({ user }: Props) {
  return (
    <div className="bg-white rounded-lg shadow border p-5">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="font-bold text-lg">
            {user.name}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            roleColor[user.role] || "bg-gray-100"
          }`}
        >
          {user.role}
        </span>

      </div>

      <div className="mt-5">

        <p className="font-semibold">
          Assigned Projects
        </p>

        <div className="flex flex-wrap gap-2 mt-2">

          {user.assignedProjects?.length ? (
            user.assignedProjects.map((project: any) => (
              <span
                key={project._id}
                className="bg-blue-50 px-2 py-1 rounded text-sm"
              >
                {project.name}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">
              No Projects
            </span>
          )}

        </div>

      </div>

      <div className="mt-5">

        <p className="font-semibold">
          Assigned Tasks
        </p>

        <div className="space-y-2 mt-2">

          {user.assignedTasks?.length ? (
            user.assignedTasks.map((task: any) => (
              <div
                key={task._id}
                className="border rounded p-2"
              >
                <div className="font-medium">
                  {task.title}
                </div>

                <div className="text-sm text-gray-500">
                  {task.status} • {task.priority}
                </div>
              </div>
            ))
          ) : (
            <span className="text-gray-400 text-sm">
              No Tasks
            </span>
          )}

        </div>

      </div>

    </div>
  );
}