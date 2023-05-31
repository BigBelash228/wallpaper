import { AiFillHeart, AiFillHome, AiOutlineHeart } from 'react-icons/ai'
import cl from './ImageWrapper.module.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { HiDownload } from 'react-icons/hi'
import Loading from "@/components/UI/Loader/loader"
import { useEffect, useState } from 'react'
import Router from 'next/router'
import useScreenSize from '@/hooks/useScreenSize'

export default function ImageWrapper({ src, imageIndex, flipThrough = false, likedImages = false, topTaskbarLink }) {
	const [imageId, setImageId] = useState(imageIndex)
	const [lastImgId, setLastImgId] = useState()
	useEffect(() => {
		if (!imageIndex) {
			setImageId(lastImgId)
		}
	}, [])
	const screenSize = useScreenSize()
	const [likedId, setLikedId] = useState([])
	const [isLiked, setIsLiked] = useState(null)
	useEffect(() => {
		const storedLikedId = localStorage.getItem('likedId')
		if (storedLikedId) {
			setLikedId(JSON.parse(storedLikedId))
			if (likedId.includes(imageId)) {
				setIsLiked(true)
			}
		}
		const storedLastImgId = localStorage.getItem('lastImageId')
		if(storedLastImgId && storedLastImgId !== undefined) {
			setLastImgId(JSON.parse(storedLastImgId))
		}
	}, [])
	useEffect(() => {
		localStorage.setItem('lastImageId', JSON.stringify(imageId))
	}, [imageId])
	const likeFunction = () => {
		setLikedId(prev => [...prev, imageId])
	}
	const dislikeFunction = () => {
		setLikedId(prev => prev.filter(id => id !== imageId))
	}
	
	const nextImage = () => {
		setLoaded(false)
		setImageId(prev => (prev >= 1000 ? 1 : prev + 1))
	}
	const prevImage = () => {
		setLoaded(false)
		setImageId(prev => (prev <= 1 ? 1000 : prev - 1))
	}
	const [loaded, setLoaded] = useState(false)
	return (
		<>
		{imageId }
			<div className={topTaskbarStyles.join(' ')}>
				{!topTaskbarLink ?
					<AiFillHome onClick={() => Router.push('/')} />
					: <FaArrowLeft onClick={() => Router.push(topTaskbarLink)} />
				}
			</div>
			<div className={cl.img_holder} onClick={() => setTaskbarActive(!taskbarActive)}>
				{screenSize.width && screenSize.height && imageId && <img src={`https://picsum.photos/id/${imageId}/${screenSize.width}/${screenSize.height}`} onLoad={() => setLoaded(true)} alt="image" />}
				{!loaded && <Loading />}
			</div>
			<div className={bottomTaskbarStyles.join(' ')}>
				{flipThrough && <FaArrowLeft onClick={prevImage} />}
				<a href={src} target="_blank" download={`wallpaper${imageId}`}><HiDownload /></a>
				{likedImages && <Link href={'/liked'}>Понравившееся</Link>}
				{isLiked ?
					<AiFillHeart className={cl.heart} onClick={() => dislikeFunction()} />
					:
					<AiOutlineHeart className={cl.heart} onClick={likeFunction} />
				}
				{flipThrough && <FaArrowRight onClick={nextImage} />}
			</div>
		</>
	)
}