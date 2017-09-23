module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.dialogo;
   var modelInput = app.model.typeInput.dialogo;

   var dialogo = {};

   dialogo.salvar = {
     type : model,
     args : {
       input : {
         type : new graphql.GraphQLNonNull(modelInput)
       }
     },
     resolve : function (_,args) {
        var res = salvarDialogo(args.input);
        return res;
     }
   };


   dialogo.editar = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       },
       input : {
         type : new graphql.GraphQLNonNull(modelInput)
       }
     },
     resolve : function (_,args) {
        var res = editarDialogo(args._key,args.input);
        return res;
     }
   };

   dialogo.deletar = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
       var res = deletarDialogo(args._key);
       return res;
     }
   }

   async function salvarDialogo(input) {
      var dbDialogo = database.collection("dialogo");
      var resultados = await dbDialogo.save(input);
      var dialogo = await dbDialogo.document(resultados._key);
      return dialogo;
   };

   async function editarDialogo(_key,input) {
      var dbDialogo = database.collection("dialogo");
      var resultados = await dbDialogo.update(_key,input);
      var dialogo = await dbDialogo.document(resultados._key);
      return dialogo;
   };

   async function deletarDialogo(_key) {
      var dbDialogo = database.collection("dialogo");
      var dialogo = await dbDialogo.document(_key);
      var resultados = await dbDialogo.remove(_key);
      return dialogo;
   }

   return dialogo;
}
