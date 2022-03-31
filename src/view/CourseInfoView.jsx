import React from 'react';
import { useParams } from 'react-router-dom';
import CourseInfo from '../components/CourseInfo/CourseInfo';
import MainTemplate from '../template/MainTemplate/MainTemplate';

const CourseInfoView = () => {
	let { courseId } = useParams();

	return (
		<MainTemplate>
			<CourseInfo courseId={courseId} />
		</MainTemplate>
	);
};

export default CourseInfoView;
