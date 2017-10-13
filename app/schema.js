module.exports = function (app) {
   var graphql = app.get("graphql");
   var graphqlHTTP = app.get("graphqlHTTP");
   var auth = app.get("auth");
   var query = app.query;
   var mutation = app.mutation;

   var schm = new graphql.GraphQLSchema({
     query : new graphql.GraphQLObjectType({
       name : "Query",
       description: "API GraphQL language adviser",
       fields : {
          usuario : query.usuario.listarUsuario,
          usuarios : query.usuario.listar,
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
          ranking : query.usuario.ranking,
          avaliacao : query.usuario.avaliacao,
          contrato : query.contrato.listarContrato,
          contratos : query.contrato.listar,
          contratoAtivo : query.contrato.ativo,
          contratoExpirado : query.contrato.expirado,
          licao : query.licao.listarLicao,
          licoes : query.licao.listar,
          licoesSelecionadas : query.licao.selecionadas,
          nivel : query.nivel.listarNivel,
          niveis : query.nivel.listar,
          situacao : query.situacao.listarSituacao,
          situacoes : query.situacao.listar,
          estudo : query.estudo.listarEstudo,
          estudos : query.estudo.listar,
          dialogo : query.dialogo.listarDialogo,
          dialogos : query.dialogo.listar
       }
     }),
     mutation : new graphql.GraphQLObjectType({
       name : "Mutation",
       description: "API GraphQL language adviser",
       fields : {
          adicionarUsuario : mutation.usuario.salvar,
          editarUsuario : mutation.usuario.editar,
          deletarUsuario : mutation.usuario.deletar,
          adicionarAdministrador : mutation.administrador.salvar,
          editarAdministrador : mutation.administrador.editar,
          deletarAdministrador : mutation.administrador.deletar,
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
          adicionarEstudo : mutation.estudo.salvar,
          editarEstudo : mutation.estudo.editar,
          deletarEstudo : mutation.estudo.deletar,
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

   app.use("/graphql", auth.authenticate(), graphqlHTTP({schema : schm, graphiql: true,pretty: true}));

}
