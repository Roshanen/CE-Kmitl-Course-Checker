import { Subject } from "@/types/Subject";

export default function createUnknownSubject(subject_id: string): Subject {
    if (subject_id.startsWith("90")) {
      return {
        subject_id,
        group: "General Education Group",
        thName: "วิชาเลือกศึกษาทั่วไป",
        engName: "General Education",
        credits: "3 (3-0-6)",
      };
    } else {
      return {
        subject_id,
        group: "Free Electives",
        thName: "Unknown",
        engName: "Unknown",
        credits: "0 (0-0-0)",
      };
    }
  }