export const loadToken = () => {
	try {
		const token = localStorage.getItem('token');
		const expirationDate = JSON.parse(localStorage.getItem('expirationDate') || '');

		if (token === null || expirationDate < new Date().getTime()) {
			return undefined;
		}
		return token;
	} catch (error) {
		return undefined;
	}
};

export const saveToken = (data: { token: string; expiresIn: string }) => {
	try {
		localStorage.setItem('token', data.token);
		localStorage.setItem('expirationDate', JSON.stringify(new Date().getTime() + +data.expiresIn * 1000));
	} catch (error) {}
};

export const removeToken = () => {
	try {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
	} catch (error) {}
};

const defaultExport = { loadToken, saveToken, removeToken };
export default defaultExport;
