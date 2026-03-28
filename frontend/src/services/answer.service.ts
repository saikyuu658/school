import { http } from "../lib/httpClient";

export const AnswerService = {

    allAnwersByActivity: (id: number) =>
        http.get(`/atividades/${id}/respostas/`).then((data: any) => data),

    myAnwers: () =>
        http.get('/me/respostas/').then((data: any) => data),

    submitAnswer: ( resposta: { texto: string, atividade: number }) =>
        http.post(`/respostas/`, resposta).then((data: any) => data),
    
    editAnswer: ( resposta: { nota: number, feedback: string }, idResposta: number) =>
        http.patch(`/respostas/${idResposta}/`, resposta).then((data: any) => data),

    editMyAnswer: ( resposta: { texto: string }, idResposta: number) =>
        http.patch(`/respostas/${idResposta}/`, resposta).then((data: any) => data)
}