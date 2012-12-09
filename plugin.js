
exports.for = function(API, plugin) {

    plugin.resolveLocator = function(locator, options) {
        var self = this;

		locator.url = locator.descriptor.pointer;

        locator.getLocation = function(type) {
            var locations = {
                "pointer": locator.url
            };
            return (type)?locations[type]:locations;
        }

        return self.API.Q.resolve(locator);
    }
}
