"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface ChartData {
  _id: string;
  count: number;
}

interface Props {
  data: ChartData[];
}

const COLORS = [
  "#6B7280", // Planning
  "#3B82F6", // Active
  "#22C55E", // Completed
  "#EF4444", // Archived
];

export default function ProjectStatusChart({
  data,
}: Props) {
  const total = data.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="rounded-xl border bg-white shadow">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-5">

        <div>

          <h2 className="text-lg font-bold">
            Project Status
          </h2>

          <p className="text-sm text-gray-500">
            Distribution of all projects
          </p>

        </div>

        <div className="text-right">

          <div className="text-3xl font-bold text-indigo-600">
            {total}
          </div>

          <div className="text-sm text-gray-500">
            Total Projects
          </div>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[360px] p-5">

        {total === 0 ? (

          <div className="flex h-full items-center justify-center text-gray-500">

            No project data available

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="count"
                nameKey="_id"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >

                {data.map((_, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                      index %
                      COLORS.length
                      ]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                height={36}
              />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
}