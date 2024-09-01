"use client"
import { useState } from 'react';

import GroupSummaryDisplay from '@/components/GroupSummary';
import SubjectsMapDisplay from '@/components/SubjectsMapDisplay';

import { Subject } from '@/types/Subject';
import { GroupSummary } from '@/types/GroupSummary';

import  readTextFile  from '@/utils/readTextFile';
import  extractSubjectIdsFromTranscript  from '@/utils/extractSubjectIdsFromTranscript';
import  fetchSubjects  from '@/utils/fetchSubjects';
import  processSubjects  from '@/utils/processSubjects';

export default function Display() {
  const [subjectsMap, setSubjectsMap] = useState<{ [key: string]: Subject[] }>({});
  const [groupSummary, setGroupSummary] = useState<GroupSummary>({});
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const handleTranscriptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      let transcriptText = await readTextFile(file);
      
      const transcript = extractSubjectIdsFromTranscript(transcriptText);
      const subjects = await fetchSubjects();
      const { updatedSubjectsMap, updatedGroupSummary, totalSumCredits } = processSubjects(transcript, subjects);

      setSubjectsMap(updatedSubjectsMap);
      setGroupSummary(updatedGroupSummary);
      setTotalCredits(totalSumCredits);
    }
  };

  return (
    <div className='p-4 bg-slate-800'>
      <div className='bg-yellow-400 text-black w-fit'>* GenEd ให้หน่วยกิตเป็น 3 เสมอ</div>
      <div className='bg-red-500 w-fit'>* ไม่ใช่วิชาหลักในเล่ม 2564 ให้หน่วยกิตเป็น 0 เสมอ</div>

      <h2 className='text-lg'>Summary of Credits by Group</h2>
      <GroupSummaryDisplay groupSummary={groupSummary} totalCredits={totalCredits} />

      <h2>Upload Transcript</h2>
      <input type="file" accept=".txt,.pdf" onChange={handleTranscriptUpload} />

      <h2 className='text-lg'>Subjects Map</h2>
      <SubjectsMapDisplay subjectsMap={subjectsMap} />
    </div>
  );
}
