import React from 'react'
import ReactDOM from 'react-dom/client'
import formConfig from './form.config';
import { useForm } from './form/useForm';
import FormRender from './form/FormRender';
import './index.css'

const App = () => {
	const form = useForm(formConfig, {
		basic: {
			username: '李四'
		}
	})
	
	return <>
		<FormRender node={form.getRoot()}/>
		<div>
			<button onClick={() => {
				console.log(form.getValue())
			}}>提交
			</button>
			<button onClick={() => {
				form.setValue({
					basic: {
						username: '李四-1'
					}
				})
			}}>重置
			</button>
		</div>
	</>
	
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<App/>
)
