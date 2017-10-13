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

   type.usuario = new graphql.GraphQLObjectType({
     name : "Usuario",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeUsuario : {type : graphql.GraphQLString},
       emailUsuario : {type : graphql.GraphQLString},
       senhaUsuario : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
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
       usuario : {
         type : type.usuario,
         resolve : async function (licao) {
            var usuario = await database.query("FOR usuario IN usuario FILTER usuario._key == @id RETURN usuario",{'id' : licao.idUsuario});
            return usuario._result[0];
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
            var valor = Array.isArray(contrato.idTermo);
            if(valor==true) {
              for(i=0;i<contrato.idTermo.length;i++) {
                 var reslt = await database.query("FOR termos IN termos FILTER termos._key == @id RETURN termos",{'id' : contrato.idTermo[i]});
                 termos.push(reslt._result[0]);
              }
            }
            else {
               var termo = await database.query("FOR termos IN termos FILTER termos._key == @id RETURN termos",{'id' : contrato.idTermo});
               termos.push(termo._result[0]);
            }
            return termos;
         }
       }
     }
   });

   type.estudo = new graphql.GraphQLObjectType({
     name : "Estudo",
     fields : {
       usuario : {
         type : type.usuario,
         resolve : async function (estudo) {
            var usuario = await database.query("FOR usuario IN usuario FILTER usuario._key == @id RETURN usuario",{'id' : estudo._key});
            return usuario._result[0];
         }
       },
       idiomas : {
         type : new graphql.GraphQLList(type.idioma),
         resolve : async function (estudo) {
            var i;
            var idiomas = [];
            var valor = Array.isArray(estudo.idIdioma);
            if(valor==true) {
              for(i=0;i<estudo.idIdioma.length;i++) {
                 var reslt = await database.query("FOR idioma IN idioma FILTER idioma._key == @id RETURN idioma",{'id' : estudo.idIdioma[i]});
                 idiomas.push(reslt._result[0]);
              }
            }
            else {
              var idioma = await database.query("FOR idioma IN idioma FILTER idioma._key == @id RETURN idioma",{'id' : estudo.idIdioma});
              idiomas.push(idioma._result[0]);
            }
            return idiomas;
         }
       }
     }
   });

    type.ranking = new graphql.GraphQLObjectType({
      name : "Ranking",
      fields : {
        nomeUsuario : {type : graphql.GraphQLString},
        Media : {type : graphql.GraphQLFloat},
        Total : {type : graphql.GraphQLInt}
      }
    });



   return type;

}
