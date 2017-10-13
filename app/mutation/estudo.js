module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.estudo;

   var estudo = {};

   estudo.salvar = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       },
       idIdioma : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
         var res = salvarEstudo(args._key,args.idIdioma);
         return res;
     }
   };

   estudo.editar = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       },
       idIdioma : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
        var res = editarEstudo(args._key,args.idIdioma);
        return res;
     }
   };

   estudo.deletar = {
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

   async function salvarEstudo(id,idIdioma) {
      var dbEstudo = database.collection("estudo");
      var estudoUsuario = await database.query("FOR estudo IN estudo FILTER estudo._key == @id RETURN estudo",{'id' : id});
      if(estudoUsuario._result[0]==null) {
        var resultados = await dbEstudo.save({'_key' : id,'idIdioma' : idIdioma});
        var estudo = await dbEstudo.document(resultados._key);
        return estudo;
      }
      else {
        var idiomas = []
        var valor = Array.isArray(estudoUsuario._result[0].idIdioma);
        if (valor==true) {
           idiomas = estudoUsuario._result[0].idIdioma;
           var pos = idiomas.indexOf(idIdioma);
           if(pos < 0) {
             idiomas.push(idIdioma);
           }
        }
        else {
           if(estudoUsuario._result[0].idIdioma!=idIdioma) {
             idiomas.push(estudoUsuario._result[0].idIdioma);
             idiomas.push(idIdioma);
           }
           else {
             idiomas = estudoUsuario._result[0].idIdioma;
           }
        }
        var resultados = await dbEstudo.update(id,{'idIdioma' : idiomas});
        var estudo = await dbEstudo.document(resultados._key);
        return estudo;
      }
   };

   async function editarEstudo(id,idIdioma) {
      var dbEstudo = database.collection("estudo");
      var estudoIdioma = await database.query("FOR estudo IN estudo FILTER estudo._key == @id RETURN estudo",{'id' : id});
      var valor = Array.isArray(estudoIdioma._result[0].idIdioma);
      if(valor==true) {
        var idiomas = [];
        idiomas = estudoIdioma._result[0].idIdioma;
        var pos = idiomas.indexOf(idIdioma);
        idiomas.splice(pos,1);
        if(idiomas.length==1) {
          idiomas = idiomas[0];
        }
        var resultados = await dbEstudo.update(id,{'idIdioma' : idiomas});
        var estudo = await dbEstudo.document(resultados._key);
        return estudo;
      }
      else {
        var estudo = await dbEstudo.document(id);
        var resultados = await dbEstudo.remove(id);
        return estudo;
      }
   };

   async function deletarEstudo(id) {
      var dbEstudo = database.collection("estudo");
      var estudo = await dbEstudo.document(id);
      var resultados = await dbEstudo.remove(id);
      return estudo;
   }



   return estudo;
}
