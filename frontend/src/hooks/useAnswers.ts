import { AnswerService } from "../services/answer.service"

export function useAnswers() {
  const submitAnswer = async (resposta: { texto: string, atividade: number }) => {
    const data = await AnswerService.submitAnswer(resposta)
    return data
  }

  const allAnswersByActivity = async (id: number) => {
    const data = await AnswerService.allAnwersByActivity(id)
    return data
  }

  const editMyAnswer = async ( resposta: { texto: string }, idResposta: number ) => {
    const data = await AnswerService.editMyAnswer(resposta, idResposta)
    return data
  }

  const editAnswer = async ( resposta: { nota: number, feedback: string }, idResposta: number ) => {
    const data = await AnswerService.editAnswer(resposta, idResposta)
    return data
  }

  const myAnwers = async () => {
    const data = await AnswerService.myAnwers()
    return data
  }

  



  return { submitAnswer, allAnswersByActivity, editAnswer, myAnwers, editMyAnswer}
}