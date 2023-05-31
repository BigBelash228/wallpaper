import Layout from "@/components/layout/Layout"
import cl from '../styles/home.module.css'
import { useEffect, useState } from "react"
import Router from "next/router"
import useScreenSize from "@/hooks/useScreenSize"

export default function Index() {
	const screenSize = useScreenSize()
	const [screenWidth, setScreenWidth] = useState(300)
	const [screenHeight, setScreenHeight] = useState(300)
	useEffect(() => {
		setScreenWidth(window.screen.width)
		setScreenHeight(window.screen.height)
	}, [])
	const start = () => {
		localStorage.setItem('screenWidth', JSON.stringify(screenWidth))
		localStorage.setItem('screenHeight', JSON.stringify(screenHeight))
		Router.push('/wallpaper')
		const element = document.documentElement;
		element.requestFullscreen()
	}
	const [settingsMode, setSettingsMode] = useState(false)
	const changeSettingsMode = () => {
		setSettingsMode(!settingsMode)
	}
	return (
		<Layout>
			<div className={cl.main_holder}>
				<div className={cl.content_holder}>
					<div>
						<h1>Wallpaper</h1>
						{settingsMode &&
							<div className={cl.settings}>
								<input type="number" value={screenWidth} onChange={e => setScreenWidth(e.target.value)} />
								<input type="number" value={screenHeight} onChange={e => setScreenHeight(e.target.value)} />
							</div>
						}
						<p className={cl.settingsModeSwitch} onClick={changeSettingsMode}>Настроить разрешение</p>
						<p>Разрешение {screenWidth} x {screenHeight}</p>
						<button onClick={() => start()}>Смотреть обои</button>
					</div>
				</div>
			</div>
			<div className={cl.background}></div>
		</Layout>
	)
}