import { useState } from 'react';

const useForm = (values) => {
	const [inputValue, setInputValue] = useState(values);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInputValue({ ...inputValue, [name]: value });
	};

	return [inputValue, handleChange];
};

export default useForm;
