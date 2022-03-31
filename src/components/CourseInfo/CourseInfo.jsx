import React, { useEffect, useState } from 'react';
import { useCourseList } from '../../context/CourseListProvider';
import { convertTime } from '../../utils/convertTime';
import Loader from '../Loader/Loader';
import styles from './CourseInfo.module.scss';

const CourseInfo = ({ courseId }) => {
	const [course, setCourse] = useState(null);
	const { getCourseById, findAuthorById } = useCourseList();

	useEffect(() => {
		const course = getCourseById(courseId);
		setCourse(course);
	}, [courseId, getCourseById]);
	if (!course) return <Loader />;
	const { title, description, duration, id, creationDate, authors } = course;
	const findedAuthors = findAuthorById(authors);
	return (
		<>
			<h1>{title}</h1>
			<div className={styles.wrapper}>
				<div>
					<p>{description}</p>
				</div>
				<div>
					<div>
						<p>
							<b>ID:</b> {id}
						</p>
					</div>
					<div>
						<p>
							<b>Duration:</b> {convertTime(duration)}
						</p>
					</div>
					<div>
						<p>
							<b>Created:</b> {creationDate}
						</p>
					</div>
					<div>
						<div>
							<p>
								<b>Authors:</b>
							</p>
							{findedAuthors.map((author) => (
								<p key={author}>{author}</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseInfo;
