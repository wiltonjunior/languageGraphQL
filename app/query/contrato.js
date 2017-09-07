module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.contrato;

   var contrato = {};

   contrato.listar = {
     type : new graphql.GraphQLList(model.type),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   contrato.listarContrato = {
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
     var resultados = await database.query("FOR contrato IN contrato RETURN contrato");
     return resultados._result;
   };

   async function buscar(id) {
     var resultados = await database.query("FOR contrato IN contrato FILTER contrato._key == @id RETURN contrato",{'id' : id});
     return resultados._result[0];
   }


   return contrato;
}
