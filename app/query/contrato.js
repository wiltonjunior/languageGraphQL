module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.contrato;

   var contrato = {};

   contrato.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   contrato.listarContrato = {
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

   contrato.ativo = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = contratoAtivo();
        return res;
     }
   };

   contrato.expirado = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = contratoExpirado();
        return res;
     }
   };

   async function listar() {
     var resultados = await database.query("FOR contrato IN contrato RETURN contrato");
     return resultados._result;
   };

   async function buscar(id) {
     var resultados = await database.query("FOR contrato IN contrato FILTER contrato._key == @id RETURN contrato",{'id' : id});
     return resultados._result[0];
   };

   async function contratoAtivo() {
      var today = new Date();
      var data = dataAtual(today);
      var resultados = await database.query("LET ANO = (FOR contrato IN contrato RETURN {'idContrato' : contrato._key,'dataTermino' : contrato.dataTermino, 'data' : DATE_DIFF(@data,contrato.dataTermino,'y',false)}) LET MES = (FOR a IN ANO FILTER a.data >= 0 RETURN {'idContrato' : a.idContrato, 'dataTermino' : a.dataTermino, 'data' : DATE_DIFF(@data,a.dataTermino,'m',false)}) LET DIA = (FOR m IN MES FILTER m.data >= 0 RETURN {'idContrato' : m.idContrato, 'dataTermino' : m.dataTermino, 'data' : DATE_DIFF(@data,m.dataTermino,'d',false)}) LET cont = (FOR contrato IN contrato FOR d IN DIA FILTER d.data >= 0 and d.idContrato == contrato._key RETURN contrato) RETURN cont",{'data' : data});
      return resultados._result[0];
   };

   async function contratoExpirado() {
      var today = new Date();
      var data = dataAtual(today);
      var resultados = await database.query("LET ANO = (FOR contrato IN contrato RETURN {'idContrato' : contrato._key,'dataTermino' : contrato.dataTermino, 'data' : DATE_DIFF(@data,contrato.dataTermino,'y',false)}) LET MES = (FOR a IN ANO FILTER a.data <= 0 RETURN {'idContrato' : a.idContrato, 'dataTermino' : a.dataTermino, 'data' : DATE_DIFF(@data,a.dataTermino,'m',false)}) LET DIA = (FOR m IN MES FILTER m.data <= 0 RETURN {'idContrato' : m.idContrato, 'dataTermino' : m.dataTermino, 'data' : DATE_DIFF(@data,m.dataTermino,'d',false)}) LET cont = (FOR contrato IN contrato FOR d IN DIA FILTER d.data < 0 and d.idContrato == contrato._key RETURN contrato) RETURN cont",{'data' : data});
      return resultados._result[0];
   }

   function dataAtual(today) {
      var dd = today.getDate();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();
      var data = month + "-" + dd + "-" + year;
      return data;
   }

   return contrato;
}
