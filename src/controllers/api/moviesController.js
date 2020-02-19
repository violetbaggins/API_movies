const db = require('../../database/models');
/* const sequelize = db.sequelize;
const Op = db.Sequelize.Op; */

const movies = db.Movies;


module.exports = {
    index: (req, res) =>{

        movies.findAll({
            attributes: ['id','title', 'genre_id']
        })
        .then((movies) =>{
            //para pasarle los datos de la pagina, cuantos elementos son etc.
            let result = {
                
                metadata: {
                    url: req.originalUrl,
                    quantity: movies.length
                },
                //este movies es el que dice 'movies' es el que sale del .then
                data: movies
            }
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(500).end("no se puede conectar")
        })

    },
    store: (req, res) => {
       /*  res.send('vino por post')
        return */
		movies.create(req.body)
        .then(movieSaved =>{
            return res.json({
                metadata:{
                    status: 'Se guardo'
                },
                url: req.originalUrl+'/'+movieSaved.id,
                loqueseguardoenlaDB: movieSaved
            })
        })
        .catch(err=>{
            res.json(err)
        })
    },
    show: (req, res) => {
		movies
			.findByPk(req.params.id)
			.then(movie => {
				return res.send(
                    {
                        metadata:{
                            status: 'Se guardo'
                        },
                        url: req.originalUrl+'/',
                        laPeli: movie
                    }
                );
			})
			.catch(error => console.log(error));
	},
}