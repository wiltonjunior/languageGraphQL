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

   contrato.adicionarTermos = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       },
       idTermo : {
          type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
         var res = adicionarTermos(args._key,args.idTermo);
         return res;
     }
   };

   contrato.deletarTermos = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       },
       idTermo : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
        var res = deletarTermos(args._key,args.idTermo);
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
   };

   async function adicionarTermos(_key,idTermo) {
      var dbContrato = database.collection("contrato");
      var resultados = await dbContrato.documet(_key);
      if(resultados.idTermo==null) {
        resultados.idTermo = idTermo;
      }
      else {
        var valor = Array.isArray(resultados.idTermo);
        if (valor==true) {
           var update = [];
           update = resultados.idTermo;
           update.push(idTermo);
           resultados.idTermo = update;
        }
        else {
          var update = [];
          update.push(resultados.idTermo);
          update.push(idTermo);
          resultados.idTermo = update;
        }
      }
      var novoContrato = await dbContrato.update(_key,resultados);
      var contrato = await dbContrato.document(_key);
      return contrato;
   };

   async function deletarTermos(_key,idTermo) {
      var dbContrato = database.collection("contrato");
      var resultados = await dbContrato.document(_key);
      var valor = Array.isArray(resultados.idTermo);
      if (valor==true) {
         var pos = resultados.idTermo.indexOf(idTermo);
         var update = [];
         update = resultados.idTermo;
         update.splice(pos,1);
         if(update.length==1) {
           resultados.idTermo = update[0];
         }
         else {
           resultados.idTermo = update;
         }
      }
      else {
        resultados.idTermo = null;
      }
      var novoContrato = await dbContrato.update(_key,resultados);
      var contrato = await dbContrato.document(_key);
      return contrato;
   }

   return contrato;
}
