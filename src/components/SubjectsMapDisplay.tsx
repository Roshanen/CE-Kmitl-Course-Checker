import { Subject } from "@/types/Subject";
import getGroupClass from "@/utils/getGroupClass";

type SubjectsMapDisplayProps = {
  subjectsMap: { [key: string]: Subject[] };
};

export default function SubjectsMapDisplay({ subjectsMap }: SubjectsMapDisplayProps) {
  return (
    <div>
      {Object.keys(subjectsMap).map((subject_id, index) => (
        <div key={index} className="mb-4 p-2 bg-slate-600">
          <h3>{subject_id}</h3>
          {subjectsMap[subject_id].map((subject, courseIndex) => (
            <div
              key={courseIndex}
              className={`pl-4`}
            >
              <strong>Group:</strong> {subject.group} <br />
              <strong>Thai Name:</strong> {subject.thName} <br />
              <strong>English Name:</strong> {subject.engName} <br />
              <strong>Credits:</strong><span className={`${getGroupClass(subject.group)}`}> {subject.credits}</span> 
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
