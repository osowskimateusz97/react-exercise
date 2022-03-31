import React from 'react';
import CourseListProvider from '../../context/CourseListProvider';
import styles from './MainTemplate.module.scss';
import Header from '../../components/Header/Header';

const MainTemplate = ({ children }) => {
	return (
		<CourseListProvider>
			<div className={styles.wrapper}>
				<Header />
				{children}
			</div>
		</CourseListProvider>
	);
};

export default MainTemplate;
