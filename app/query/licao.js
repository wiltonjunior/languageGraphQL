module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.licao;

   var licao = {};

   licao.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   licao.listarLicao = {
     type : model,
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

   licao.selecionadas = {
     type : new graphql.GraphQLList(model),
     args : {
        idIdioma : {
          type : graphql.GraphQLString
        },
        idNivel : {
          type : graphql.GraphQLString
        },
        idSituacao : {
          type : graphql.GraphQLString
        }
     },
     resolve : function (_,args) {
        var res = selecionar(args.idIdioma,args.idNivel,args.idSituacao);
        return res;
     }
   };

   async function listar() {
     var resultados = await database.query("FOR licao IN licao RETURN licao");
     return resultados._result;
   };


   async function buscar(id) {
     var resultados = await database.query("FOR licao IN licao FILTER licao._key == @id RETURN licao",{'id' : id});
     return resultados._result[0];
   };

   async function selecionar(idIdioma,idNivel,idSituacao) {
      var resultados = await database.query("FOR licao IN licao FILTER licao.idIdioma == @idIdioma and licao.idNivel == @idNivel and licao.idSituacao == @idSituacao RETURN licao",{'idIdioma' : idIdioma,'idNivel' : idNivel,'idSituacao' : idSituacao});
      return resultados._result;
   }

   return licao;
}
