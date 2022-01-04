interface State {
	[key: string]: string;
}
interface Error {
	id: string;
	message: string;
}
interface Errors {
	[key: string]: Error[];
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
