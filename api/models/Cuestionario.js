/**
* Cuestionario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	attributes: {

	    observaciones : { type: 'string' },

	    fechafin : { type: 'date' },

	    preguntas: {
	    	collection: 'pregunta',
	    	via: 'cuestionarios'
	    }
	},
	duplicar: function (cuestionario, cb) {
		//Cuestionario=modelo cuestionario=objeto
		(function _lookupCuestionarioIfNecessary(afterLookup){
		// (this self-calling function is just for concise-ness)
		if (typeof Cuestionario === 'object') return afterLookup(null, cuestionario);
		Cuestionario.findOne(cuestionario).populate('preguntas').exec(afterLookup);
		})(function (err, cuestionario){
			if (err) return cb(err);
			if (!cuestionario) {
			  err = new Error();
			  err.message = require('util').format('no existe nungun cuestionario con el id=%s .', cuestionario);
			  err.status = 404;
			  return cb(err);
			}

			cuestionarioJSON = cuestionario.toJSON();
			delete cuestionarioJSON["id"];
			Cuestionario.create(cuestionarioJSON)
			.exec(function createCB(err, created){
				if (err) return cb(err);
				/*
				cuestionario.preguntas.forEach(function (pregunta){
					created.preguntas.add(pregunta.id)
				});
				*/
				cb(null, created);
			})
			});

		
	}
	
};

