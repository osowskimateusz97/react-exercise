import { useState } from 'react';
import { shema } from '../schema/createCourse';
import { useCourseList } from '../context/CourseListProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCourse } from '../features/coursesSlice';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentDate } from '../utils/getCurrentDate';
import { addAuthor } from '../features/authorsSlice';

const initialState = {
	title: '',
	description: '',
	duration: 0,
	authors: [],
};

const useCreateCourse = () => {
	const dispatch = useDispatch();
	const [newCourseDetails, setNewCourseDetails] = useState(initialState);
	const [newAuthorName, setNewAuthorName] = useState('');
	const navigate = useNavigate();
	const { authors } = useCourseList();

	const isAuthorExist = () =>
		authors.some((author) => author.name === newAuthorName);

	const handleAddNewAuthor = () => {
		if (!newAuthorName.length || isAuthorExist()) return;
		const payload = { name: newAuthorName, id: uuidv4() };
		dispatch(addAuthor(payload));
		setNewAuthorName('');
	};

	const showValidMessage = (err) => {
		const msg = [];
		err.inner.forEach((e) => msg.push(e.message));
		alert(msg.join(', \n'));
	};

	const runValidation = async () => {
		try {
			await shema.validate(newCourseDetails, {
				abortEarly: false,
			});
			return true;
		} catch (err) {
			showValidMessage(err);
			return false;
		}
	};

	const submitNewCourse = async () => {
		const id = uuidv4();
		const creationDate = getCurrentDate();
		const isValid = await runValidation();
		if (!isValid) return;
		dispatch(
			addCourse({
				id,
				creationDate,
				...newCourseDetails,
				authors: newCourseDetails.authors.map((author) => author.id),
			})
		);
		navigate('/courses');
	};

	const addAuthorToTheCourse = (author) => {
		setNewCourseDetails({
			...newCourseDetails,
			authors: [...newCourseDetails.authors, author],
		});
	};

	const removeAuthorToTheCourse = (removingAuthor) => {
		setNewCourseDetails({
			...newCourseDetails,
			authors: newCourseDetails.authors.filter(
				(author) => author.name !== removingAuthor.name
			),
		});
	};

	return {
		removeAuthorToTheCourse,
		addAuthorToTheCourse,
		submitNewCourse,
		handleAddNewAuthor,
		newCourseDetails,
		setNewCourseDetails,
		newAuthorName,
		setNewAuthorName,
		authors,
	};
};

export default useCreateCourse;
