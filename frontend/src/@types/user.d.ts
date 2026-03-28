export type UserType = {
    id: number;
    username: string;
    email: string;
    role: "PROFESSOR" | "ALUNO";
    turma?: string;
}