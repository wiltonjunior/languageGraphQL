module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.licao;

   var licao = {};

   licao.salvar = {
     type : model.type,
     args : {
       input : {
         type : new graphql.GraphQLNonNull(model.typeInput)
       }
     },
     resolve : function (_,args) {
       var res = salvarLicao(args.input);
       return res;
     }
   };

   licao.editar = {
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
        var res = editarLicao(args._key,args.input);
        return res;
     }
   };


   licao.deletar = {
     type : model.type,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
        var res = deletarLicao(args._key);
        return res;
     }
   };


   async function salvarLicao(input) {
      var dbLicao = database.collection("licao");
      var resultados = await dbLicao.save(input);
      var licao = await dbLicao.document(resultados._key);
      return licao;
   };

   async function editarLicao(_key,input) {
      var dbLicao = database.collection("licao");
      var resultados = await dbLicao.update(_key,input);
      var licao = await dbLicao.document(resultados._key);
      return licao;
   };

  async function deletarLicao(_key) {
      var dbLicao = database.collection("licao");
      var licao = await dbLicao.document(_key);
      var resultados = await dbLicao.remove(_key);
      return licao;
  }


  return licao;

}
