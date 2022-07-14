type Hander = (data: any) => void

export class Emiter {
	private callbacks: Map<string, Hander[]> = new Map()
	
	getTopic(topic: string) {
		if (!this.callbacks.get(topic)) {
			this.callbacks.set(topic, [])
		}
		return this.callbacks.get(topic)!
	}
	
	on(topic: string, callback: Hander) {
		const cbs = this.getTopic(topic)
		cbs.push((callback))
		// subscribe
		return () => {
			this.callbacks.set(topic, this.getTopic(topic).filter(i => i !== callback))
		}
	}
	
	emit(topic: string, data?: any) {
		this.getTopic(topic).forEach(cb => {
			cb(data)
		})
	}
}