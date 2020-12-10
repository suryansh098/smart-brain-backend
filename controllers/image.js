const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '24b4b7d2662741eeba9835fb8dae5602'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to call API'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.status(200).json(entries[0]))
		.catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall,
};