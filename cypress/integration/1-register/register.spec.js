/* eslint-disable no-undef */
/// <reference types="cypress" />
import faker from "faker";

describe("SignUp", () => {
  it("should sign up successfully", () => {
    cy.visit("http://localhost:3000/cadastro");

    cy.get("input[placeholder=Nome]").type(faker.name.findName());
    cy.get("input[placeholder=E-mail]").type(faker.internet.email());
    cy.get("input[placeholder=Senha]").type("12345678");
    cy.get("input[placeholder='Confirme a senha']").type("12345678");
    cy.contains("Cadastrar").click();

    cy.url().should("equal", "http://localhost:3000/");
  });

  it("should show error message for existing email", () => {
    cy.visit("http://localhost:3000/cadastro");

    cy.get("input[placeholder=Nome]").type(faker.name.findName());
    cy.get("input[placeholder=E-mail]").type("a@a.com");
    cy.get("input[placeholder=Senha]").type("12345678");
    cy.get("input[placeholder='Confirme a senha']").type("12345678");
    cy.contains("Cadastrar").click();

    cy.contains("Email já está em uso").should("be.visible");
  });

  it("should show error message for not matching passwords", () => {
    cy.visit("http://localhost:3000/cadastro");

    cy.get("input[placeholder=Nome]").type(faker.name.findName());
    cy.get("input[placeholder=E-mail]").type(faker.internet.email());
    cy.get("input[placeholder=Senha]").type("12345678");
    cy.get("input[placeholder='Confirme a senha']").type("12345679");
    cy.contains("Cadastrar").click();

    cy.contains("Senhas não combinam").should("be.visible");
  });
});
