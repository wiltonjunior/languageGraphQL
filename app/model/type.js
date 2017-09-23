module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");

   var type = {};

   type.administrador = new graphql.GraphQLObjectType({
     name : "Administrador",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeAdministrador : {type : graphql.GraphQLString},
       emailAdministrador : {type : graphql.GraphQLString},
       senhaAdministrador : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString},
       status : {type : graphql.GraphQLInt}
     }
   });

   type.aluno = new graphql.GraphQLObjectType({
     name : "Aluno",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeAluno : {type : graphql.GraphQLString},
       emailAluno : {type : graphql.GraphQLString},
       senhaAluno : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString},
       status : {type : graphql.GraphQLInt}
     }
   });

   type.idioma = new graphql.GraphQLObjectType({
     name : "Idioma",
     fields : {
       _key : {type : graphql.GraphQLString},
       idioma : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString}
     }
   });

   type.autor = new graphql.GraphQLObjectType({
     name : "Autor",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeAutor : {type : graphql.GraphQLString},
       emailAutor : {type : graphql.GraphQLString},
       senhaAutor : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString},
       idioma : {
         type : type.idioma,
         resolve : async function (autor) {
             var idioma = await database.query("FOR idioma IN idioma FILTER idioma._key == @id RETURN idioma",{'id' : autor.idIdioma});
             return idioma._result[0];
         }
       },
       caminhoImagem : {type : graphql.GraphQLString},
       status : {type : graphql.GraphQLInt}
     }
   });

   type.contrato = new graphql.GraphQLObjectType({
     name : "Contrato",
     fields : {
       _key : {type : graphql.GraphQLString},
       dataInicio : {type : graphql.GraphQLString},
       dataTermino : {type : graphql.GraphQLString},
       palavraChave : {type : graphql.GraphQLString},
       idEmpresa : {type : graphql.GraphQLString},
       idRegiao : {type : graphql.GraphQLString},
       idTermo : {type : new graphql.GraphQLList(graphql.GraphQLString)}
     }
   });

   type.dialogo = new graphql.GraphQLObjectType({
     name : "Dialogo",
     fields : {
       _key : {type : graphql.GraphQLString},
       texto : {type : graphql.GraphQLString},
       idLicao : {type : graphql.GraphQLString}
     }
   });

   type.empresa = new graphql.GraphQLObjectType({
     name : "Empresa",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeEmpresa : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       email : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       latitude : {type : graphql.GraphQLString},
       longitude : {type : graphql.GraphQLString}
     }
   });

   type.nivel = new graphql.GraphQLObjectType({
     name : "Nivel",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeNivel : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString}
     }
   });

   type.situacao = new graphql.GraphQLObjectType({
     name : "Situacao",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeSituacao : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       grupo : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString}
     }
   });

   type.licao = new graphql.GraphQLObjectType({
     name : "Licao",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeLicao : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       data : {type : graphql.GraphQLString},
       avaliacao : {type : graphql.GraphQLInt},
       quantidadeVotos : {type : graphql.GraphQLInt},
       autor : {type : type.autor},
       idioma : {type : type.idioma},
       nivel : {type : graphql.GraphQLString},
       situacao : {type : graphql.GraphQLString}
     }
   });

   type.regiao = new graphql.GraphQLObjectType({
     name : "Regiao",
     fields : {
       _key : {type : graphql.GraphQLString},
       tipoRegiao : {type : graphql.GraphQLString},
       localizacao : {type : graphql.GraphQLString}
     }
   });

   type.termos = new graphql.GraphQLObjectType({
     name : "Termos",
     fields : {
       _key : {type : graphql.GraphQLString},
       termo : {type : graphql.GraphQLString},
       idioma : {
         type : type.idioma,
         resolve : async function (termos) {
            var idioma = await database.query("FOR idioma IN idioma FILTER idioma._key == @id RETURN idioma",{'id' : termos.idIdioma});
            return idioma._result[0];
         }
       }
     }
   });


   return type;

}
