import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/Card";
import { useActivities } from "../../hooks/useActivities";
import type { ActivityType } from "../../@types/activties";
import { useMemo, useState } from "react";

export function MyAtivities() {

    const navigate = useNavigate()

    const { getMyActivities } = useActivities()
    const [data, setData] = useState<ActivityType[]>([])
    async function getActivites() {
        const resp = await getMyActivities()
        setData(resp)
    }

    useMemo(() => {
        getActivites()
    }, [])

    function ToAnswers(data: ActivityType) {
        navigate(`/auth/answers/`, { state: { atividade: data } })
    }
    return (
        <section className="p-8">

            <div className="mb-4">
                {data.length > 0 && (
                    <CourseCard
                        handleclick={() => ToAnswers(data[0])}
                        data={data[0]}
                        isFull={true}
                    />
                )}
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {data.length > 1 && data.slice(1).map((activity) => (
                    <CourseCard
                        key={activity.id}
                        handleclick={() => ToAnswers(activity)}
                        data={activity}
                    />
                ))}
            </div>
        </section>
    )
}