import React from 'react';
import { convertTime } from '../../utils/convertTime';
import Button from '../Button/Button';
import styles from './CourseCard.module.scss';

const CourseCard = ({
	title,
	duration,
	creationDate,
	description,
	authors,
}) => {
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
				<Button buttonText='Show course' />
			</div>
		</div>
	);
};

export default CourseCard;
