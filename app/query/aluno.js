module.exports = function (app) {
  var graphql = app.get("graphql");
  var database = app.get("database");
  var model = app.model.type.aluno;

  var aluno = {};

  aluno.listar = {
    type : new graphql.GraphQLList(model),
    resolve : function (_,args) {
      var res = listar();
      return res;
    }
  };

  aluno.listarAluno = {
    type : model,
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
     var resultados = await database.query("FOR aluno IN aluno RETURN aluno");
     return resultados._result;
  };

  async function buscar (id) {
     var resultados = await database.query("FOR aluno IN aluno FILTER aluno._key == @id RETURN aluno",{'id' : id});
     return resultados._result[0];
  }

  return aluno;
}
