import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { Article } from '../../shared/models/Article.model';
import { useAppDispatch } from '../../store';
import { createArticle } from '../../store/features/articles/articlesThunks';

interface FormState {
	title: string;
	content: string;
	author: string;
	image: string;
	[key: string]: string;
}

const CreateArticle = () => {
	const navigate = useNavigate();
	const [formState, setFormState] = useState<FormState>({
		title: '',
		content: '',
		author: '',
		image: 'default-image.jpeg',
	});
	const [errors, setErrors] = useState<{ [key: string]: { id: string; message: string }[] }>(() => ({
		title: [],
		content: [],
		author: [],
	}));
	const [formValid, setFormValid] = useState(false);
	const isInitialRender = useRef(true);
	const dispatch = useAppDispatch();
	useEffect(() => {
		let isValid = true;
		if (isInitialRender.current) {
			isInitialRender.current = false;
			return;
		}
		for (const key in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, key)) {
				const fieldErrors = errors[key];
				if (fieldErrors.length) {
					isValid = false;
					break;
				}
			}
		}
		setFormValid(isValid);
	}, [errors]);

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
				validateFormInputs(key, formState[key]);
			}
		}
	};

	const validateFormInputs = (name: string, value: string) => {
		switch (name) {
			case 'title':
				commonValidation(name, value);
				let extraErrors: { id: string; message: string }[] = [];
				const alphaNumeric = RegExp(/^[a-z\d\-_\s]+$/i);
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

		// validate on change
		// validateFormInputs(e.target.name, e.target.value);
	};
	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		validateFormInputs(e.target.name, e.target.value);
	};

	const handleCancel = () => {
		navigate('/home');
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (formValid) {
			dispatch(createArticle(new Article({ ...formState })));
			navigate('/home');
		} else {
			console.log("form isn't valid");
		}
	};
	const onClickSubmitButton = () => {
		validateForm();
	};
	return (
		<div className='container p-5 ArticleForm'>
			<form onSubmit={handleSubmit}>
				<h1 className='mb-3'>Create a new Article:</h1>
				<Input
					errors={errors['title']}
					type='input'
					onChange={handleChange}
					defaultValue={formState.title}
					name='title'
					onBlur={handleBlur}
					placeholder='Write your article title here'
				/>
				<Input
					errors={errors['content']}
					type='textarea'
					onChange={handleChange}
					defaultValue={formState.content}
					name='content'
					onBlur={handleBlur}
					placeholder='Write your article content here'
				/>
				<Input
					errors={errors['author']}
					type='input'
					onChange={handleChange}
					defaultValue={formState.author}
					name='author'
					onBlur={handleBlur}
					placeholder='Write the article author name here'
				/>
				<button disabled={!formValid} type='submit' className='btn btn-primary'>
					<span onClick={onClickSubmitButton}>Create</span>
				</button>
				<button onClick={handleCancel} type='button' className='btn btn-dark'>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default CreateArticle;
