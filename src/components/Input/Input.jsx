import clsx from 'clsx';
import React from 'react';
import styles from './Input.module.scss';

const Input = ({
	placeholderText,
	value,
	onChange,
	className,
	labelText,
	id,
	name,
	tag,
	classContainer,
	variant,
	type,
}) => {
	const containerStyles = clsx([[styles.wrapper], classContainer]);
	const inputStyles = clsx([styles.input, className, styles[variant]]);
	const Tag = tag || 'input';
	return (
		<div className={containerStyles}>
			{labelText ? <label htmlFor={id}>{labelText}</label> : null}
			<Tag
				id={id}
				name={name}
				className={inputStyles}
				placeholder={placeholderText}
				value={value}
				onChange={onChange}
				type={type}
				autoComplete='off'
			/>
		</div>
	);
};

export default Input;
