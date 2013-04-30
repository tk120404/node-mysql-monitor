module.exports = {
    db: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        port: '3306'
    },
    command: {
        sudo: 'sudo',
        sh: 'sh',
        script: '/opt/wordpress-3.5.1-1/ctlscript.sh',
        restart: 'restart',
        timeout: 60000
    },
    sendgrid: {
        user: 'user',
        key: 'password',
        fromemail: 'admin@mysite.com',
        toemail: 'me@mysite.com'
    },
    website:'www.mysite.com'
};