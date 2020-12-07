// taken from
// https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
//
// usage: 
// import { with_error } from 'imports/api/client/await-helpers.js';
// [err, user] = await with_error(UserModel.findById(1))
// if(!user) return cb('No user found')

function with_error(promise) {
	return promise.then(data => {
		 return [null, data]
	})
	.catch(err => [err])
}

export { with_error }