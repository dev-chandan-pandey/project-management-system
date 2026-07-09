interface Props {
  users: any[];
}

export default function TeamTable({
  users,
}: Props) {
  return (
    <div className="hidden lg:block overflow-x-auto bg-white rounded-lg shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-left p-4">
              Role
            </th>

            <th className="text-left p-4">
              Projects
            </th>

            <th className="text-left p-4">
              Tasks
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t"
            >
              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                {user.role}
              </td>

              <td className="p-4">
                {user.assignedProjects?.length || 0}
              </td>

              <td className="p-4">
                {user.assignedTasks?.length || 0}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}