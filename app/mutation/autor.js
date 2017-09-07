module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.autor;

   var autor = {};

   autor.salvar = {
     type : model.type,
     args : {
       input : {
         type : new graphql.GraphQLNonNull(model.typeInput)
       }
     },
     resolve : function (_,args) {
        var res = salvarAutor(args.input);
        return res;
     }
   };


   autor.editar = {
     type : model.type,
     args : {
       _key : {
         type : graphql.GraphQLString
       },
       input : {
         type : new graphql.GraphQLNonNull(model.typeInput)
       }
     },
     resolve : function (_,args) {
        var res = editarAutor(args._key,args.input);
        return res;
     }
   };

   autor.deletar = {
     type : model.type,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
        var res = deletarAutor(args._key);
        return res;
     }
   };

   async function salvarAutor(input) {
      var dbAutor = database.collection("autor");
      var resultados = await dbAutor.save(input);
      var autor = await dbAutor.document(resultados._key);
      return autor;
   };

   async function editarAutor(_key,input) {
      var dbAutor = database.collection("autor");
      var resultados = await dbAutor.update(_key,input);
      var autor = await dbAutor.document(resultados._key);
      return autor;
   };

   async function deletarAutor(_key) {
      var dbAutor = database.collection("autor");
      var autor = await dbAutor.document(_key);
      var resultados = await dbAutor.remove(_key);
      return autor;
   }

   return autor;
}
