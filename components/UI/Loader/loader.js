import cl from './loader.module.css'

export default function loader() {
	return (
		<div className={cl.loader_holder}>
			<div className={cl.lds_ripple}><div></div><div></div></div>
		</div>
	)
}