module.exports = function (app) {
  var graphql = app.get("graphql");
  var database = app.get("database");
  var model = app.model.termos;

  var termos = {};

  termos.salvar = {
    type : model.type,
    args : {
      input : {
        type : new graphql.GraphQLNonNull(model.typeInput)
      }
    },
    resolve : function (_,args) {
      var res = salvarTermos(args.input);
      return res;
    }
  };

  termos.editar = {
    type : model.type,
    args : {
      _key : {
        type : graphql.GraphQLString
      },
      input : {
        type : new graphql.GraphQLNonNull(model.typeInput)
      }
    },
    resolve : function (_,args) {
      var res = editarTermos(args._key,args.input);
      return res;
    }
  };

  termos.deletar = {
    type : model.type,
    args : {
      _key : {
        type : graphql.GraphQLString
      }
    },
    resolve : function (_,args) {
      var res = deletarTermos(args._key);
      return res;
    }
  };

  async function salvarTermos(input) {
     var dbTermos = database.collection("termos");
     var resultados = await dbTermos.save(input);
     var termos = await dbTermos.document(resultados._key);
     return termos;
  };

  async function editarTermos(_key,input) {
     var dbTermos = database.collection("termos");
     var resultados = await dbTermos.update(_key,input);
     var termos = await dbTermos.document(resultados._key);
     return termos;
  };

  async function deletarTermos(_key) {
     var dbTermos = database.collection("termos");
     var termos = await dbTermos.document(_key);
     var resultados = await dbTermos.remove(_key);
     return resultados;
  }


  return termos;
}
