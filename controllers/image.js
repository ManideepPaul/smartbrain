const clarifai = require('clarifai');

const app = new clarifai.App({
  apiKey: 'f8ba21c45e6541839bc2ad045730f50b'
})
const handleApiCall = (req, res) => {
	app.models
		.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entry => {
		res.json(entry[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};