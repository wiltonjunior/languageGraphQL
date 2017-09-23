module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.situacao;

   var situacao = {};

   situacao.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res  = listar();
        return res;
     }
   };

   situacao.listarSituacao = {
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
      var resultados = await database.query("FOR situacao IN situacao RETURN situacao");
      return resultados._result;
   };


   async function buscar(id) {
      var resultados = await database.query("FOR situacao IN situacao FILTER situacao._key == @id RETURN situacao",{'id' : id});
      return resultados._result[0];
   }

   return situacao;
}
