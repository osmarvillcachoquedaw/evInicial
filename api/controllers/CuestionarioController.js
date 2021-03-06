/**
 * CuestionarioController
 *
 * @description :: Server-side logic for managing cuestionarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	load: function(req, res, next) {
		Cuestionario.findOne({
			where: { id: Number(req.params.cuestionarioId)}
		}).populate('preguntas').then(function(cuestionario){
			if(cuestionario) {
				req.cuestionario = cuestionario;
				next();
			} else { next(new Error('No existe el cuestionario con el id' + req.params.cuestionarioId));}
		}).catch(function(error){next(error);});
	},

	duplicar: function(req, res, next) {
		//CON METODO DE CLASE
		/*
		Cuestionario.duplicar
			(req.cuestionario, function (err, cuestionarioDuplicado) 
				{ res.json(cuestionarioDuplicado) });
		*/


		//CON METODO DE INSTANCIA
		req.cuestionario.duplicar
			(function (err, cuestionarioDuplicado) 
				{ res.json(cuestionarioDuplicado) });


	},

	asociarGrupo: function (req, res, next){
		req.cuestionario.asociarGrupo(	
			req.grupo,function ( err, aaaCuestionario)
				{res.json(aaaCuestionario)}
				);
	}
};

