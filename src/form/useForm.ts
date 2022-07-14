import { Form } from './Form';
import { FormDSL } from '../dsl-type';

export const useForm = (dsl: FormDSL, initialValue?: any) => {
	return new Form(dsl, initialValue)
}