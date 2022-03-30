import { useState } from 'react';
import Header from './components/Header/Header';
import styles from './App.module.scss';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseListProvider from './context/CourseListProvider';

function App() {
	const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

	const openCreator = () => setIsCreateCourseOpen(true);
	const closeCreator = () => setIsCreateCourseOpen(false);

	return (
		<div className={styles.wrapper}>
			<Header closeCreator={closeCreator} />
			<CourseListProvider>
				{isCreateCourseOpen ? (
					<CreateCourse closeCreator={closeCreator} />
				) : (
					<Courses openCreator={openCreator} />
				)}
			</CourseListProvider>
		</div>
	);
}

export default App;
