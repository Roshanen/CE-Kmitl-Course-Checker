export default function extractSubjectIdsFromTranscript(transcriptText: string): string[] {
    const regex = /\b\d{8}/g;
    const subject_ids = transcriptText.match(regex) || [""];
    subject_ids.splice(0, 1);
    return subject_ids;
  }