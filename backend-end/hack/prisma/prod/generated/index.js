"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "UserStatus",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Petition",
    embedded: false
  },
  {
    name: "ResetPassword",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/allancontesini/hackathon-prisma/dev`
});
exports.prisma = new exports.Prisma();
