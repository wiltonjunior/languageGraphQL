module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.licao;

   var licao = {};

   licao.listar = {
     type : new graphql.GraphQLList(model.type),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   licao.listarLicao = {
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
     var resultados = await database.query("FOR licao IN licao RETURN licao");
     return resultados._result[0];
   };


   async function buscar(id) {
     var resultados = await database.query("FOR licao IN licao FILTER licao._key == @id RETURN licao",{'id' : id});
     return resultados._result[0];
   }

   return licao;
}
