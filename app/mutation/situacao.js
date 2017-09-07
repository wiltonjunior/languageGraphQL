module.exports = function (app) {
  var graphql = app.get("graphql");
  var database = app.get("database");
  var model = app.model.situacao;

  var situacao = {};

  situacao.salvar = {
    type : model.type,
    args : {
      input : {
        type : new graphql.GraphQLNonNull(model.typeInput)
      }
    },
    resolve : function (_,args) {
       var res = salvarSituacao(args.input);
       return res;
    }
  };

  situacao.editar = {
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
       var res = editarSituacao(args._key,args.input);
       return res;
    }
  };

  situacao.deletar = {
    type : model.type,
    args : {
      _key : {
        type : graphql.GraphQLString
      }
    },
    resolve : function (_,args) {
       var res = deletarSituacao(args._key);
       return res;
    }
  };

  async function salvarSituacao(input) {
     var dbSituacao = database.collection("situacao");
     var resultados = await dbSituacao.save(input);
     var situacao = await dbSituacao.document(resultados._key);
     return situacao;
  };


  async function editarSituacao(_key,input) {
     var dbSituacao = database.collection("situacao");
     var resultados = await dbSituacao.update(_key,input);
     var situacao = await dbSituacao.document(resultados._key);
     return situacao;
  };

  async function deletarSituacao(_key) {
     var dbSituacao = database.collection("situacao");
     var regiao = await dbSituacao.document(_key);
     var resultados = await dbSituacao.remove(_key);
     return regiao;
  }

  return situacao;
}
