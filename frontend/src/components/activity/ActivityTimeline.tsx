import ActivityCard from "./ActivityCard";

export default function ActivityTimeline({

    activities

}: {

    activities: any[]

}) {

    return (

        <div>

            {

                activities.map(activity => (

                    <ActivityCard

                        key={activity._id}

                        activity={activity}

                    />

                ))

            }

        </div>

    )

}