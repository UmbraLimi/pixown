import { BrowserPolicy } from 'meteor/browser-policy-common'
// ----node-packages----------------

BrowserPolicy.content.allowInlineScripts() // allowed by default
//BrowserPolicy.content.disallowEval()
BrowserPolicy.content.allowInlineStyles()  // allowed by default
//BrowserPolicy.content.allowImageSameOrigin()
BrowserPolicy.content.allowSameOriginForAll() 
//BrowserPolicy.content.allowOriginForAll( 'http://placeholdit.imgix.net' )
//BrowserPolicy.content.allowOriginForAll( 'http://placehold.it' )
BrowserPolicy.content.allowOriginForAll( 'fonts.googleapis.com' )
BrowserPolicy.content.allowOriginForAll( 'https://fonts.gstatic.com' )
BrowserPolicy.content.allowOriginForAll( 'https://cdnjs.cloudflare.com' )
BrowserPolicy.content.allowOriginForAll( '*.stripe.com' )
BrowserPolicy.content.allowOriginForAll( 'https://www.dropbox.com' ) // for original dropbox shared url
BrowserPolicy.content.allowOriginForAll( '*.dl.dropboxusercontent.com' ) // raw=1 forces a redirect to this url in dropbox
//BrowserPolicy.content.allowOriginForAll( '*.pixown.com' )
//BrowserPolicy.content.allowOriginForAll( '*.recurly.com' )

//BrowserPolicy.content.allowOriginForAll( 'https://at.alicdn.com' )

// from https://medium.com/@benjamincherion/connecting-meteor-react-stripe-checkout-ddecfc06adec
//BrowserPolicy.content.allowOriginForAll('https://js.stripe.com/')
//BrowserPolicy.content.allowOriginForAll('https://checkout.stripe.com/')
//BrowserPolicy.content.allowOriginForAll('https://q.stripe.com/')

BrowserPolicy.content.allowImageOrigin("res.cloudinary.com")


//"content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
