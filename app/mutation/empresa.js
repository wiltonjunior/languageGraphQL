module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.empresa;

   var empresa = {};

   empresa.salvar = {
     type : model.type,
     args : {
       input : {
         type : new graphql.GraphQLNonNull(model.typeInput)
       }
     },
     resolve : function (_,args) {
        var res = salvarEmpresa(args.input);
        return res;
     }
   };


   empresa.editar = {
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
        var res = editarEmpresa(args._key,args.input);
        return res;
     }
   };

   empresa.deletar = {
     type : model.type,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
        var res = deletarEmpresa(args._key);
        return res;
     }
   };

   async function salvarEmpresa(input) {
      var dbEmpresa = database.collection("empresa");
      var resultados = await dbEmpresa.save(input);
      var empresa = await dbEmpresa.document(resultados._key);
      return empresa;
   };


   async function editarEmpresa(_key,input) {
      var dbEmpresa = database.collection("empresa");
      var resultados = await dbEmpresa.update(_key,input);
      var empresa = await dbEmpresa.document(resultados._key);
      return empresa;
   };


   async function deletarEmpresa(_key) {
      var dbEmpresa = database.collection("empresa");
      var empresa = await dbEmpresa.document(_key);
      var resultados = await dbEmpresa.remove(_key);
      return empresa;
   }

   return empresa;

}
