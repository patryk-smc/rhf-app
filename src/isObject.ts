const isObject = <T extends object>(value: unknown): value is T => typeof value === 'object'
export default isObject
