import * as yup from 'yup';

export const onSubmit = (data: any) => console.log(data);

export const schema = yup
	.object({
		firstName: yup
			.string()
			.required('No first name provided')
			.min(2, 'First name is too short - should be 2 chars minimum.')
			.matches(/[A-Z,А-Я][a-z, а-я]+/, 'Must have a passport form'),

		lastName: yup
			.string()
			.required('No surname provided')
			.min(2, 'First name is too short - should be 2 chars minimum.')
			.matches(/[A-Z,А-Я][a-z, а-я]+/, 'Must have a passport form'),
		email: yup
			.string()
			.email('Email must be a valid email')
			.required('Email is required'),
		password: yup
			.string()
			.required('Password is required')
			.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match'),
	})
	.required();