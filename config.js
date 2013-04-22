module.exports = {
    db: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        port: '3306'
    },
    command: {
        mysql_restart: 'sudo sh /opt/wordpress-3.4-0/ctlscript.sh restart',
        timeout : 600000
    }
};