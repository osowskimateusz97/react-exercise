import './App.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import CoursesView from './view/CoursesView';
import RegistrationView from './view/RegistrationView';
import LoginView from './view/LoginView';
import { useAuth } from './hook/useAuth';
import NewCourseView from './view/NewCourseView';
import CourseInfoView from './view/CourseInfoView';

function App() {
	const auth = useAuth();
	return (
		<Routes>
			<Route path='/login' element={<LoginView />} />
			<Route path='/registration' element={<RegistrationView />} />
			<Route path='/courses' element={<CoursesView />} />
			<Route path='/courses/add' element={<NewCourseView />} />
			<Route path='/courses/:courseId' element={<CourseInfoView />} />
			<Route
				path='/'
				element={
					auth.user ? (
						<Navigate to='/courses' />
					) : (
						<Navigate to='/registration' />
					)
				}
			></Route>
		</Routes>
	);
}

export default App;
