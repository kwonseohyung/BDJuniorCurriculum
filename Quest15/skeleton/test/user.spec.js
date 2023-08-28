const request = require("supertest");
const app = require("../server");
const sequelize = require("../models").sequelize;
const crypto = require("crypto");
const chai = require("chai");
const { expect } = chai;

describe("App", () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  describe("GET /user/login", () => {
    it("should respond with status code 200", (done) => {
      request(app)
        .get("/user/login")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("GET /user/sign", () => {
    it("should respond with status code 200", (done) => {
      request(app)
        .get("/user/sign")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("POST /user/sign", function () {
    it('should create a new user and redirect to "/"', async function () {
      const user = {
        userId: "testid",
        password: "testpassword",
        userName: "testname",
      };

      const salt = Math.round(new Date().valueOf() * Math.random()) + "";
      const hashPassword = crypto
        .createHash("sha512")
        .update(user.password + salt)
        .digest("hex");

      const response = await request(app)
        .post("/user/sign")
        .send({
          userId: user.userId,
          password: hashPassword,
          userName: user.userName,
        })
        .expect(302);

      //assert.strictEqual(response.header.location, "/");
      expect(response.header.location).to.equal("/");
    });

    it("should return an error if the user already exists", async function () {
      const user = {
        userId: "testid",
        password: "testpassword2",
        userName: "testname2",
      };

      const salt = Math.round(new Date().valueOf() * Math.random()) + "";
      const hashPassword = crypto
        .createHash("sha512")
        .update(user.password + salt)
        .digest("hex");
      const response = await request(app)
        .post("/user/sign")
        .send({
          userId: user.userId,
          password: hashPassword,
          userName: user.userName,
        })
        .expect(200);
      expect(response.body.exists).to.equal(1);
    });
  });
});
