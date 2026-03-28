import type { ActivityType } from '../@types/activties'
import { activitiesService } from '../services/activities.service'

export function useActivities() {
    
  const getMyActivities = async (): Promise<ActivityType[]> => {
    const data = await activitiesService.getMyActivities()
    return data
  }

  const createActivity = async (activityData: {
    titulo: string,
    turma: string,
    descricao: string,
    data_entrega: Date
  }) => {
    const data = await activitiesService.createActivity(activityData)
    return data
  }

  

  return { getMyActivities, createActivity, }
}