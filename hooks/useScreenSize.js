import { useEffect, useState } from "react"

export default function useScreenSize() {
	const [width, setWidth] = useState()
	const [height, setHeight] = useState()
	useEffect(() => {
		const storedScreenWidth = localStorage.getItem('screenWidth')
		if (storedScreenWidth) {
			setWidth(JSON.parse(storedScreenWidth))
		} else setWidth(window.screen.width)
		const storedScreenHeight = localStorage.getItem('screenHeight')
		if (storedScreenHeight) {
			setHeight(JSON.parse(storedScreenHeight))
		} else setHeight(window.screen.height)
	}, [])
	return (
		{
			width, height
		}
	)
}
