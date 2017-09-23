module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.nivel;

   var nivel = {};

   nivel.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   nivel.listarNivel = {
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
      var resultados = await database.query("FOR nivel IN nivel RETURN nivel");
      return resultados._result;
   };


   async function buscar(id) {
     var resultados = await database.query("FOR nivel IN nivel FILTER nivel._key == @id RETURN nivel",{'id' : id});
     return resultados._result[0];
   }

   return nivel;
}
