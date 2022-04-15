import React from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from '../../utils/convertTime';
import Button from '../Button/Button';
import styles from './CourseCard.module.scss';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { useAuth } from '../../hook/useAuth';
import { useDeleteCourseMutation } from '../../services/courses';

const CourseCard = ({
	title,
	duration,
	creationDate,
	description,
	authors,
	id,
}) => {
	const { isAdmin } = useAuth();
	const [deleteCourse] = useDeleteCourseMutation();
	const handleRemoveCourse = async () => {
		try {
			await deleteCourse(id).unwrap();
		} catch (err) {
			alert('Problem with deleting course');
		}
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
					{isAdmin ? (
						<>
							<Link to={`/courses/update/${id}`}>
								<Button className={styles.icon} buttonText={<EditIcon />} />
							</Link>
							<Button
								onClick={handleRemoveCourse}
								className={styles.icon}
								buttonText={<TrashIcon />}
							/>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
