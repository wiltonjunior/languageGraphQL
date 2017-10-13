module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.usuario;
   var modelRanking = app.model.type.ranking;

   var usuario = {};

   usuario.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   usuario.listarUsuario = {
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

   usuario.ranking = {
     type : new graphql.GraphQLList(modelRanking),
     resolve : function (_,args) {
        var res = ranking();
        return res;
     }
   };

   usuario.avaliacao = {
      type : modelRanking,
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
      var resultados = await database.query("FOR usuario IN usuario RETURN usuario");
      return resultados._result;
   };

   async function buscar(id) {
      var resultados = await database.query("FOR usuario IN usuario FILTER usuario._key == @id RETURN usuario",{'id' : id});
      return resultados._result[0];
   };

   async function ranking() {
      var resultados = await database.query("FOR usuario IN usuario FOR licao IN licao FILTER licao.idUsuario == usuario._key COLLECT idUsuario = usuario._key, nomeUsuario = usuario.nomeUsuario, caminhoImagem = usuario.caminhoImagem AGGREGATE md = SUM(licao.avaliacao), tt = length(licao) RETURN {'nomeUsuario' : nomeUsuario, 'Media' : md/tt, 'Total' : tt, 'caminhoImagem' : caminhoImagem}");
      return resultados._result;
   };

   async function avaliacao(id) {
      var resultados = await database.query("FOR usuario IN usuario FOR licao IN licao FILTER usuario._key == @id and licao.idUsuario == usuario._key COLLECT nomeUsuario = usuario.nomeUsuario AGGREGATE md = SUM(licao.avaliacao), tt = length(licao) RETURN {'nomeUsuario' : nomeUsuario,'Media' : md/tt, 'Total' : tt}",{'id' : id});
      return resultados._result[0];
   }


   return usuario;
}
