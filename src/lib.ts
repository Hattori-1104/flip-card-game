import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function* range(n: number) {
	for (let i = 0; i < n; i++) {
		yield i
	}
}

export function random16bit() {
	return (Math.random() * 0x10000) | 0
}
