import type { LucideIcon } from "lucide-react"
import type { HTMLAttributes } from "react"
import { cn } from "../lib"

type Props = {
	Icon: LucideIcon
	highlight?: boolean
}

export const SquareButton = (
	props: Props & HTMLAttributes<HTMLButtonElement>,
) => {
	return (
		<button
			type="button"
			className={cn(
				"w-12 h-12 bg-stone-200 rounded flex items-center justify-center transition-colors",
				props.highlight ? "bg-stone-500 text-stone-100" : "bg-stone-200",
			)}
			{...props}
		>
			<props.Icon size={16} />
		</button>
	)
}
