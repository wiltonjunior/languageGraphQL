module.exports = function (app) {
   var graphql = app.get("graphql");

   var typeInput = {};

   typeInput.administrador = new graphql.GraphQLInputObjectType({
     name : "AdministradorInput",
     fields : {
       nomeAdministrador : {type : graphql.GraphQLString},
       emailAdministrador : {type : graphql.GraphQLString},
       senhaAdministrador : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString}
     }
   });

   typeInput.aluno = new graphql.GraphQLInputObjectType({
     name : "AlunoInput",
     fields : {
       nomeAluno : {type : graphql.GraphQLString},
       emailAluno : {type : graphql.GraphQLString},
       senhaAluno : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString}
     }
   });

   typeInput.autor = new graphql.GraphQLInputObjectType({
     name : "AutorInput",
     fields : {
       nomeAutor : {type : graphql.GraphQLString},
       emailAutor : {type : graphql.GraphQLString},
       senhaAutor : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString},
       idIdioma : {type : graphql.GraphQLString}
     }
   });

   typeInput.contrato = new graphql.GraphQLInputObjectType({
     name : "ContratoInput",
     fields : {
       dataInicio : {type : graphql.GraphQLString},
       dataTermino : {type : graphql.GraphQLString},
       palavraChave : {type : graphql.GraphQLString},
       idEmpresa : {type : graphql.GraphQLString},
       idRegiao : {type : graphql.GraphQLString}
     }
   });

   typeInput.dialogo = new graphql.GraphQLInputObjectType({
     name : "DialogoInput",
     fields : {
       texto : {type : graphql.GraphQLString},
       idLicao : {type : graphql.GraphQLString}
     }
   });

   typeInput.empresa = new graphql.GraphQLInputObjectType({
     name : "EmpresaInput",
     fields : {
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

   typeInput.idioma = new graphql.GraphQLInputObjectType({
     name : "IdiomaInput",
     fields : {
       idioma : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString}
     }
   });

   typeInput.licao = new graphql.GraphQLInputObjectType({
     name : "LicaoInput",
     fields : {
       nomeLicao : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       data : {type : graphql.GraphQLString},
       avaliacao : {type : graphql.GraphQLInt},
       quantidadeVotos : {type : graphql.GraphQLInt},
       idAutor : {type : graphql.GraphQLString},
       idIdioma : {type : graphql.GraphQLString},
       idNivel : {type : graphql.GraphQLString},
       idSituacao : {type : graphql.GraphQLString}
     }
   });

   typeInput.nivel = new graphql.GraphQLInputObjectType({
     name : "NivelInput",
     fields : {
       nomeNivel : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString}
     }
   });

   typeInput.regiao = new graphql.GraphQLInputObjectType({
     name : "RegiaoInput",
     fields : {
       tipoRegiao : {type : graphql.GraphQLString},
       localizacao : {type : graphql.GraphQLString}
     }
   });

   typeInput.situacao = new graphql.GraphQLInputObjectType({
     name : "SituacaoInput",
     fields : {
       nomeSituacao : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       grupo : {type : graphql.GraphQLString}
     }
   });

   typeInput.termos = new graphql.GraphQLInputObjectType({
     name : "TermosInput",
     fields : {
       termo : {type : graphql.GraphQLString},
       idIdioma : {type : graphql.GraphQLString}
     }
   });



   return typeInput;

}
