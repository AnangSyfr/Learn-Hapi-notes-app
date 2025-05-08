export interface INotes {
    id: string;
    title: string;
    tags: string;
    body: string;
    createdAt: string;
    updatedAt: string;
}
const notes: INotes[] = [];
export default notes;
