import { Subject } from "@/types/Subject";
import { GroupSummary } from "@/types/GroupSummary";
import createUnknownSubject from "./createUnknownSubject";
import extractCredits from "./extractCredits";
import getThName from "./getThName";

export default function processSubjects(
  transcript: string[],
  subjects: Subject[]
): {
  updatedSubjectsMap: { [key: string]: Subject[] };
  updatedGroupSummary: GroupSummary;
  totalSumCredits: number;
} {
  const subjectsById: { [key: string]: Subject } = {};
  subjects.forEach(subject => {
    subjectsById[subject.subject_id] = subject;
  });

  const updatedSubjectsMap: { [key: string]: Subject[] } = {};
  const updatedGroupSummary: GroupSummary = {};
  let totalSumCredits = 0;

  transcript.forEach(subject_id => {
    let subject = subjectsById[subject_id];

    if (!subject) {
      subject = createUnknownSubject(subject_id);
    }

    if (!updatedSubjectsMap[subject_id]) {
      updatedSubjectsMap[subject_id] = [];
    }
    updatedSubjectsMap[subject_id].push(subject);

    const group = subject.group;
    const credits = extractCredits(subject.credits);
    
    if (!updatedGroupSummary[group]) {
      updatedGroupSummary[group] = {
        thaiName: getThName(group),
        credits: 0,
      };
    }
    
    updatedGroupSummary[group].credits += credits;
    totalSumCredits += credits;
  });

  return { updatedSubjectsMap, updatedGroupSummary, totalSumCredits };
}
