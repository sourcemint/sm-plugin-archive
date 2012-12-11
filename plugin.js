
exports.for = function(API, plugin) {

    plugin.resolveLocator = function(locator, options) {
        var self = this;

		locator.url = locator.descriptor.pointer;

        locator.getLocation = function(type) {
            var locations = {
                "pointer": locator.url
            };
            if (/\.zip$/.test(locator.url)) {
                locations.zip = locator.url;
            } else
            if (/(\.tgz|\.tar\.gz)$/.test(locator.url)) {
                locations.tar = locator.url;
            }
            return (type)?locations[type]:locations;
        }

        return self.API.Q.resolve(locator);
    }
}
