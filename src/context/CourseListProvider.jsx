import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserInfo } from '../features/authSlice';
import { useGetAuthorsQuery } from '../services/authors';
import { useGetCoursesQuery } from '../services/courses';

export const CourseListContext = createContext({
  courseList: [],
  authors: [],
  getCourseById: () => {},
  findAuthorById: () => {},
});

export const useCourseList = () => {
  return useContext(CourseListContext);
};

const CourseListProvider = ({ children }) => {
  const user = useSelector(getUserInfo);
  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useGetAuthorsQuery();
  const {
    data: courses,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useGetCoursesQuery();
  const getCourseById = (id) => courses.find((course) => course.id === id);
  const findAuthorById = (authorsId) =>
    authorsId.map((authorId) => authors.find((el) => el.id === authorId).name);

  const value = {
    courses,
    isCoursesLoading,
    isCoursesError,
    authors,
    isAuthorsLoading,
    isAuthorsError,
    getCourseById,
    findAuthorById,
  };
  return (
    <CourseListContext.Provider value={value}>
      {user.id ? <>{children}</> : <Navigate to='/login' />}
    </CourseListContext.Provider>
  );
};

export default CourseListProvider;
