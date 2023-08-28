const request = require("supertest"); // supertest는 HTTP 요청을 테스트하기 위한 도구
const app = require("../server"); // Express 애플리케이션을 가져옴

describe("GET /", () => {
  it("should respond with status code 200", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
