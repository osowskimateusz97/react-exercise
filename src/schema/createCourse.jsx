import * as yup from 'yup';

export let shema = yup.object().shape({
	title: yup.string().required(),
	description: yup.string().min(2),
	// duration: yup.number().required().positive().integer(),
	authors: yup.array().required().min(1),
});
