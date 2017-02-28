module.exports = function (app, path) {
    console.log(path);

    app.get('/months', function (req, res) {
        res.json({ Name: 'Esteban' });
    });

    app.get('*', function (req, res) {
        res.sendFile(path + '/index.html');
    });
}