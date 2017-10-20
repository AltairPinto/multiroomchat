module.exports = function(application) {
    application.get('/', function(req, res) {
        try {
            application.app.controllers.index.home(application, req, res);
        } catch (error) {
            application.controllers.index.home(application, req, res);
        }
    });
}