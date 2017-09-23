module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.contrato;
   var modelInput = app.model.typeInput.contrato;

   var contrato = {};

   contrato.salvar = {
     type : model,
     args : {
       input : {
         type : new graphql.GraphQLNonNull(modelInput)
       }
     },
     resolve : function (_,args) {
        var res = salvarContrato(args.input);
        return res;
     }
   };


   contrato.editar = {
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
       var res = editarContrato(_key,input);
       return res;
     }
   };

   contrato.deletar = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
       var res = deletarContrato(_key);
       return res;
     }
   };

   async function salvarContrato(input) {
      var dbContrato = database.collection("contrato");
      var resultados = await dbContrato.save(input);
      var contrato = await dbContrato.document(resultados._key);
      return contrato;
   };

   async function editarContrato(_key,input) {
      var dbContrato = database.collection("contrato");
      var resultados = await dbContrato.update(_key,input);
      var contrato = await dbContrato.document(_key);
      return contrato;
   };

   async function deletarContrato(_key) {
      var dbContrato = database.collection("contrato");
      var contrato = await dbContrato.document(_key);
      var resultados = await dbContrato.remove(_key);
      return contrato;
   }

   return contrato;
}
