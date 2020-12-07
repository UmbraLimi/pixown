// this is taken from the Metronic theme
const theme_colours = {
	"white":	{base:'#ffffff', font: '#666'},
	"default":	{base:'#e1e5ec', font: '#666'},
	"dark":	{base:'#2f353b', font: '#FFFFFF'},
	"blue":	{base:'#3598dc', font: '#FFFFFF'},
	"blue-madison":	{base:'#578ebe', font: '#FFFFFF'},
	"blue-chambray":	{base:'#2C3E50', font: '#FFFFFF'},
	"blue-ebonyclay":	{base:'#22313F', font: '#FFFFFF'},
	"blue-hoki":	{base:'#67809F', font: '#FFFFFF'},
	"blue-steel":	{base:'#4B77BE', font: '#FFFFFF'},
	"blue-soft":	{base:'#4c87b9', font: '#FFFFFF'},
	"blue-dark":	{base:'#5e738b', font: '#FFFFFF'},
	"blue-sharp":	{base:'#5C9BD1', font: '#FFFFFF'},
	"blue-oleo":	{base:'#94A0B2', font: '#FFFFFF'},
	"blue-bold":	{base:'#02466b', font: '#FFFFFF'},
	"green":	{base:'#32c5d2', font: '#FFFFFF'},
	"green-meadow":	{base:'#1BBC9B', font: '#FFFFFF'},
	"green-seagreen":	{base:'#1BA39C', font: '#FFFFFF'},
	"green-turquoise":	{base:'#36D7B7', font: '#FFFFFF'},
	"green-haze":	{base:'#44b6ae', font: '#FFFFFF'},
	"green-jungle":	{base:'#26C281', font: '#FFFFFF'},
	"green-soft":	{base:'#3faba4', font: '#FFFFFF'},
	"green-dark":	{base:'#4DB3A2', font: '#FFFFFF'},
	"green-sharp":	{base:'#2ab4c0', font: '#FFFFFF'},
	"green-steel":	{base:'#29b4b6', font: '#FFFFFF'},
	"grey":	{base:'#E5E5E5', font: '#333333'},
	"grey-steel":	{base:'#e9edef', font: '#80898e'},
	"grey-cararra":	{base:'#fafafa', font: '#333333'},
	"grey-gallery":	{base:'#555555', font: '#ffffff'},
	"grey-cascade":	{base:'#95A5A6', font: '#FFFFFF'},
	"grey-silver":	{base:'#BFBFBF', font: '#FAFCFB'},
	"grey-salsa":	{base:'#ACB5C3', font: '#FAFCFB'},
	"grey-salt":	{base:'#bfcad1', font: '#FAFCFB'},
	"grey-mint":	{base:'#525e64', font: '#FFFFFF'},
	"red":	{base:'#e7505a', font: '#ffffff'},
	"red-pink":	{base:'#E08283', font: '#ffffff'},
	"red-sunglo":	{base:'#E26A6A', font: '#ffffff'},
	"red-intense":	{base:'#e35b5a', font: '#ffffff'},
	"reverse-red-thunderbird":	{base:'#FFF', font: '#D91E18'},
	"red-thunderbird":	{base:'#D91E18', font: '#ffffff'},
	"red-flamingo":	{base:'#EF4836', font: '#ffffff'},
	"red-soft":	{base:'#d05454', font: '#ffffff'},
	"red-haze":	{base:'#f36a5a', font: '#ffffff'},
	"red-mint":	{base:'#e43a45', font: '#ffffff'},
	"yellow":	{base:'#c49f47', font: '#ffffff'},
	"yellow-gold":	{base:'#E87E04', font: '#ffffff'},
	"yellow-casablanca":	{base:'#f2784b', font: '#ffffff'},
	"yellow-crusta":	{base:'#f3c200', font: '#ffffff'},
	"yellow-lemon":	{base:'#F7CA18', font: '#ffffff'},
	"yellow-saffron":	{base:'#F4D03F', font: '#ffffff'},
	"yellow-soft":	{base:'#c8d046', font: '#ffffff'},
	"yellow-haze":	{base:'#c5bf66', font: '#ffffff'},
	"yellow-mint":	{base:'#c5b96b', font: '#ffffff'},
	"purple":	{base:'#8E44AD', font: '#ffffff'},
	"purple-plum":	{base:'#8775a7', font: '#ffffff'},
	"purple-medium":	{base:'#BF55EC', font: '#ffffff'},
	"purple-studio":	{base:'#8E44AD', font: '#ffffff'},
	"purple-wisteria":	{base:'#9B59B6', font: '#ffffff'},
	"purple-seance":	{base:'#9A12B3', font: '#ffffff'},
	"purple-intense":	{base:'#8775a7', font: '#ffffff'},
	"purple-sharp":	{base:'#796799', font: '#ffffff'},
	"purple-soft":	{base:'#8877a9', font: '#ffffff'}
}
// ====================================================================
function get_theme_from_name(name) {
	try {
		return theme_colours[name]
	} catch(error) {
		return undefined
	}
}
// ====================================================================

export { get_theme_from_name }