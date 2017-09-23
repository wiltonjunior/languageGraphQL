module.exports = function (app) {
  var graphql = app.get("graphql");
  var database = app.get("database");
  var model = app.model.type.nivel;
  var modelInput = app.model.typeInput.nivel;

  var nivel = {};

  nivel.salvar = {
    type : model,
    args : {
      input : {
        type : new graphql.GraphQLNonNull(modelInput)
      }
    },
    resolve : function (_,args) {
       var res = salvarNivel(args.input);
       return res;
    }
  };

  nivel.editar = {
    type : model,
    args : {
      _key : {
        type : graphql.GraphQLString
      },
      input : {
        type : new graphql.GraphQLNonNull(modelInput)
      }
    },
    resolve : function (_,args) {
       var res = editarNivel(args._key,args.input);
       return res;
    }
  };

  nivel.deletar = {
    type : model,
    args : {
      _key : {
        type : graphql.GraphQLString
      }
    },
    resolve : function (_,args) {
       var res = deletarNivel(args._key);
       return res;
    }
  };

  async function salvarNivel(input) {
     var dbNivel = database.collection("nivel");
     var resultados = await dbNivel.save(input);
     var nivel = await dbNivel.document(resultados._key);
     return nivel;
  };

  async function editarNivel(_key,input) {
     var dbNivel = database.collection("nivel");
     var resultados = await dbNivel.update(_key,input);
     var nivel = await dbNivel.document(resultados._key);
     return nivel;
  };

  async function deletarNivel(_key) {
     var dbNivel = database.collection("nivel");
     var nivel = await dbNivel.document(_key);
     var resultados = await dbNivel.remove(_key);
     return nivel;
  }


  return nivel;
}
