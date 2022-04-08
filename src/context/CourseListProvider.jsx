import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthors } from '../features/authorsSlice';
import { getUserInfo } from '../features/authSlice';
import { getCourses } from '../features/coursesSlice';
import { useGetAuthorsQuery } from '../services/authors';
import { useGetCoursesQuery } from '../services/courses';

export const CourseListContext = createContext({
	courseList: [],
	authors: [],
	getCourseById: () => {},
});

export const useCourseList = () => {
	return useContext(CourseListContext);
};

const CourseListProvider = ({ children }) => {
	const user = useSelector(getUserInfo);
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const { isLoading: isAuthorsLoading, isError: isAuthorsError } =
		useGetAuthorsQuery();
	const { isLoading: isCoursesLoading, isError: isCoursesError } =
		useGetCoursesQuery();
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
			{user.name ? <>{children}</> : <Navigate to='/registration' />}
		</CourseListContext.Provider>
	);
};

export default CourseListProvider;
