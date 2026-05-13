import { useState } from "react"
import { AROUND } from "./constants"

export function useCards() {
	const [cardState, setCardState] = useState(0)
	const flipOne = (index: number) => setCardState((prev) => prev ^ (1 << index))
	const flipAround = (index: number) =>
		setCardState((prev) => prev ^ AROUND[index])

	return { flipOne, flipAround, cardState, setCardState }
}
