module.exports = function (app) {
   var graphql = app.get("graphql");
   var graphqlHTTP = app.get("graphqlHTTP");
   var query = app.query;
   var mutation = app.mutation;

   var schm = new graphql.GraphQLSchema({
     query : new graphql.GraphQLObjectType({
       name : "Query",
       fields : {
          aluno : query.aluno.listarAluno,
          alunos : query.aluno.listar,
          administrador : query.administrador.listarAdministrador,
          administradores : query.administrador.listar,
          empresa : query.empresa.listarEmpresa,
          empresas : query.empresa.listar,
          regiao : query.regiao.listarRegiao,
          regioes : query.regiao.listar,
          idioma : query.idioma.listarIdioma,
          idiomas : query.idioma.listar,
          termo : query.termos.listarTermo,
          termos : query.termos.listar,
          autor : query.autor.listarAutor,
          autores : query.autor.listar,
          ranking : query.autor.ranking,
          avaliacao : query.autor.avaliacao,
          contrato : query.contrato.listarContrato,
          contratos : query.contrato.listar,
          contratoAtivo : query.contrato.ativo,
          contratoExpirado : query.contrato.expirado,
          licao : query.licao.listarLicao,
          licoes : query.licao.listar,
          licaoSelecionadas : query.licao.selecionadas,
          nivel : query.nivel.listarNivel,
          niveis : query.nivel.listar,
          situacao : query.situacao.listarSituacao,
          situacoes : query.situacao.listar,
          dialogo : query.dialogo.listarDialogo,
          dialogos : query.dialogo.listar
       }
     }),
     mutation : new graphql.GraphQLObjectType({
       name : "Mutation",
       fields : {
          adicionarAluno : mutation.aluno.salvar,
          editarAluno : mutation.aluno.editar,
          deletarAluno : mutation.aluno.deletar,
          adicionarAdministrador : mutation.administrador.salvar,
          editarAdministrador : mutation.administrador.editar,
          deletarAdministrador : mutation.administrador.deletar,
          adicionarAutor : mutation.autor.salvar,
          editarAutor : mutation.autor.editar,
          deletarAutor : mutation.autor.deletar,
          adicionarContrato : mutation.contrato.salvar,
          editarContrato : mutation.contrato.editar,
          deletarContrato : mutation.contrato.deletar,
          adicionarContratoTermo : mutation.contrato.adicionarTermos,
          deletarContratoTermo : mutation.contrato.deletarTermos,
          adicionarDialogo : mutation.dialogo.salvar,
          editarDialogo : mutation.dialogo.editar,
          deletarDialogo : mutation.dialogo.deletar,
          adicionarEmpresa : mutation.empresa.salvar,
          editarEmpresa : mutation.empresa.editar,
          deletarEmpresa : mutation.empresa.deletar,
          adicionarIdioma : mutation.idioma.salvar,
          editarIdioma : mutation.idioma.editar,
          deletarIdioma : mutation.idioma.deletar,
          adicionarLicao : mutation.licao.salvar,
          editarLicao : mutation.licao.editar,
          deletarLicao : mutation.licao.deletar,
          avaliarLicao : mutation.licao.avaliar,
          adicionarNivel : mutation.nivel.salvar,
          editarNivel : mutation.nivel.editar,
          deletarNivel : mutation.nivel.deletar,
          adicionarRegiao : mutation.regiao.salvar,
          editarRegiao : mutation.regiao.editar,
          deletarRegiao : mutation.regiao.deletar,
          adicionarSituacao : mutation.situacao.salvar,
          editarSituacao : mutation.situacao.editar,
          deletarSituacao : mutation.situacao.deletar,
          adicionarTermos : mutation.termos.salvar,
          editarTermos : mutation.termos.editar,
          deletarTermos : mutation.termos.deletar
       }
     })
   })

   app.use("/graphql",graphqlHTTP({schema : schm, graphiql: true,pretty: true}));

}
