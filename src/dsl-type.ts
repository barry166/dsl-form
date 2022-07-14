// form dsl配置定义
import { Form } from './form/Form';

export interface FormDSL {
	type: string
	path?: Array<string | number>
	defaultValue?: any
	props?: any
	name?: string
	hooks?: {
		onDataChange?: (path: string, value: any, context: Form) => void
	}
	children?: FormDSL[]
}