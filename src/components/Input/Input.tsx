import { useMemo } from 'react';

interface Props {
	name: string;
	type: 'input' | 'textarea';
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	rows?: number;
	inputType?: string;
	id?: string;
	label?: string;
	placeholder?: string;
	defaultValue?: string;
	customClassName?: string;
	errors: { id: string; message: string }[];
}

const Input = ({
	type = 'input',
	inputType = 'text',
	rows = 10,
	id,
	errors = [],
	name,
	label,
	onChange,
	onBlur = (e) => {},
	onFocus = (e) => {},
	placeholder = '',
	defaultValue = '',
	customClassName = '',
}: Props) => {
	const formattedLabel = useMemo(() => {
		if (!label) {
			const firstLetter = name.charAt(0).toUpperCase();
			const restOfTheWord = name.slice(1);
			return firstLetter + restOfTheWord + ': ';
		} else {
			return label;
		}
	}, [label, name]);

	return (
		<div className='form-group'>
			<label htmlFor={id ?? name}>{formattedLabel}</label>
			{type === 'input' ? (
				<input
					onBlur={onBlur}
					onFocus={onFocus}
					type={inputType}
					className={'form-control ' + customClassName}
					name={name}
					id={id ?? name}
					placeholder={placeholder}
					onChange={onChange}
					defaultValue={defaultValue}
				/>
			) : (
				<textarea
					onBlur={onBlur}
					onFocus={onFocus}
					rows={rows}
					className={'form-control ' + customClassName}
					name={name}
					id={id ?? name}
					placeholder={placeholder}
					onChange={onChange}
					defaultValue={defaultValue}
				/>
			)}
			{errors.map((error) => {
				return (
					<div key={error.id}>
						<small>{error.message}</small>
					</div>
				);
			})}
		</div>
	);
};

export default Input;
