module.exports = function (app) {
  var graphql = app.get("graphql");
  var database = app.get("database");
  var model = app.model.aluno;

  aluno = {};

  aluno.salvar = {
    type : model.type,
    args : {
      input : {
        type : new graphql.GraphQLNonNull(model.typeInput)
      }
    },
    resolve : function (_,args) {
       var res = salvarAluno(args.input);
       return res;
    }
  };


  aluno.editar = {
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
      var res = editarAluno(args._key,args.input);
      return res;
    }
  };

  aluno.deletar = {
    type : model.type,
    args : {
      _key : {
        type : graphql.GraphQLString
      }
    },
    resolve : function (_,args) {
      var res = deletarAluno(args._key);
      return res;
    }
  };

  async function salvarAluno(input) {
     var dbAluno = database.collection("aluno");
     var resultados = await dbAluno.save(input);
     var aluno = dbAluno.document(resultados._key);
     return aluno;
  };

  async function editarAluno(_key,input) {
     var dbAluno = database.collection("aluno");
     var resultados = await dbAluno.update(_key,input);
     var aluno = dbAluno.document(resultados._key);
     return aluno;
  };


  async function deletarAluno(_key) {
    var dbAluno = database.collection("aluno");
    var aluno = await dbAluno.document(_key);
    var resultados = await dbAluno.remove(_key);
    return aluno;
  }


  return aluno;

}