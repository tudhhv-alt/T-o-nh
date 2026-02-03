import { Style, Concept } from './types';
import React from 'react';

const ModernIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);
const AcademicIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const InspirationalIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);
const ClassicIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
const TechIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const ArtisticIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
);


export const STYLES: Style[] = [
  { id: 'modern', name: 'Hiện đại', icon: <ModernIcon className="w-6 h-6" /> },
  { id: 'academic', name: 'Phong cách sexy', icon: <AcademicIcon className="w-6 h-6" /> },
  { id: 'inspirational', name: 'Truyền cảm hứng', icon: <InspirationalIcon className="w-6 h-6" /> },
  { id: 'classic_professor', name: 'Giáo sư cổ điển', icon: <ClassicIcon className="w-6 h-6" /> },
  { id: 'tech_teacher', name: 'Giáo viên công nghệ', icon: <TechIcon className="w-6 h-6" /> },
  { id: 'artistic_educator', name: 'Nghệ sĩ giáo dục', icon: <ArtisticIcon className="w-6 h-6" /> },
];

export const CONCEPTS: Concept[] = [
  { id: 'traditional_classroom', name: 'Giảng dạy tại lớp học truyền thống' },
  { id: 'ted_talk_stage', name: 'Đứng trên sân khấu TED Talk' },
  { id: 'zoom_teaching', name: 'Dạy học qua Zoom (concept online)' },
  { id: 'university_library', name: 'Trong thư viện đại học' },
  { id: 'blackboard_students', name: 'Đứng cạnh bảng đen và học sinh' },
  { id: 'international_teacher', name: 'Phong cách giáo viên quốc tế' },
  { id: 'entrepreneur_teacher', name: 'Giáo viên khởi nghiệp' },
  { id: 'personal_studio', name: 'Studio cá nhân (dạy vẽ, nhạc...)' },
  { id: 'university_lecturer', name: 'Giảng viên đại học' },
  { id: 'international_school', name: 'Dạy học tại trường quốc tế' },
  { id: 'modern_classroom_smartboard', name: 'Lớp học hiện đại với bảng tương tác' },
  { id: 'science_lab', name: 'Phòng thí nghiệm khoa học với trang thiết bị' },
  { id: 'art_classroom', name: 'Lớp học nghệ thuật với giá vẽ và tranh' },
  { id: 'music_room', name: 'Phòng âm nhạc với các loại nhạc cụ' },
  { id: 'seminar_classroom', name: 'Dẫn dắt buổi thảo luận trong lớp học seminar' },
  { id: 'history_classroom', name: 'Lớp học lịch sử với bản đồ và cổ vật' },
  { id: 'literature_classroom', name: 'Lớp học văn học với nhiều sách' },
  { id: 'outdoor_classroom', name: 'Lớp học ngoài trời, trong sân trường' },
  { id: 'coding_bootcamp', name: 'Lớp học lập trình (coding bootcamp)' },
  { id: 'kindergarten_classroom', name: 'Lớp học mầm non đầy màu sắc' },
];