export type TFunction<T = [], RT = void> = T extends unknown[]
	? (...params: T) => RT // multiple params
	: T extends true | false
	? (param: boolean) => RT // boolean param
	: (param: T) => RT
