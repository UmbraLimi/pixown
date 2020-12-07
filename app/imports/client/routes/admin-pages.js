// ----node-packages----------------
import React 										from 	'react'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { DynamicImport }   			from './dynamic-import.jsx'

// ========================================================================
export const Homebase_Page = (props) => {
	return (
		<DynamicImport   classToUse='Homebase_Page'
			load={() => import('/imports/client/ui/pages/admin/Homebase-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Homebase Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Profile_Page = (props) => {
	return (
		<DynamicImport   classToUse='Profile_Page'
			load={() => import('/imports/client/ui/pages/admin/Profile-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Profile Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================