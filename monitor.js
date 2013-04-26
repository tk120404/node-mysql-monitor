var mysql = require('mysql'),
    config = require('./config'),
    exec = require('child_process').exec,
    domain = require('domain'),
    d = domain.create(),
    pool = mysql.createPool({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        port: config.db.port
    });

(function watchService() {
    d.on('error', function (err) {
        console.error(err);
        exec(config.command.mysql_restart, logs);
        setTimeout(watchService, config.command.timeout);
    });

    d.run(function () {
        (function checkmysql() {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error('error ' + err);
                    exec(config.command.mysql_restart, logs);
                    //send email abt the db restart.
                }
                else {
                    //  console.log('pass');
                }
                connection.end();
                setTimeout(checkmysql, config.command.timeout);
            });
        })();
    });

    function logs(error, stdout, stderr) {
        console.log(stdout);
    }
})();
