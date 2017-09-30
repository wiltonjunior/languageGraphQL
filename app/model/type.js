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
       autor : {
         type : type.autor,
         resolve : async function (licao) {
            var autor = await database.query("FOR autor IN autor FILTER autor._key == @id RETURN autor",{'id' : licao.idAutor});
            return autor._result[0];
         }
       },
       idioma : {
         type : type.idioma,
         resolve : async function (licao) {
            var idioma = await database.query("FOR idioma IN idioma FILTER idioma._key == @id RETURN idioma",{'id' : licao.idIdioma});
            return idioma._result[0];
         }
       },
       nivel : {
         type : type.nivel,
         resolve : async function (licao) {
            var nivel = await database.query("FOR nivel IN nivel FILTER nivel._key == @id RETURN nivel",{'id' : licao.idNivel});
            return nivel._result[0];
         }
       },
       situacao : {
         type : type.situacao,
         resolve : async function (licao) {
            var situacao = await database.query("FOR situacao IN situacao FILTER situacao._key == @id RETURN situacao",{'id' : licao.idSituacao});
            return situacao._result[0];
         }
       }
     }
   });

   type.dialogo = new graphql.GraphQLObjectType({
      name : "Dialogo",
      fields : {
        _key : {type : graphql.GraphQLString},
        texto : {type : graphql.GraphQLString},
        licao : {
          type : type.licao,
          resolve : async function (dialogo) {
              var licao = await database.query("FOR licao IN licao FILTER licao._key == @id RETURN licao",{'id' : dialogo.idLicao});
              return licao._result[0];
          }
        }
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

   type.contrato = new graphql.GraphQLObjectType({
     name : "Contrato",
     fields : {
       _key : {type : graphql.GraphQLString},
       dataInicio : {type : graphql.GraphQLString},
       dataTermino : {type : graphql.GraphQLString},
       palavraChave : {type : graphql.GraphQLString},
       empresa : {
         type : type.empresa,
         resolve : async function (contrato) {
            var empresa = await database.query("FOR empresa IN empresa FILTER empresa._key == @id RETURN empresa",{'id' : contrato.idEmpresa});
            return empresa._result[0];
         }
       },
       regiao : {
         type : type.regiao,
         resolve : async function (contrato) {
            var regiao = await database.query("FOR regiao IN regiao FILTER regiao._key == @id RETURN regiao",{'id' : contrato.idRegiao});
            return regiao._result[0];
         }
       },
       termos : {
         type : new graphql.GraphQLList(type.termos),
         resolve : async function (contrato) {
            var i;
            var termos = [];
            for(i=0;i<contrato.idTermo.length;i++) {
               var reslt = await database.query("FOR termos IN termos FILTER termos._key == @id RETURN termos",{'id' : contrato.idTermo[i]});
               termos.push(reslt._result[i]);
            }
            return termos;
         }
       }
     }
   });

    type.ranking = new graphql.GraphQLObjectType({
      name : "Ranking",
      fields : {
        nomeAutor : {type : graphql.GraphQLString},
        media : {type : graphql.GraphQLFloat},
        total : {type : graphql.GraphQLInt}
      }
    });



   return type;

}
