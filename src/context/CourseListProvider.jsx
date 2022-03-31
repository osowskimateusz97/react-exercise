import React, { createContext, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { mockedAuthorsList } from '../data/mockedAuthorList';
import { mockedCoursesList } from '../data/mockedCoursesList';
import { getCurrentDate } from '../utils/getCurrentDate';

export const CourseListContext = createContext({
	courseList: [],
	authors: [],
	addNewCourse: () => {},
	addNewAuthor: () => {},
	getCourseById: () => {},
});

export const useCourseList = () => {
	return useContext(CourseListContext);
};

const CourseListProvider = ({ children }) => {
	const navigate = useNavigate();
	const [courseList, setCourseList] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const addNewAuthor = (name) => {
		const id = uuidv4();
		const newAuthor = {
			id,
			name,
		};
		setAuthors([...authors, newAuthor]);
	};

	const addNewCourse = (newCourse) => {
		const id = uuidv4();
		const creationDate = getCurrentDate();
		setCourseList([
			...courseList,
			{
				id,
				creationDate,
				...newCourse,
				authors: newCourse.authors.map((author) => author.id),
			},
		]);
		navigate('/courses');
	};
	const getCourseById = (id) => {
		return courseList.find((course) => course.id === id);
	};
	const findAuthorById = (authorsId) =>
		authorsId.map((authorId) => authors.find((el) => el.id === authorId).name);

	const value = {
		courseList,
		authors,
		addNewAuthor,
		addNewCourse,
		getCourseById,
		findAuthorById,
	};

	return (
		<CourseListContext.Provider value={value}>
			{children}
		</CourseListContext.Provider>
	);
};

export default CourseListProvider;
