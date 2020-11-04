class CsvController {
  async store(req, res) {
    return res.json({ message: "ok" });
  }
}

module.exports = new CsvController();
