import { Subject } from "@/types/Subject";

export default async function fetchSubjects(): Promise<Subject[]> {
    const response = await fetch('/api/subjects');
    return await response.json();
}