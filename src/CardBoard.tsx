import { Card } from "./Card"
import { range } from "./lib"

type Props = {
	onCardClick?: (index: number) => void
	cardState: number
	clickable: boolean
	highlight: number
}

export const CardBoard = ({ onCardClick, cardState, highlight }: Props) => {
	return (
		<div
			className="grid gap-2"
			style={{
				gridTemplateRows: `repeat(4, 64px)`,
				gridTemplateColumns: `repeat(4, 64px)`,
			}}
		>
			{Array.from(range(16), (index) => (
				<Card
					key={index}
					index={index}
					isFlipped={(cardState & (1 << index)) !== 0}
					onClick={onCardClick}
					highlight={(highlight & (1 << index)) !== 0}
				/>
			))}
		</div>
	)
}
