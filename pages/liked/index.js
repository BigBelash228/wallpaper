import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "@/components/layout/Layout"
import cl from "./liked.module.css"
import { FaArrowLeft, FaTrash } from "react-icons/fa"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { BsCheck } from "react-icons/bs"
import useScreenSize from "@/hooks/useScreenSize"

// [53, 90, 707, 34, 34, 34, 34]

export default function Wallpaper() {
	const screenSize = useScreenSize()
	const [likedId, setLikedId] = useState([])
	const [selectedIdsToDelete, setSelectedIdsToDelete] = useState([])
	const [selectionMode, setSelectionMode] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const storedLikedId = localStorage.getItem("likedId")
		if (storedLikedId) {
			const uniqueStoredLikedId = JSON.parse(storedLikedId).filter((id, index) => JSON.parse(storedLikedId).indexOf(id) === index)
			setLikedId(uniqueStoredLikedId)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("likedId", JSON.stringify(likedId))
	}, [likedId])
	const imagesStyles = [cl.img]
	const countHolderStyles = [cl.countHolder]
	const trashHolderStyles = [cl.trashHolder]
	if (selectionMode) {
		countHolderStyles.push(cl.visible)
		trashHolderStyles.push(cl.visible)
		imagesStyles.push(cl.selectionMode)
	}
	if (selectedIdsToDelete.length) {
		trashHolderStyles.push(cl.active)
	}
	const clickHandler = id => {
		if (selectionMode) {
			if (selectedIdsToDelete.includes(Number(id))) {
				setSelectedIdsToDelete(prev => prev.filter(selectedId => selectedId !== Number(id)))
			} else setSelectedIdsToDelete(prev => [...prev, Number(id)])
		} else router.push(`/post/${id}`)
	}

	const deleteLikedId = () => {
		const storedLikedId = localStorage.getItem("likedId")
		const filteredArray = JSON.parse(storedLikedId).filter(num => !selectedIdsToDelete.includes(num))
		setLikedId(filteredArray)
		localStorage.setItem("likedId", JSON.stringify(filteredArray))
		setSelectedIdsToDelete([])
	}
	return (
		<Layout>
			<div className={cl.topTaskbar}>
				<FaArrowLeft onClick={() => router.push("/wallpaper")} />
				{likedId.length ? <HiOutlinePencilAlt onClick={() => setSelectionMode(!selectionMode)} /> : ''}
			</div>
			<div className={cl.images_holder}>
				{likedId.length ?
					likedId.map((id) => (
						<div className={cl.img_holder} key={id} onClick={e => clickHandler(id)}>
							<img className={imagesStyles.join(' ')}
								src={`https://picsum.photos/id/${id}/${screenSize.width}/${screenSize.height}`}
								alt={`image ${id}`}
								onError={() => {
									setLikedId(prev => prev.filter(imgId => imgId !== Number(id)))
									localStorage.setItem("likedId", JSON.stringify(likedId))
								}
								}
							/>
							{selectionMode &&
								<div className={countHolderStyles.join(" ")}>
									{selectedIdsToDelete.includes(Number(id)) && <BsCheck />}
								</div>
							}
						</div>
					))
					:
					<div className={cl.noImagesHolder}>
						<p>У вас еще нет сохраненных изображений</p>
					</div>
				}
			</div>
			{likedId.length ?
				<div className={trashHolderStyles.join(' ')} onClick={() => deleteLikedId()}>
					<FaTrash />
				</div>
				: ''
			}
		</Layout>
	)
}




