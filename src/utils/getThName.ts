export default async function getThName(engName: string): Promise<string> {
    try {
      const response = await fetch('/api/groups');
      const groups = await response.json();
      const group = groups.find((g: { title: string }) => g.title === engName);

      return group ? group.thName : "not found";
    } catch (error) {
      console.error('Error fetching group data:', error);
      return "not found";
    }
  }