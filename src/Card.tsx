import { cn } from "./lib"

type Props = {
	index: number
	isFlipped: boolean
	onClick?: (index: number) => void
	highlight: boolean
}

export const Card = ({ index, isFlipped, onClick, highlight }: Props) => {
	return (
		<button
			type="button"
			className={cn(
				"rounded flex justify-center items-center w-16 h-16 transition-colors",
				onClick && "cursor-pointer",
				isFlipped ? "bg-stone-500 text-stone-100" : "bg-stone-200",
				highlight && "border-dashed border-2 border-stone-800",
			)}
			onClick={() => {
				if (onClick) onClick(index)
			}}
		>
			{index}
		</button>
	)
}
