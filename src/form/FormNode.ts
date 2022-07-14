import { FormDSL } from '../dsl-type';
import { Form } from './Form';
import { Emiter } from './Emiter';
import { Collection } from 'immutable';

/**
 * Form节点类
 */
export class FormNode extends Emiter {
	private form: Form
	private children: FormNode[]
	private props: any
	
	constructor(private dsl: FormDSL, form: Form) {
		super()
		this.dsl = dsl
		this.form = form
		this.children = []
		this.props = { ...dsl?.props }
		if (this.dsl.children) {
			this.children = this.dsl.children.map(child => FormNode.from(child, form))
		}
		
		if (this.dsl.hooks?.onDataChange) {
			this.form.on('data-change', ({ path, value }) => {
				this.dsl.hooks?.onDataChange!(path, value, form)
			})
		}
	}
	
	// 节点数据更新
	onDataChange(value: any) {
		if (this.dsl.path) {
			const oldValue = this.form.getDataByPath(this.dsl.path)
			if (oldValue !== value) {
				this.form.onDataChange(this.dsl.path, value)
			}
		}
	}
	
	getValue() {
		if (this.dsl.path) {
			return this.form.getDataByPath(this.dsl.path) || this.dsl.defaultValue
		}
	}
	
	getType() {
		return this.dsl.type
	}
	
	getProps() {
		return this.props
	}
	
	getChildren() {
		return this.children
	}
	
	update(data: Collection<string, any>) {
		if (this.dsl.path) {
			const oldData = this.form.getDataByPath(this.dsl.path)
			const newData = data.getIn(this.dsl.path)
			if (oldData !== newData) {
				this.form.setDataByPath(this.dsl.path, newData)
				this.emit('node-value-change')
			}
		}
		
		this.children.forEach(child => child.update(data))
	}
	
	// 修改组件节点的props
	setProps(setter: (props: any) => any) {
		this.props = setter(this.props)
		this.emit('node-props-change')
	}
	
	isInputNode() {
		return !!this.dsl.path
	}
	
	findByName(name: string): FormNode | null {
		if (this.dsl.name === name) {
			return this
		}
		for (const child of this.children) {
			const item = child.findByName(name)
			if (item) return item
		}
		return null
	}
	
	static from(dsl: FormDSL, form: Form) {
		return new FormNode(dsl, form)
	}
}