/// <reference types="cypress-xpath" />
/// <reference types="cypress" />


describe('Serverest', () => {
  it('Validar URL pagina inicial', () => {
    cy.visit('/')
    cy.url().should('eq', 'https://front.serverest.dev/login/')
  })

  it('Verificar src da imagem', () => {
    cy.visit('/')
    cy.get('img')
      .should('have.attr', 'src')
      .and('include', '/static/media/serverestlogo1.532833ba.png')
  })

  it('Validar escrita Login', () => {
    cy.visit('/')
    cy.contains('h1', 'Login').should('contain.text', 'Login')
  });

  it('Validar Input Email', () => {
    cy.visit('/')
    cy.get('#email').should('exist')
  });

  it('Validar Input Senha', () => {
    cy.visit('/')
    cy.get('#password').should('exist')
  });

  it('Validar botão Entrar na tela principal', () => {
    cy.visit('/')
    cy.contains('button', 'Entrar').should('be.visible')
  });

  it('Validar fluxo para cadastrar no link (Cadastre-se)', () => {


    cy.visit('/')
    cy.get('[data-testid="cadastrar"]').click()


    const numeroAleatorio = Math.floor(Math.random() * 1000)
    const usuario = {
      nome: `Usuario Teste ${numeroAleatorio}`,
      email: `teste${numeroAleatorio}@teste.com`,
      senha: `senha${numeroAleatorio}`
    }

    // Preenchendo o formulário
    cy.get('[data-testid="nome"]').type(usuario.nome)
    cy.get('[data-testid="email"]').type(usuario.email)
    cy.get('#password').type(usuario.senha)

    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('a', 'Cadastro realizado com sucesso').should('contain.text', 'Cadastro realizado com sucesso')
  })
});