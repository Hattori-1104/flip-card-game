/**
 * a を b に変えるためのマスクの組み合わせを計算する
 * @param a 元の数値 (16bit)
 * @param b 目標の数値 (16bit)
 * @param masks 16個のマスクの配列
 * @returns 使うべきマスクのインデックス配列、不可能な場合は null
 */
export function solveMaskCombination(
	a: number,
	b: number,
	masks: number[],
): number {
	const target = (a ^ b) >>> 0 // 符号なし32bitとして扱う

	// basis[j]: j番目のビットを最上位ビット（MSB）として持つ基底
	const basis: number[] = new Array(16).fill(0)
	// combinedIndices[j]: basis[j] を作るために使用したマスクのビットフラグ
	const combinedIndices: number[] = new Array(16).fill(0)

	// 1. 基底の構築
	for (let i = 0; i < masks.length; i++) {
		let current = masks[i] >>> 0
		let currentIndices = (1 << i) >>> 0

		for (let j = 15; j >= 0; j--) {
			if (((current >> j) & 1) === 1) {
				if (basis[j] === 0) {
					basis[j] = current
					combinedIndices[j] = currentIndices
					break
				}
				current ^= basis[j]
				currentIndices ^= combinedIndices[j]
			}
		}
	}

	// 2. target を基底の組み合わせで表現できるか確認
	let currentTarget = target
	let resultIndicesFlag = 0

	for (let j = 15; j >= 0; j--) {
		if (((currentTarget >> j) & 1) === 1) {
			if (basis[j] === 0) {
				return 0 // このビットを消せる基底がない＝作成不可能
			}
			currentTarget ^= basis[j]
			resultIndicesFlag ^= combinedIndices[j]
		}
	}

	return resultIndicesFlag
}
