import type { UserType } from "./user"

export type AnswerType = {
    id?: number,
    texto: string,
    atividade: number,
    atividade_titulo: string,
    aluno?: UserType,
    nota: number | null,
    feedback: string | null,
}