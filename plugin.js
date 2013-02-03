
exports.for = function(API, plugin) {

    plugin.resolveLocator = function(locator, options, callback) {
        var self = this;

        if (!locator.url) {
            locator.url = locator.descriptor.pointer;
        }

        locator.getLocation = function(type) {
            var locations = {
                "pointer": locator.url
            };
            if (/\.zip$/.test(locator.url)) {
                locations.zip = locator.url;
            } else
            if (/(\.tgz|\.tar\.gz)$/.test(locator.url)) {
                locations.gzip = locator.url;
            } else
            if (/(\.tar\.bz2)$/.test(locator.url)) {
                locations.bzip = locator.url;
            } else
            if (/(\.7z)$/.test(locator.url)) {
                locations["7zip"] = locator.url;
            }
            return (type)?locations[type]:locations;
        }

        return callback(null, locator);
    }
}
