module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.estudo;

   var estudo = {};

   estudo.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   estudo.listarEstudo = {
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
      var resultado = await database.query("FOR estudo IN estudo RETURN estudo");
      return resultado._result;
   };

   async function buscar(id) {
      var resultado = await database.query("FOR estudo IN estudo FILTER estudo._key == @id RETURN estudo",{'id' : id});
      return resultado._result[0];
   }


   return estudo;
}
