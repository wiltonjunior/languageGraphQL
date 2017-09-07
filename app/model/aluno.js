module.exports = function (app) {
   var graphql = app.get("graphql");
   var aluno = {};

   aluno.type = new graphql.GraphQLObjectType({
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

   aluno.typeInput = new graphql.GraphQLInputObjectType({
     name : "AlunoInput",
     fields : {
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

   return aluno;
}
