import React from 'react';
import CourseForm from '../components/CourseForm/CourseForm';
import { useCreateCourseMutation } from '../services/courses';
import { useNavigate } from 'react-router-dom';
import * as constant from '../utils/constants';

const NewCourseView = () => {
	const [createCourse] = useCreateCourseMutation();
	const navigate = useNavigate();

	const addNewCourse = async (newCourseDetails) => {
		try {
			await createCourse(newCourseDetails).unwrap();
			navigate('/courses');
		} catch (err) {
			alert('Problem with adding new course!');
		}
	};

	return (
		<CourseForm
			saveBtnTitle={constant.bCreateCourse}
			handleSave={addNewCourse}
		/>
	);
};

export default NewCourseView;
