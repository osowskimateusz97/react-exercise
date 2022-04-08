import React from 'react';
import useCreateCourse from '../../hook/useCreateCourse';
import * as constant from '../../utils/constants';
import { convertTime } from '../../utils/convertTime';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import styles from './CourseCreator.module.scss';

const CourseCreator = () => {
	const {
		authors,
		isAuthorsLoading,
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
					placeholderText={constant.bTitle}
					name={constant.title}
					id={constant.title}
					labelText={constant.bTitle}
				/>
				<Button buttonText={constant.bCreateCourse} onClick={submitNewCourse} />
			</div>
			<Input
				placeholderText={constant.bEnterDescription}
				id={constant.description}
				name={constant.description}
				labelText={constant.bDescription}
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
							placeholderText={constant.bEnterAuthorName}
							id={constant.authorName}
							labelText={constant.bAuthorName}
							name={constant.authorName}
							onChange={(e) => setNewAuthorName(e.target.value)}
							value={newAuthorName}
						/>
						<Button
							buttonText={constant.bCreateAuthor}
							variant={constant.purple}
							onClick={handleAddNewAuthor}
						/>
					</div>
					<div>
						<h1>Duration</h1>
						<Input
							placeholderText={constant.bDurationInMinutes}
							id={constant.duration}
							name={constant.duration}
							labelText={constant.bDuration}
							onChange={handleChange}
							value={newCourseDetails.duration}
						/>
					</div>
				</div>
				<div className='right-side'>
					<div>
						<h1>Authors</h1>
						{isAuthorsLoading ? (
							<Loader />
						) : (
							authors
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
											buttonText={constant.bAddAuthor}
											onClick={() => addAuthorToTheCourse(author)}
										/>
									</div>
								))
						)}
					</div>
					<div>
						<h1>Course authors</h1>
						{newCourseDetails.authors.length ? (
							newCourseDetails.authors.map((author) => (
								<div key={author.id} className={styles.authorElement}>
									<p>{author.name}</p>
									<Button
										buttonText={constant.bRemoveAuthor}
										variant={constant.purple}
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

export default CourseCreator;
