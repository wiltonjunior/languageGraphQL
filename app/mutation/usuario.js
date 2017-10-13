module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.usuario;
   var modelInput = app.model.typeInput.usuario;

   var usuario = {};

   usuario.salvar = {
     type : model,
     args : {
       input : {
         type : modelInput
       }
     },
     resolve : function (_,args) {
        var res = salvarUsuario(args.input);
        return res;
     }
   };

   usuario.editar = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       },
       input : {
         type : modelInput
       }
     },
     resolve : function (_,args) {
        var res = editarUsuario(args._key,args.input);
        return res;
     }
   };

   usuario.deletar = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
        var res = deletarUsuario(args._key);
        return res;
     }
   };

   async function salvarUsuario(input) {
      var dbUsuario = database.collection("usuario");
      input.status = 1;
      input.caminhoImagem = "/imagem/usuario.jpg";
      var resultados = await dbUsuario.save(input);
      var usuario = await dbUsuario.document(resultados._key);
      return usuario;
   };

   async function editarUsuario(id,input) {
      var dbUsuario = database.collection("usuario");
      var resultados = await dbUsuario.update(id,input);
      var usuario = await dbUsuario.document(resultados._key);
      return usuario;
   };

   async function deletarUsuario(id) {
      var dbUsuario = database.collection("usuario");
      var usuario = await dbUsuario.document(id);
      var resultados = await dbUsuario.remove(id);
      return usuario;
   }

   return usuario;

}
