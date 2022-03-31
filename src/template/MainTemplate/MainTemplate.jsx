import React from 'react';
import CourseListProvider from '../../context/CourseListProvider';
import styles from './MainTemplate.module.scss';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';

const MainTemplate = () => {
	return (
		<CourseListProvider>
			<div className={styles.wrapper}>
				<Header />
				<Outlet />
			</div>
		</CourseListProvider>
	);
};

export default MainTemplate;
