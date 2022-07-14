import { useEffect, useState } from 'react';
import { FormNode } from './FormNode';

const FormRender = ({ node }: { node: FormNode }) => {
	const type = node.getType()
	const [value, setValue] = useState(node.getValue())
	const [props, setProps] = useState(node.getProps())
	
	useEffect(() => {
		node.on('node-value-change', () => {
			setValue(node.getValue())
		})
		node.on('node-props-change', () => {
			console.log('node-props-change', node.getProps())
			setProps(node.getProps())
		})
	}, [])
	
	useEffect(() => {
		node.onDataChange(value)
	}, [value])
	
	const passProps = {
		...node.getProps(),
	}
	
	if (node.isInputNode()) {
		passProps.value = value
		passProps.onChange = setValue
	}
	
	switch (type) {
		case 'form':
		case 'form-group':
			return <div className={`${type === 'form-group' ? 'form-group' : ''}`}>
				{node.getChildren().map((child, i) => {
					return <FormRender key={i} node={child}/>
				})}
			</div>
		case 'input': {
			return <Input {...passProps} />
		}
		case 'single-select': {
			return <SingleSelect {...passProps} />
		}
		case 'branch':
			return <Branch children={node.getChildren()} {...props} />
		default:
			return null
	}
}

const Input = ({ value, onChange, label }: {
	value: any,
	label: string,
	onChange: (data: any) => void
}) => {
	return <div>
		<label> {label}</label>
		<input value={value} onChange={e => onChange(e.target.value)}/>
	</div>
}

type Option = {
	label: string
	value: any
}[]
const SingleSelect = ({ value, onChange, label, selection }: {
	value: any,
	label: string,
	onChange: (data: any) => void
	selection: Option
}) => {
	return <div>
		<label> {label}</label>
		<select value={value} onChange={e => onChange(e.target.value)}>
			{
				selection.map(s => <option key={s.value} value={s.value}>{s.label}</option>)
			}
		</select>
	</div>
}

const Branch = ({ children, active }: {
	children: FormNode[],
	active: number
}) => {
	return <FormRender key={active} node={children[active || 0]}/>
}

export default FormRender