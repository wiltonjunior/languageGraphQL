module.exports = function (app) {
  var graphql = app.get("graphql");
  var database = app.get("database");
  var model = app.model.type.administrador;
  var modelInput = app.model.typeInput.administrador;

  var administrador = {};

  administrador.salvar = {
    type : model,
    args : {
      input : {
        type : new graphql.GraphQLNonNull(modelInput)
      }
    },
    resolve : function (_,args) {
       var res = salvarAdministrador(args.input);
       return res;
    }
  };


  administrador.editar = {
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
      var res = editarAluno(args._key,args.input);
      return res;
    }
  };

  administrador.deletar = {
    type : model,
    args : {
      _key : {
        type : graphql.GraphQLString
      }
    },
    resolve : function (_,args) {
       var res = deletarAdministrador(args._key);
       return res;
    }
  }

  async function salvarAdministrador(input) {
     var dbAdministrador = database.collection("administrador");
     input.status = 2;
     input.caminhoImagem = "/imagem/usuario.jpg";
     var resultados = await dbAdministrador.save(input);
     var administrador = await dbAdministrador.document(resultados._key);
     return administrador;
  };

  async function editarAdministrador(_key,input) {
     var dbAdministrador = database.collection("administrador");
     var resultados = await dbAdministrador.update(_key,input);
     var administrador = await dbAdministrador.document(resultados._key);
     return administrador;
  };

  async function deletarAdministrador(_key) {
    var dbAdministrador = database.collection("administrador");
    var administrador = await dbAdministrador.document(_key);
    var resultados = await dbAdministrador.remove(_key);
    return administrador;
  }


  return administrador;
}
