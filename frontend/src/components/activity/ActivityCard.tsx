interface Props {
  activity: any;
}

const actionColor: Record<string, string> = {
  "Project Created": "bg-green-100 text-green-700",
  "Project Updated": "bg-blue-100 text-blue-700",
  "Project Deleted": "bg-red-100 text-red-700",

  "Task Created": "bg-green-100 text-green-700",
  "Task Updated": "bg-blue-100 text-blue-700",
  "Task Deleted": "bg-red-100 text-red-700",

  "Task Assigned": "bg-purple-100 text-purple-700",

  "Task Completed": "bg-emerald-100 text-emerald-700",

  "Task Status Updated": "bg-yellow-100 text-yellow-700",

  "User Registered": "bg-indigo-100 text-indigo-700",
};

export default function ActivityCard({
  activity,
}: Props) {

  return (

    <div className="relative pl-8 pb-8">

      <div className="absolute left-2 top-2 w-3 h-3 rounded-full bg-blue-600" />

      <div className="absolute left-[13px] top-5 w-[2px] h-full bg-gray-300" />

      <div className="bg-white rounded-lg shadow border p-5">

        <div className="flex justify-between items-center">

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              actionColor[activity.action] ??
              "bg-gray-100"
            }`}
          >
            {activity.action}
          </span>

          <span className="text-sm text-gray-500">

            {new Date(
              activity.createdAt
            ).toLocaleString()}

          </span>

        </div>

        <h3 className="font-semibold mt-4">

          {activity.description}

        </h3>

        <div className="mt-4 text-sm text-gray-600 space-y-1">

          <p>

            User :

            <b>

              {" "}

              {activity.user?.name}

            </b>

          </p>

          {activity.project && (

            <p>

              Project :

              <b>

                {" "}

                {activity.project.name}

              </b>

            </p>

          )}

          {activity.task && (

            <p>

              Task :

              <b>

                {" "}

                {activity.task.title}

              </b>

            </p>

          )}

        </div>

      </div>

    </div>

  );

}