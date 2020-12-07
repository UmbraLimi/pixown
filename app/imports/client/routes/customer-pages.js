// ----node-packages----------------
import React 										from 	'react'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { DynamicImport }   			from './dynamic-import.jsx'

// ========================================================================
export const Profile_Page = (props) => {
	return (
		<DynamicImport   classToUse='Profile_Page'
			load={() => import('/imports/client/ui/pages/customer/Profile-Page/index.jsx')}
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
export const Homebase_Page = (props) => {
	return (
		<DynamicImport   classToUse='Homebase_Page'
			load={() => import('/imports/client/ui/pages/customer/Homebase-Page/index.jsx')}
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
export const Image_Gallery_Page = (props) => {
	return (
		<DynamicImport   classToUse='Pre_Connect'
			load={() => import('/imports/client/ui/pages/customer/Image-Gallery-Page/pre-connect.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Image Gallery Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Workup_Wizard_Page = (props) => {
	return (
		<DynamicImport   classToUse='Pre_Connect'
			load={() => import('/imports/client/ui/pages/customer/Workup-Wizard-Page/pre-connect.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Workup Wizard Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Cart_Page = (props) => {
	return (
		<DynamicImport   classToUse='Pre_Connect'
			load={() => import('/imports/client/ui/pages/customer/Cart-Page/pre-connect.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Cart Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
