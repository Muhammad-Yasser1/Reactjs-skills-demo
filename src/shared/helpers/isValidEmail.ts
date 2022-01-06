export const isValidEmail = (value: string) => {
	const regexp = new RegExp(/^\S+@\S+\.\S+$/); // basic
	return regexp.test(value);
};
