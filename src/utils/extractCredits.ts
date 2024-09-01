export default function extractCredits(credits: string): number {
    const match = credits.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }