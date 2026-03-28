import { http } from "../lib/httpClient";

export const activitiesService = {
    getMyActivities: () =>
        http.get('/me/atividades/').then((data: any) => data),

    createActivity: (activityData: {
        titulo: string,
        turma: string,
        descricao: string,
        data_entrega: Date
    }) =>
        http.post('/atividades/', activityData).then((data: any) => data),
   
}