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
			load={() => import('/imports/client/ui/pages/vendor/Homebase-Page/index.jsx')}
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
			load={() => import('/imports/client/ui/pages/vendor/Profile-Page/index.jsx')}
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
export const Sittings_Page = (props) => {
	return (
		<DynamicImport   classToUse='Sittings_Page'
			load={() => import('/imports/client/ui/pages/vendor/Sittings-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Sittings Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Sitting_Page = (props) => {
	return (
		<DynamicImport   classToUse='Sitting_Page'
			load={() => import('/imports/client/ui/pages/vendor/Sitting-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Sitting Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Orders_Page = (props) => {
	return (
		<DynamicImport   classToUse='Orders_Page'
			load={() => import('/imports/client/ui/pages/vendor/Orders-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Orders Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Order_Page = (props) => {
	return (
		<DynamicImport   classToUse='Order_Page'
			load={() => import('/imports/client/ui/pages/vendor/Order-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Order Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Workups_Page = (props) => {
	return (
		<DynamicImport   classToUse='Workups_Page'
			load={() => import('/imports/client/ui/pages/vendor/Workups-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Workups Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Workup_Page = (props) => {
	return (
		<DynamicImport   classToUse='Workup_Page'
			load={() => import('/imports/client/ui/pages/vendor/Workup-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Workup Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Folders_Page = (props) => {
	return (
		<DynamicImport   classToUse='Folders_Page'
			load={() => import('/imports/client/ui/pages/vendor/Folders-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Folders Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Folder_Page = (props) => {
	return (
		<DynamicImport   classToUse='Folder_Page'
			load={() => import('/imports/client/ui/pages/vendor/Folder-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Folder Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Schools_Page = (props) => {
	return (
		<DynamicImport   classToUse='Schools_Page'
			load={() => import('/imports/client/ui/pages/vendor/Schools-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Schools Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const School_Page = (props) => {
	return (
		<DynamicImport   classToUse='School_Page'
			load={() => import('/imports/client/ui/pages/vendor/School-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading School Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Retouching_Agreements_Page = (props) => {
	return (
		<DynamicImport   classToUse='Retouching_Agreements_Page'
			load={() => import('/imports/client/ui/pages/vendor/Retouching-Agreements-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Retouching Agreements Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Retouching_Agreement_Page = (props) => {
	return (
		<DynamicImport   classToUse='Retouching_Agreement_Page'
			load={() => import('/imports/client/ui/pages/vendor/Retouching-Agreement-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Retouching Agreement Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================

// ========================================================================
export const Printing_Agreements_Page = (props) => {
	return (
		<DynamicImport   classToUse='Printing_Agreements_Page'
			load={() => import('/imports/client/ui/pages/vendor/Printing-Agreements-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Printing Agreements Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Printing_Agreement_Page = (props) => {
	return (
		<DynamicImport   classToUse='Printing_Agreement_Page'
			load={() => import('/imports/client/ui/pages/vendor/Printing-Agreement-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Printing Agreement Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}

// ========================================================================
export const Downloading_Agreements_Page = (props) => {
	return (
		<DynamicImport   classToUse='Downloading_Agreements_Page'
			load={() => import('/imports/client/ui/pages/vendor/Downloading-Agreements-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Downloading Agreements Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
// ========================================================================
export const Downloading_Agreement_Page = (props) => {
	return (
		<DynamicImport   classToUse='Downloading_Agreement_Page'
			load={() => import('/imports/client/ui/pages/vendor/Downloading-Agreement-Page/index.jsx')}
		>
			{
				(Component) => Component === null
				? <p>Loading Downloading Agreement Page</p>
				: <Component {...props} />
			}
		</DynamicImport>
	)
}
