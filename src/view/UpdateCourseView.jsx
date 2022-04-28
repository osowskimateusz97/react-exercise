import React from 'react';
import { useAuth } from '../hook/useAuth';
import { Navigate, useParams } from 'react-router-dom';
import CourseForm from '../components/CourseForm/CourseForm';
import { useUpdateCourseMutation } from '../services/courses';
import * as constant from '../utils/constants';
import { useCourseList } from '../context/CourseListProvider';

const UpdateCourseView = () => {
  const { getCourseById } = useCourseList();
  let { courseId } = useParams();
  const { isAdmin } = useAuth();

  const courseDetails = getCourseById(courseId);
  const [updateCourse, { isSuccess }] = useUpdateCourseMutation();

  const handleUpdateCourse = async (payload) => {
    try {
      await updateCourse({ id: courseId, payload }).unwrap();
    } catch (err) {
      alert('Problem with updating course!');
    }
  };
  if (!isAdmin) return <Navigate to='/courses' />;

  return (
    <CourseForm
      courseDetails={courseDetails}
      saveBtnTitle={isSuccess ? constant.update : constant.updateCourse}
      handleSave={handleUpdateCourse}
    />
  );
};

export default UpdateCourseView;
