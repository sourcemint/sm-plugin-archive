
exports.for = function(API, plugin) {

    plugin.resolveLocator = function(locator, options, callback) {
        var self = this;

        if (!locator.url) {
            locator.url = locator.descriptor.pointer;
        }

        if (!locator.hasOwnProperty("getLocation")) {
            locator.getLocation = function(type) {
                var locations = {
                    "pointer": locator.url
                };
                if (
                    /\.zip$/.test(locator.url) ||
                    // HACK: We should ask all plugins to match uri.
                    /github\.com\/[^\/]*\/[^\/]*\/zipball\//.test(locator.url)
                ) {
                    locations.archive = locations.zip = locator.url;
                } else
                if (
                    /(\.tgz|\.tar\.gz)$/.test(locator.url) ||
                    // HACK: We should ask all plugins to match uri.
                    /github\.com\/[^\/]*\/[^\/]*\/tarball\//.test(locator.url)
                ) {
                    locations.archive = locations.gzip = locator.url;
                } else
                if (/(\.tar\.bz2)$/.test(locator.url)) {
                    locations.archive = locations.bzip = locator.url;
                } else
                if (/(\.7z)$/.test(locator.url)) {
                    locations.archive = locations["7zip"] = locator.url;
                }
                return (type)?locations[type]:locations;
            }
        }

        return callback(null, locator);
    }
}
