import React from 'react';
import { useParams } from 'react-router-dom';
import CourseInfo from '../components/CourseInfo/CourseInfo';

const CourseInfoView = () => {
  let { courseId } = useParams();
  return <CourseInfo courseId={courseId} />;
};

export default CourseInfoView;
