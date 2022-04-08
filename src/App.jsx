import './App.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationView from './view/RegistrationView';
import LoginView from './view/LoginView';
import { useAuth } from './hook/useAuth';
import CoursesView from './view/CoursesView';
import NewCourseView from './view/NewCourseView';
import CourseDetailsView from './view/CourseDetailsView';
import MainTemplate from './template/MainTemplate/MainTemplate';

function App() {
	const auth = useAuth();
	return (
		<Routes>
			<Route path='/login' element={<LoginView />} />
			<Route path='/registration' element={<RegistrationView />} />
			<Route path='/courses' element={<MainTemplate />}>
				<Route path='' element={<CoursesView />} />
				<Route path='add' element={<NewCourseView />} />
				<Route path=':courseId' element={<CourseDetailsView />} />
			</Route>
			<Route
				path='/'
				element={
					auth.user.name ? (
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
