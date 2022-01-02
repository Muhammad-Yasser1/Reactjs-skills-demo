interface State {
	[key: string]: string;
}

interface Errors {
	[key: string]: { id: string; message: string }[];
}
export const initFormErrorsFromState = (state: State) => {
	let errors: Errors = {};
	for (const key in state) {
		if (Object.prototype.hasOwnProperty.call(state, key)) {
			errors[key] = [];
		}
	}
	return errors;
};
