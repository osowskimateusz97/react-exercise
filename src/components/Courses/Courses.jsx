import React, { useContext, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import styles from './Courses.module.scss';
import Button from '../Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import { CourseListContext } from '../../context/CourseListProvider';

const Courses = ({ openCreator }) => {
	const { courseList, findAuthorById } = useContext(CourseListContext);
	const [filteredValue, setFilteredValue] = useState('');

	const setFilterValue = (searchValue) => {
		setFilteredValue(searchValue);
	};
	const filterCourses = (course) => {
		const lowercaseInputValue = filteredValue.toLowerCase();
		if (
			course.title.toLowerCase().includes(lowercaseInputValue) ||
			course.id.toLowerCase().includes(lowercaseInputValue)
		)
			return true;
	};
	return (
		<div>
			<div className={styles.searchWrapper}>
				<SearchBar setFilterValue={setFilterValue} />
				<Button buttonText='Add new course' onClick={openCreator} />
			</div>
			{courseList
				.filter(filterCourses)
				.map(({ id, title, description, creationDate, duration, authors }) => {
					const findedAuthors = findAuthorById(authors);
					return (
						<CourseCard
							title={title}
							description={description}
							creationDate={creationDate}
							duration={duration}
							authors={findedAuthors}
							key={id}
						/>
					);
				})}
		</div>
	);
};

export default Courses;
