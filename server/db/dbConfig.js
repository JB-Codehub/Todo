module.exports = {
    dbuser: "*",
    dbpwd: "*",
    dbServer: "*",
    dbport: 0,
    dbname: "todolist",
    url() {
        return `mongodb://${this.dbServer}:${this.dbport}/${this.dbname}`
    }

}
