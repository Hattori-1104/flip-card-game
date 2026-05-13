import { Flag, Pencil, RotateCcw, Shuffle } from "lucide-react"
import { useEffect, useState } from "react"
import { CardBoard } from "./CardBoard"
import { SquareButton } from "./components/SquareButton"
import { AROUND } from "./constants"
import { random16bit } from "./lib"
import { solveMaskCombination } from "./solve"
import { useCards } from "./useCards"

export default () => {
	const goalCards = useCards()
	const playerCards = useCards()
	const [mode, setMode] = useState<"playing" | "editing">("playing")
	const [showAnswer, setShowAnswer] = useState(false)
	const answerMasks = showAnswer
		? solveMaskCombination(playerCards.cardState, goalCards.cardState, AROUND)
		: 0

	useEffect(() => {
		playerCards.setCardState(random16bit())
		goalCards.setCardState(random16bit())
	}, [playerCards.setCardState, goalCards.setCardState])

	useEffect(() => {
		if (playerCards.cardState === goalCards.cardState) setShowAnswer(false)
	}, [playerCards.cardState, goalCards.cardState])

	return (
		<main className="absolute flex flex-col gap-12 justify-center items-center h-svh w-screen bg-stone-100 text-stone-700">
			<div className="flex flex-col gap-6 transition-transform">
				<div className="flex items-center gap-2 w-70">
					<div className="grow">Goal</div>
					{mode === "editing" && (
						<SquareButton
							onClick={() => goalCards.setCardState(random16bit())}
							Icon={Shuffle}
						/>
					)}
					{mode === "playing" && (
						<SquareButton
							Icon={Flag}
							highlight={showAnswer}
							onClick={() => {
								setShowAnswer((prev) => !prev)
							}}
						/>
					)}
					<SquareButton
						Icon={Pencil}
						highlight={mode === "editing"}
						onClick={() =>
							setMode((prev) => (prev === "playing" ? "editing" : "playing"))
						}
					/>
				</div>
				<CardBoard
					onCardClick={mode === "editing" ? goalCards.flipOne : undefined}
					cardState={goalCards.cardState}
					clickable={false}
					highlight={0}
				/>
			</div>
			{mode === "playing" && (
				<div className="flex flex-col gap-6 transition-transform">
					<div className="flex items-center gap-2 w-70">
						<div className="grow">
							{playerCards.cardState === goalCards.cardState
								? "Clear!!"
								: "Yours"}
						</div>
						<SquareButton
							onClick={() => {
								const click = random16bit()
								let state = goalCards.cardState
								for (let i = 0; i < 16; i++) {
									if ((click >> i) & 1) state ^= AROUND[i]
								}
								playerCards.setCardState(state)
							}}
							Icon={Shuffle}
						/>
						<SquareButton
							Icon={RotateCcw}
							onClick={() => playerCards.setCardState(0)}
						/>
					</div>
					<CardBoard
						onCardClick={playerCards.flipAround}
						cardState={playerCards.cardState}
						clickable={true}
						highlight={answerMasks}
					/>
				</div>
			)}
		</main>
	)
}
