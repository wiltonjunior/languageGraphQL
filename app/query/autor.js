module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.autor;

   var autor = {};

   autor.listar = {
     type : new graphql.GraphQLList(model.type),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   autor.listarAutor = {
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
      var resultados = await database.query("FOR autor IN autor RETURN autor");
      return resultados._result;
   };

   async function buscar(id) {
     var resultados = await database.query("FOR autor IN autor FILTER autor._key == @id RETURN autor",{'id' : id});
     return resultados._result[0];
   }


   return autor;
}
