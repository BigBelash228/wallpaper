import Layout from "@/components/layout/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useScreenSize from "@/hooks/useScreenSize"
import Loading from "@/components/UI/Loader/loader"
import cl from './post.module.css'
import { HiDownload } from 'react-icons/hi'
import { AiFillHeart, AiFillHome, AiOutlineHeart } from 'react-icons/ai'
import Router from "next/router"
import { FaArrowLeft } from "react-icons/fa"

export default function Post() {
	const deletedId = [86, 97, 105, 138, 148, 150, 205, 207, 224, 226, 245, 246, 262, 285, 286, 298, 303, 332, 333, 346, 359, 394, 414, 422, 438, 462, 463, 470, 489, 540, 561, 578, 587, 589, 592, 595, 597, 601, 624, 632, 636, 644, 647, 673, 697, 706, 707, 708, 709, 710, 711, 712, 713, 714, 720, 725, 734, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 759, 760, 761, 762, 763, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998]
	const screenSize = useScreenSize()
	const router = useRouter()
	const topTaskbarStyles = [cl.top_taskbar]
	const bottomTaskbarStyles = [cl.bottom_taskbar]
	const [taskbarActive, setTaskbarActive] = useState(true)
	if (taskbarActive) {
		topTaskbarStyles.push(cl.active)
		bottomTaskbarStyles.push(cl.active)
	}
	const [loaded, setLoaded] = useState(false)
	const [likedId, setLikedId] = useState([])
	useEffect(() => {
		const storedLikedId = localStorage.getItem('likedId')
		if (storedLikedId) {
			setLikedId(JSON.parse(storedLikedId))
		}
	}, [])
	useEffect(() => {
		localStorage.setItem('likedId', JSON.stringify(likedId))
	}, [likedId])
	const isLiked = likedId.includes(Number(router.query.id))

	const likeFunction = () => {
		setLikedId(prev => [...prev, Number(router.query.id)])
	}
	const dislikeFunction = () => {
		setLikedId(prev => prev.filter(id => id !== Number(router.query.id)))
	}
	useEffect(() => {
		if (deletedId.includes(Number(router.query.id))) {
			Router.push('/post/20')
		}
	})
	
	return (
		<Layout>
			<div className={topTaskbarStyles.join(' ')}>
				<FaArrowLeft onClick={() => Router.push('/liked')} />
			</div>
			<div className={cl.img_holder} onClick={() => setTaskbarActive(!taskbarActive)}>
				{screenSize.width && screenSize.height && router.query.id && <img src={`https://picsum.photos/id/${router.query.id}/${screenSize.width}/${screenSize.height}`} onLoad={() => setLoaded(true)} alt="image" />}
				{!loaded && <Loading />}
			</div>
			<div className={bottomTaskbarStyles.join(' ')}>
				<a href={`https://picsum.photos/id/${router.query.id}/${screenSize.width}/${screenSize.height}`} target="_blank" download={`wallpaper${router.query.id}`}><HiDownload /></a>
				{isLiked ?
					<AiFillHeart className={cl.heart} onClick={() => dislikeFunction()} />
					:
					<AiOutlineHeart className={cl.heart} onClick={() => likeFunction()} />
				}
			</div>
		</Layout>
	)
}