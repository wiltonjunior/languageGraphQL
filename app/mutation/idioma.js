module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.idioma;
   var modelInput = app.model.typeInput.idioma;

   var idioma = {};

   idioma.salvar = {
     type : model,
     args : {
       input : {
         type : new graphql.GraphQLNonNull(modelInput)
       }
     },
     resolve : function (_,args) {
        var res = salvarIdioma(args.input);
        return res;
     }
   };

   idioma.editar = {
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
        var res = editarIdioma(args._key,args.input);
        return res;
     }
   };

   idioma.deletar = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
        var res = deletarIdioma(args._key);
        return res;
     }
   };

   async function salvarIdioma(input) {
      var dbIdioma = database.collection("idioma");
      var resultados = await dbIdioma.save(input);
      var idioma = await dbIdioma.document(resultados._key);
      return idioma;
   };

   async function editarIdioma(_key,input) {
      var dbIdioma = database.collection("idioma");
      var resultados = await dbIdioma.update(_key,input);
      var idioma = await dbIdioma.document(resultados._key);
      return idioma;
   };

   async function deletarIdioma(_key) {
      var dbIdioma = database.collection("idioma");
      var idioma = await dbIdioma.document(_key);
      var resultados = await dbIdioma.remove(_key);
      return idioma;
   }


   return idioma;
}
