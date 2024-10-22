describe('ServeRest API - Produtos', () => {
  it('GET - Deve retornar status 200 ao buscar produtos', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos',
      qs: { nome: '' }  // Query string params
    }).then((response) => {
      // Valida o status 200
      expect(response.status).to.eq(200)

      // Validações adicionais úteis
      expect(response.body).to.not.be.null
      expect(response.body.quantidade).to.be.a('number')
      expect(response.body.produtos).to.be.an('array')
    })
  })

  it('GET - Deve retornar produtos filtrados por nome', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos',
      qs: { nome: 'Samsung' }  // Exemplo de filtro por nome
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.produtos).to.be.an('array')

      // Verifica se os produtos retornados contêm o nome buscado
      response.body.produtos.forEach(produto => {
        expect(produto.nome.toLowerCase()).to.include('samsung')
      })
    })
  })

  it('GET produtos - status 200', () => {
    cy.request('GET', 'https://serverest.dev/produtos?nome=')
      .its('status')
      .should('equal', 200)
  })

    it('POST login - validar status 200', () => {
      const numeroAleatorio = Math.floor(Math.random() * 1000)
      const usuario = {
        nome: `Usuario Teste ${numeroAleatorio}`,
        email: `teste${numeroAleatorio}@teste.com`,
        senha: `senha${numeroAleatorio}`
      }

      // Primeiro cadastra o usuário
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: {
          nome: usuario.nome,
          email: usuario.email,
          password: usuario.senha,
          administrador: "true"
        }
      }).then(() => {
        // Depois faz o login com o usuário criado
        cy.request({
          method: 'POST',
          url: 'https://serverest.dev/login',
          body: {
            email: usuario.email,
            password: usuario.senha
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('authorization')
        })
      })
    })
  })





