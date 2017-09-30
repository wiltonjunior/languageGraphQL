module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.autor;
   var ranking = app.model.type.ranking;

   var autor = {};

   autor.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   autor.listarAutor = {
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

   autor.ranking = {
     type : new graphql.GraphQLList(ranking),
     resolve : function (_,args) {
        var res = rankingAutor();
        return res;
     }
   };

   autor.avaliacao = {
     type : ranking,
     args : {
        _key : {
           type : graphql.GraphQLString
        }
     },
     resolve : function (_,args) {
        var res = avaliacao(args._key);
        return res;
     }
   };

   async function listar() {
      var resultados = await database.query("FOR autor IN autor RETURN autor");
      return resultados._result;
   };

   async function buscar(id) {
     var resultados = await database.query("FOR autor IN autor FILTER autor._key == @id RETURN autor",{'id' : id});
     return resultados._result[0];
   };

   async function rankingAutor() {
     var resultados = await database.query("FOR autor IN autor FOR licao IN licao FILTER licao.idAutor == autor._key COLLECT nomeAutor = autor.nomeAutor AGGREGATE md = SUM(licao.avaliacao), tt = length(licao) RETURN {'nomeAutor' : nomeAutor, 'Media' : md/tt, 'Total' : tt}");
     return resultados._result;
   }

   async function avaliacao(id) {
       var resultados = await database.query("FOR autor IN autor FOR licao IN licao FILTER autor._key == @id and licao.idAutor == autor._key COLLECT nomeAutor = autor.nomeAutor AGGREGATE md = SUM(licao.avaliacao), tt = length(licao) RETURN {'nomeAutor' : nomeAutor,'Media' : md/tt, 'Total' : tt}",{'id' : id});
       return resultados._result[0];
   }

   return autor;
}
