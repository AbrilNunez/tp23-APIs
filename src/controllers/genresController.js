const db = require("../database/models");
const sequelize = db.sequelize;

const genresController = {
  list: async (req, res) => {
      try {
        let {order = 'id'} = req.query;
        let orders = ['id','name', 'ranking'];

        if(!orders.includes(req.query.order)){
            throw new Error(`El campo ${order} no existe. Campos admitidoss: [name, ranking]`)
        }

          let genres = await db.Genre.findAll({
            order : ['order'],
            attributes : {
                exclude : ['created_at', 'updated_at']
            }
          })
          if(genres.length){
            return res.status(200).json({
                 ok : true,
                 meta : {
                    total : genres.length
                 },
                 data : genres
            }) 
          }
          throw new Error('Ups, no hay géneros')
         
      } catch (error) {
          console.log(error)
          return res.status(500).json({
            mok : false,
            msg : error.message ? error.message : 'Comuníquese con el administrador del sitio'
          })
      }
  },
  detail: async(req, res) => {
    try {

        const {id} = req.params.id;
        if (NaN(id)){
          throw new Error('El ID debe ser un número')
        }

        let genre = await db.Genre.findByPk(req.params.id, {
            attributes : {
                exclude : ['created_at', 'updated_at']
            }
        });
        if(genre){
            return res.status(200).json({
                 ok : true,
                meta : {
                total : 1
            },
            data : genre
        }) 
    }
       throw new Error('No se encuentra el género')

    } catch (error) {
        console.log(error)
        return res.status(500).json({
          mok : false,
          msg : error.message ? error.message : 'Comuníquese con el administrador del sitio'
        })
    }
  }
};

module.exports = genresController;
