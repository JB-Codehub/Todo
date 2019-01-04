module.exports = {
    dbuser: "krdsUser",
    dbpwd: "krdsUser@123",
    dbServer: "ds015760.mlab.com",
    dbport: 15760,
    dbname: "todolist",
    url() {
        return `mongodb://${this.dbServer}:${this.dbport}/${this.dbname}`
    }
    
}
