module.exports = function (app) {
  var graphql = app.get("graphql");
  var database = app.get("database");
  var model = app.model.type.regiao;
  var modelInput = app.model.typeInput.regiao;

  var regiao = {};

  regiao.salvar = {
    type : model,
    args : {
      input : {
        type : new graphql.GraphQLNonNull(modelInput)
      }
    },
    resolve : function (_,args) {
      var res = salvarRegiao(input);
      return res;
    }
  };

  regiao.editar = {
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
       var res = editarRegiao(args._key,args.input);
       return res;
    }
  };

  regiao.deletar = {
    type : model,
    args : {
      _key : {
        type : graphql.GraphQLString
      }
    },
    resolve : function (_,args) {
       var res = deletarRegiao(_key);
       return res;
    }
  }

  async function salvarRegiao(input) {
     var dbRegiao = database.collection("regiao");
     var resultados = await dbRegiao.save(input);
     var regiao = await dbRegiao.document(resultados._key);
     return regiao;
  };

  async function editarRegiao(_key,input) {
     var dbRegiao = database.collection("regiao");
     var resultados = await dbRegiao.update(_key,input);
     var regiao = await dbRegiao.document(resultados._key);
     return regiao;
  };

  async function deletarRegiao(_key) {
     var dbRegiao = database.collection("regiao");
     var regiao = await dbRegiao.document(resultados._key);
     var resultados = await dbRegiao.remove(_key);
     return regiao;
  }


  return regiao;
}
