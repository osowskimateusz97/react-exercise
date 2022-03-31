import { useState } from 'react';
import { shema } from '../schema/createCourse';
import { useCourseList } from '../context/CourseListProvider';

const initialState = {
	title: '',
	description: '',
	duration: 0,
	authors: [],
};

const useCreateCourse = () => {
	const [newCourseDetails, setNewCourseDetails] = useState(initialState);
	const [newAuthorName, setNewAuthorName] = useState('');
	const { authors, addNewAuthor, addNewCourse } = useCourseList();

	const isAuthorExist = () =>
		authors.some((author) => author.name === newAuthorName);

	const handleAddNewAuthor = () => {
		if (!newAuthorName.length || isAuthorExist()) return;
		addNewAuthor(newAuthorName);
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
		const isValid = await runValidation();
		if (!isValid) return;
		addNewCourse(newCourseDetails);
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
