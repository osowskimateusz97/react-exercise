import React from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from '../../utils/convertTime';
import Button from '../Button/Button';
import styles from './CourseCard.module.scss';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { removeCourse } from '../../features/coursesSlice';
import { useDispatch } from 'react-redux';

const CourseCard = ({
	title,
	duration,
	creationDate,
	description,
	authors,
	id,
}) => {
	const dispatch = useDispatch();

	const handleRemoveCourse = () => {
		dispatch(removeCourse(id));
	};

	return (
		<div className={styles.card}>
			<div className={styles.card__left_side}>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div className={styles.card__right_side}>
				<div className={styles.card__info}>
					<p>
						<b>Authors:</b>
					</p>
					<p>{authors.join(', ')}</p>
				</div>
				<div className={styles.card__info}>
					<p>
						<b>Duration:</b>
					</p>
					<p>{convertTime(duration)}</p>
				</div>
				<div className={styles.card__info}>
					<p>
						<b>Created:</b>
					</p>
					<p>{creationDate}</p>
				</div>
				<div className={styles.editableContainer}>
					<Link to={`/courses/${id}`}>
						<Button buttonText='Show course' />
					</Link>
					<Button className={styles.icon} buttonText={<EditIcon />} />
					<Button
						onClick={handleRemoveCourse}
						className={styles.icon}
						buttonText={<TrashIcon />}
					/>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
