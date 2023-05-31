import Link from 'next/link'
import cl from './Layout.module.css'
import Head from "next/head"
import { RiSettings3Fill } from 'react-icons/ri'

export default function Layout({ children, title = 'Wallpaper' }) {
	return (
		<div>
			<Head>
				<title>
					{title}
				</title>
			</Head>
			<main>{children}</main>
		</div>
	)
}