import { FormStore } 						from  './Form-Store.js' // doing it NOT dynamically as it loads always


export async function customerStoresLoader(rootStore) {
	//const myModule = await import('./myModule.js');

	//const {export1, export2} = await import('./myModule.js');

	//const folder = '/imports/client/stores/customer'
	// NOte: can't put string expressions inside the import, why it doesn't work I don't know
	const [
		{ImageGalleryStore}, 
		{Workup_Wizard_Store}, 
		{CartStore}
	] = await Promise.all([
		import('/imports/client/stores/customer/Image-Gallery-Store.js'),
		import('/imports/client/stores/customer/Workup-Wizard-Store.js'),
		import('/imports/client/stores/customer/Cart-Store.js')
	])
	rootStore.imageGalleryStore= new ImageGalleryStore(rootStore)
	rootStore.workupWizardStore	= new Workup_Wizard_Store(rootStore)
	rootStore.cartStore	= new CartStore(rootStore)
}

export async function vendorStoresLoader(rootStore) {
	const [
		{Workup_List_Manager}, 
		{Workup_Manager},
		{Order_List_Manager}, 
		{Order_Manager},
		{Sitting_List_Manager}, 
		{Sitting_Manager},
		{School_Manager},
		{School_List_Manager},
		{Image_List_Manager}, 
		{Image_Manager},
		{Retouching_Agreement_Manager},
		{Retouching_Agreement_List_Manager},
		{Printing_Agreement_Manager},
		{Printing_Agreement_List_Manager},
		{Downloading_Agreement_Manager},
		{Downloading_Agreement_List_Manager},
		{Folder_Manager},
		{Folder_List_Manager}
	] = await Promise.all([
		import('/imports/client/stores/vendor/Workup-List-Manager.js'),
		import('/imports/client/stores/vendor/Workup-Manager.js'),
		import('/imports/client/stores/vendor/Order-List-Manager.js'),
		import('/imports/client/stores/vendor/Order-Manager.js'),
		import('/imports/client/stores/vendor/Sitting-List-Manager.js'),
		import('/imports/client/stores/vendor/Sitting-Manager.js'),
		import('/imports/client/stores/vendor/School-Manager.js'),
		import('/imports/client/stores/vendor/School-List-Manager.js'),
		import('/imports/client/stores/vendor/Image-List-Manager.js'),
		import('/imports/client/stores/vendor/Image-Manager.js'),
		import('/imports/client/stores/vendor/Retouching-Agreement-Manager.js'),
		import('/imports/client/stores/vendor/Retouching-Agreement-List-Manager.js'),
		import('/imports/client/stores/vendor/Printing-Agreement-Manager.js'),
		import('/imports/client/stores/vendor/Printing-Agreement-List-Manager.js'),
		import('/imports/client/stores/vendor/Downloading-Agreement-Manager.js'),
		import('/imports/client/stores/vendor/Downloading-Agreement-List-Manager.js'),
		import('/imports/client/stores/vendor/Folder-Manager.js'),
		import('/imports/client/stores/vendor/Folder-List-Manager.js')
	])
	rootStore.factories.workupFactory = Workup_Manager
	rootStore.factories.workupListFactory = Workup_List_Manager
	rootStore.factories.sittingFactory = Sitting_Manager
	rootStore.factories.sittingListFactory = Sitting_List_Manager
	rootStore.factories.orderFactory = Order_Manager
	rootStore.factories.orderListFactory = Order_List_Manager
	rootStore.factories.imageFactory = Image_Manager
	rootStore.factories.imageListFactory = Image_List_Manager
	rootStore.factories.schoolFactory = School_Manager
	rootStore.factories.schoolListFactory = School_List_Manager
	rootStore.factories.retouchingAgreementFactory = Retouching_Agreement_Manager
	rootStore.factories.retouchingAgreementListFactory = Retouching_Agreement_List_Manager
	rootStore.factories.printingAgreementFactory = Printing_Agreement_Manager
	rootStore.factories.printingAgreementListFactory = Printing_Agreement_List_Manager
	rootStore.factories.downloadingAgreementFactory = Downloading_Agreement_Manager
	rootStore.factories.downloadingAgreementListFactory = Downloading_Agreement_List_Manager
	rootStore.factories.folderFactory = Folder_Manager
	rootStore.factories.folderListFactory = Folder_List_Manager
}	

export async function adminStoresLoader(rootStore) {
	const [
		//{ImageGalleryStore}, 
		//{Workup_Wizard_Store}, 
		//{CartStore}
	] = await Promise.all([
		//import('/imports/client/stores/Image-Gallery-Store.js'),
		//import('/imports/client/stores/Workup-Wizard-Store.js'),
		//import('/imports/client/stores/Cart-Store.js'),
	])
	//rootStore.imageGalleryStore	= new ImageGalleryStore(rootStore)
	//rootStore.workupWizardStore	= new Workup_Wizard_Store(rootStore)
	//rootStore.cart					= new CartStore(rootStore)
}