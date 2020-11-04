const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");

const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "Arlindo Anormalia",
      user_name: "valdirET",
      password: "1234",
    });

    const compareHash = await bcrypt.compare("1234", user.password);

    expect(compareHash).toBe(true);
  });
});
