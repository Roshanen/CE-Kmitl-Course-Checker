import { GroupSummary } from "@/types/GroupSummary";
import getGroupClass from "@/utils/getGroupClass";
import getThName from "@/utils/getThName";

type GroupSummaryDisplayProps = {
    groupSummary: GroupSummary;
    totalCredits: number;
  };
  
  export default function GroupSummaryDisplay({ groupSummary, totalCredits }: GroupSummaryDisplayProps) {
    return (
      <div className='mb-4'>
        {Object.keys(groupSummary).map((group, index) => (
          <div key={index} className='pl-4'>
            <strong>({group}) </strong>
            <strong>{groupSummary[group].thaiName}: </strong>
            <span className={`${getGroupClass(group)}`}>
              {groupSummary[group].credits} credits
            </span>
          </div>
        ))}
        <div>
          <strong>Total Credits:</strong> {totalCredits} credits
        </div>
      </div>
    );
  }
  