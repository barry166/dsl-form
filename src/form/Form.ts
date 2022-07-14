import { Collection, fromJS, Map } from 'immutable'
import { Emiter } from './Emiter';
import { FormDSL } from '../dsl-type';
import { FormNode } from './FormNode';

/**
 * Form类，提供数据聚合操作和表单节点管理
 */
export class Form extends Emiter {
	private data: Map<string, any>
	private root: FormNode
	
	constructor(dsl: FormDSL, initialValue?: any) {
		super()
		this.root = FormNode.from(dsl, this)
		this.data = (fromJS(initialValue) || {}) as Map<string, any>
	}
	
	onDataChange(path: (string | number)[], value: any) {
		this.data = this.data.setIn(path, value)
		this.emit('data-change', {
			path: path.join('.'),
			value
		})
	}
	
	getRoot() {
		return this.root
	}
	
	getDataByPath(path: (string | number)[]) {
		return this.data.getIn(path)
	}
	
	setDataByPath(path: (string | number)[], value: any) {
		this.data = this.data.setIn(path, value)
	}
	
	getValue() {
		return this.data.toJS()
	}
	
	setValue(values: any) {
		const newData = fromJS(values) as Map<string, any>
		// 需要从上到下更新节点的数据并触发事件
		this.root.update(newData)
	}
	
	findByName(name: string): FormNode | null {
		return this.root.findByName(name)
	}
	
}