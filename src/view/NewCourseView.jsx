import React from 'react';
import CreateCourse from '../components/CreateCourse/CreateCourse';
import MainTemplate from '../template/MainTemplate/MainTemplate';

const NewCourseView = () => {
	return (
		<MainTemplate>
			<CreateCourse />
		</MainTemplate>
	);
};

export default NewCourseView;
