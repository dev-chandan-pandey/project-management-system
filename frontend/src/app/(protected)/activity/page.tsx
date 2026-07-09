"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import ActivityTimeline from "@/components/activity/ActivityTimeline";

export default function ActivityPage(){

const[activities,setActivities]=

useState<any[]>([]);

const[loading,setLoading]=

useState(true);

const loadActivities=async()=>{

try{

const res=

await api.get("/activities");

setActivities(

res.data.data.activities

);

}

finally{

setLoading(false);

}

}

useEffect(()=>{

loadActivities();

},[]);

if(loading){

return(

<div className="p-10">

Loading...

</div>

)

}

return(

<div>

<div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold">

Activity Timeline

</h1>

<button

onClick={loadActivities}

className="bg-blue-600 text-white px-4 py-2 rounded"

>

Refresh

</button>

</div>

<ActivityTimeline

activities={activities}

/>

</div>

)

}