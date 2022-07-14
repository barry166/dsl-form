import { FormDSL } from './dsl-type';
import { Form } from './form/Form';

const formConfig: FormDSL = {
	type: 'form',
	children: [
		{
			type: 'form-group',
			children: [
				{
					type: 'input',
					path: ['basic', 'username'],
					props: {
						label: '用户名'
					}
				},
				{
					type: 'single-select',
					path: ['basic', 'sex'],
					props: {
						label: '性别',
						selection: [
							{ value: 'male', label: '男' },
							{ value: 'female', label: '女' },
						]
					}
				},
			]
		},
		{
			type: 'form-group',
			children: [
				{
					type: 'input',
					path: ['product', 'detail'],
					props: {
						label: '细节'
					}
				},
				{
					type: 'branch',
					name: 'branch-1',
					hooks: {
						onDataChange: (path, value, context: Form) => {
							if (path === 'basic.sex') {
								const node = context.findByName('branch-1')
								node?.setProps((props: any) => {
									return {
										...props,
										active: value === 'male' ? 0 : 1
									}
								})
							}
						}
					},
					children: [
						{
							type: 'single-select',
							path: ['product', 'color'],
							props: {
								label: '颜色',
								selection: [
									{ value: 'red', label: '红色' },
									{ value: 'blue', label: '蓝色' },
								],
							},
						},
						{
							type: 'single-select',
							path: ['product', 'shape'],
							props: {
								label: '形状',
								selection: [
									{ value: 'box', label: '方形' },
									{ value: 'circle', label: '圆形' },
								],
							},
						},
					]
				}
			]
		}
	]
}

export default formConfig