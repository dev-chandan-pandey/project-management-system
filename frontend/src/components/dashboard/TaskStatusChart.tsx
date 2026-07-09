"use client";

import {
PieChart,
Pie,
Cell,
ResponsiveContainer,
Tooltip
} from "recharts";

const COLORS=[
"#4ade80",
"#facc15",
"#60a5fa"
];

export default function TaskStatusChart({

data

}:{

data:any[]

}){

return(

<div className="bg-white shadow rounded-lg p-5 h-[350px]">

<h2 className="font-bold mb-5">

Task Status

</h2>

<ResponsiveContainer>

<PieChart>

<Pie

data={data}

dataKey="count"

nameKey="_id"

label

>

{

data.map((_,index)=>(

<Cell
key={index}
fill={COLORS[index%3]}
/>

))

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

)

}