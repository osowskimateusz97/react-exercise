import React from 'react';
import useCreateCourse from '../../hook/useCreateCourse';
import {
	authorName,
	bAddAuthor,
	bAuthorName,
	bCreateAuthor,
	bCreateCourse,
	bDescription,
	bDuration,
	bDurationInMinutes,
	bEnterAuthorName,
	bEnterDescription,
	bRemoveAuthor,
	bTitle,
	description,
	duration,
	purple,
	title,
} from '../../utils/constants';
import { convertTime } from '../../utils/convertTime';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './CreateCourse.module.scss';

const CreateCourse = () => {
	const {
		authors,
		removeAuthorToTheCourse,
		addAuthorToTheCourse,
		submitNewCourse,
		handleAddNewAuthor,
		newCourseDetails,
		setNewCourseDetails,
		newAuthorName,
		setNewAuthorName,
	} = useCreateCourse();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setNewCourseDetails({ ...newCourseDetails, [name]: value });
	};

	return (
		<section className={styles.wrapper}>
			<div className={styles.wrapper__title}>
				<Input
					onChange={handleChange}
					value={newCourseDetails.title}
					placeholderText={bTitle}
					name={title}
					id={title}
					labelText={bTitle}
				/>
				<Button buttonText={bCreateCourse} onClick={submitNewCourse} />
			</div>
			<Input
				placeholderText={bEnterDescription}
				id={description}
				name={description}
				labelText={bDescription}
				tag='textarea'
				classContainer={styles.description}
				onChange={handleChange}
				value={newCourseDetails.description}
			/>
			<div className={styles.detailsContainer}>
				<div className='left-side'>
					<div className={styles.authorContainer}>
						<h1>Add author</h1>
						<Input
							placeholderText={bEnterAuthorName}
							id={authorName}
							labelText={bAuthorName}
							name={authorName}
							onChange={(e) => setNewAuthorName(e.target.value)}
							value={newAuthorName}
						/>
						<Button
							buttonText={bCreateAuthor}
							variant={purple}
							onClick={handleAddNewAuthor}
						/>
					</div>
					<div>
						<h1>Duration</h1>
						<Input
							placeholderText={bDurationInMinutes}
							id={duration}
							name={duration}
							labelText={bDuration}
							onChange={handleChange}
							value={newCourseDetails.duration}
						/>
					</div>
				</div>
				<div className='right-side'>
					<div>
						<h1>Authors</h1>
						{authors
							.filter(
								(author) =>
									!newCourseDetails.authors.find(
										(occupiedAuthor) => occupiedAuthor.name === author.name
									)
							)
							.map((author) => (
								<div key={author.id} className={styles.authorElement}>
									<p>{author.name}</p>
									<Button
										buttonText={bAddAuthor}
										onClick={() => addAuthorToTheCourse(author)}
									/>
								</div>
							))}
					</div>
					<div>
						<h1>Course authors</h1>
						{newCourseDetails.authors.length ? (
							newCourseDetails.authors.map((author) => (
								<div key={author.id} className={styles.authorElement}>
									<p>{author.name}</p>
									<Button
										buttonText={bRemoveAuthor}
										variant={purple}
										onClick={() => removeAuthorToTheCourse(author)}
									/>
								</div>
							))
						) : (
							<p>Author list is empty</p>
						)}
					</div>
				</div>
			</div>
			<div className='total'>
				Duration: <b>{convertTime(newCourseDetails.duration)}</b> hours
			</div>
		</section>
	);
};

export default CreateCourse;
