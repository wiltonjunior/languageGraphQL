module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.regiao;

   var regiao = {};

   regiao.listar = {
     type : new graphql.GraphQLList(model.type),
     resolve : function (_,args) {
       var res = listar();
       return res;
     }
   };

   regiao.listarRegiao = {
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
     var resultados = await database.query("FOR regiao IN regiao RETURN regiao");
     return resultados._result;
   };

   async function buscar(id) {
     var resultados = await database.query("FOR regiao IN regiao FILTER regiao._key == @id RETURN regiao",{'id' : id});
     return resultados._result[0];
   }


   return regiao;
}
