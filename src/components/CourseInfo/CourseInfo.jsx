import React, { useEffect } from 'react';
import { useCourseList } from '../../context/CourseListProvider';

const CourseInfo = ({ courseId }) => {
	const { getCourseById } = useCourseList();
	useEffect(() => {
		const course = getCourseById(courseId);
		console.log(getCourseById);
		console.log(course);
		console.log(courseId);
	}, [courseId, getCourseById]);
	return <div>CourseInfo</div>;
};

export default CourseInfo;
