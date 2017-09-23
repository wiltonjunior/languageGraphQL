module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.empresa;

   var empresa = {};

   empresa.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
       var res = listar();
       return res;
     }
   };

   empresa.listarEmpresa = {
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
     var resultados = await database.query("FOR empresa IN empresa RETURN empresa");
     return resultados._result;
   };

   async function buscar(id) {
     var resultados = await database.query("FOR empresa IN empresa FILTER empresa._key == @id RETURN empresa",{'id' : id});
     return resultados._result[0];
   }

   return empresa;
}
