export function formatData(data: string) {
    const date = new Date(data)
    if (isNaN(date.getTime())) return data
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}