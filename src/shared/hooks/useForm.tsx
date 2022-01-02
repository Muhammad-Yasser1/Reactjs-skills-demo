import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from 'reapop';
import { useAppDispatch, useAppSelector } from '../../store';
import { createArticle, deleteArticle, editArticle, fetchArticle } from '../../store/features/articles/articlesActions';
import { initFormErrorsFromState } from '../helpers/initFormErrors';
import { IArticleToStore } from '../interfaces/Article.interface';
import { FormState } from '../interfaces/ArticleFormState.interface';
import { Article } from '../models/Article.model';

const useForm = (configs: { formState: FormState; validateOn: 'submitAndBlur' | 'change'; isNewArticle: boolean }) => {
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useAppDispatch();
	const isInitialRender = useRef(true);
	const currentArticle = useAppSelector((state) => state.articlesReducer.currentArticle) as IArticleToStore;
	const [formState, setFormState] = useState(() => configs.formState);
	const [errors, setErrors] = useState(() => initFormErrorsFromState(formState));
	const [formValid, setFormValid] = useState(!configs.isNewArticle); // because if you are in edit page then the article was validated before

	useEffect(() => {
		if (!configs.isNewArticle) {
			dispatch(fetchArticle(params.id as string));
		}
	}, [configs.isNewArticle, dispatch, params.id]);

	useEffect(() => {
		if (!configs.isNewArticle) {
			const { title, content, author, image } = currentArticle;
			setFormState({
				title,
				content,
				author,
				image,
			});
		}
	}, [currentArticle, configs.isNewArticle]);

	useEffect(() => {
		let isValid = true;
		if (isInitialRender.current) {
			isInitialRender.current = false;
			return;
		}
		for (const key in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, key)) {
				const fieldErrors = errors[key];
				if (fieldErrors.length || !formState[key].length) {
					isValid = false;
					break;
				}
			}
		}
		setFormValid(isValid);
	}, [errors, formState]);

	const commonValidation = (name: string, value: string) => {
		let fieldErrors: { id: string; message: string }[] = [];
		if (!value) {
			fieldErrors.push({ id: 'required', message: `${name} field is required` });
		}
		if (value.length < 5) {
			fieldErrors.push({ id: 'minLength', message: `${name} field must be 5 characters length at least` });
		}
		setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
	};

	const validateForm = () => {
		for (const key in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, key)) {
				validateFormInput(key, formState[key]);
			}
		}
	};

	const validateFormInput = (name: string, value: string) => {
		switch (name) {
			case 'title':
				commonValidation(name, value);
				// additional validation
				let extraErrors: { id: string; message: string }[] = [];
				const alphaNumeric = RegExp(/^[a-z\d\-_.\s]+$/i);
				if (!alphaNumeric.test(value)) {
					extraErrors.push({
						id: 'alphaNumeric',
						message: `${name} field must have alpha-numeric characters only`,
					});
				}
				setErrors((prev) => ({ ...prev, [name]: [...prev[name], ...extraErrors] }));
				break;
			case 'content':
				commonValidation(name, value);
				break;
			case 'author':
				commonValidation(name, value);
				break;
			default:
				break;
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

		if (configs.validateOn === 'change') {
			validateFormInput(e.target.name, e.target.value);
		}
	};
	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (configs.validateOn === 'submitAndBlur') {
			validateFormInput(e.target.name, e.target.value);
		}
	};
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		// will be executed only the form is valid
		e.preventDefault();
		if (formValid) {
			if (configs.isNewArticle) {
				dispatch(createArticle(new Article({ ...formState })));
			} else {
				dispatch(
					editArticle({
						id: currentArticle?.id,
						newArticle: new Article({ ...formState, created_at: currentArticle?.created_at }),
					})
				);
			}
			setTimeout(() => {
				navigate('/home');
			}, 100);
		} else {
			dispatch(notify('Please fix the fields errors'));
		}
	};
	const onClickSubmitButton = () => {
		// will be executed on trying to click the submit button whether it is enabled or disabled
		validateForm();
	};
	const handleCancel = () => {
		navigate('/home');
	};
	const handleDelete = () => {
		dispatch(deleteArticle(currentArticle));
		setTimeout(() => {
			navigate('/home');
		}, 100);
	};
	return [
		formState,
		handleChange,
		handleBlur,
		handleSubmit,
		handleDelete,
		handleCancel,
		onClickSubmitButton,
		errors,
		formValid,
	] as const;
};

export default useForm;
