import {  GraduationCap, PlusCircle } from "lucide-react";
import { Button } from "../../components/ui/my-button";
import CourseCard from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useActivities } from "../../hooks/useActivities";
import { useMemo, useState } from "react";
import type {  ActivityType } from "../../@types/activties";


export function Activities() {

  const {getMyActivities} = useActivities()
  const [data, setData] = useState<ActivityType[]>([])
  async function getActivites() {
    const resp = await getMyActivities()
    setData(resp)
  }

  useMemo(() => {
    getActivites()
  }, [])
  
  const navigate = useNavigate()
  function newActivite(){
      navigate('/auth/new-activity')
  }

  function detailsActivity(activity: ActivityType){
    navigate(`/auth/details-activity`, { state: { atividade: activity } })
  }
  
  return (
    <section className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold">Area de trabalho</h2>
        <p className="text-gray-500">Acompanhe e gerencie suas atividades.</p>
        </div>
        <Button
          icon={< PlusCircle/>}
          onClick={newActivite}
        >
          Nova atividade
        </Button>
      </div>

      <div className="flex flex-wrap gap-8">
       {  data.length > 0 && (
          <CourseCard 
            handleclick={() => detailsActivity(data[0])}
            data={data[0]}
            isFull={true}  
          />
       )

       }

        <div className="bg-blue-500 p-6 rounded-lg h-fit shadow-md flex flex-col gap-4 text-white">
          <GraduationCap size={24} />
          <h3 className="text-xl font-semibold">{data.length} Atividades</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 my-10">
        {data.length > 1 && (
          data.slice(1, data.length).map((e, index)=>(
            <CourseCard 
              key={index}
              handleclick={() => detailsActivity(e)}
              data={e}
              isFull={false}  
            />
          )
        ))}
      </div>
    </section>
  )
}