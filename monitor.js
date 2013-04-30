var mysql = require('mysql'),
    config = require('./config'),
    child_process = require('child_process'),
    domain = require('domain'),
    d = domain.create(),
    SendGrid = require('sendgrid').SendGrid,
    pool = mysql.createPool({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        port: config.db.port
    }),
    email = new SendGrid(config.sendgrid.user, config.sendgrid.key);


(function watchService() {
    d.on('error', function (err) {
        sendEmail(err, 'Domain Error - LAMP restarted ' + new Date());
        var child = child_process.spawn(config.command.sudo, [config.command.sh , config.command.script, config.command.restart], {stdio: 'inherit'});
        setTimeout(watchService, config.command.timeout);
    });

    d.run(function () {
        (function checkmysql() {
            pool.getConnection(function (err, connection) {
                if (err) {
                    sendEmail(err, 'Error from mysql  - LAMP restarted ' + new Date());
                    var child = child_process.spawn(config.command.sudo, [config.command.sh , config.command.script, config.command.restart], {stdio: 'inherit'});
                }
                else {
                    console.log('pass' + new Date());
                    connection.end();
                }

                setTimeout(checkmysql, config.command.timeout);
            });
        })();
    });

})();


function sendEmail(body, subject) {
    email.send({
        to: config.sendgrid.toemail,
        from: config.sendgrid.fromemail,
        subject: subject,
        text: body.toString() + ' ' + config.website
    }, function (success, message) {
        if (!success) {
            console.log(message);
        }
    });

}