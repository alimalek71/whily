var bluebirdPromise = require('bluebird')

var promiseWhile = function (condition, action) {
    var resolver = new bluebirdPromise.defer();

    var loop = function () {
        if (!condition()) return resolver.resolve();
        return bluebirdPromise.cast(action())
            .then(loop)
            .catch(resolver.reject)
    };

    process.nextTick(loop);

    return resolver.promise;
}

module.exports = {
    while: promiseWhile
}
