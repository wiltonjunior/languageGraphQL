module.exports = function (app) {
  var graphql = app.get("graphql");
  var database = app.get("database");
  var model = app.model.idioma;

  var idioma = {};

  idioma.listar = {
    type : new graphql.GraphQLList(model.type),
    resolve : function (_,args) {
      var res = listar();
      return res;
    }
  };

  idioma.listarIdioma = {
    type : model.type,
    args : {
      _key : {
        type : graphql.GraphQLString
      }
    },
    resolve : function (_,args) {
      var res = buscar(args._key);
      return res;
    }
  };

  async function listar() {
    var resultados = await database.query("FOR idioma IN idioma RETURN idioma");
    return resultados._result;
  };

  async function buscar(id) {
    var resultados = await database.query("FOR idioma IN idioma FILTER idioma._key == @id RETURN idioma",{'id' : id});
    return resultados._result[0];
  }


  return idioma;
}
