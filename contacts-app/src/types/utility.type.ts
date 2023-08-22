export type TFunction<T = [], RT = void> = T extends unknown[]
	? (...params: T) => RT
	: T extends true | false
	? (param: boolean) => RT
	: (param: T) => RT
