# wepay-node

Welcome to the wepay-node library! More details will appear here as the
project matures into something that can actually be used.

## Getting a copy

Stable releases will be published to the npm database each time they are
released. You can get them by running `npm install wepay-node` or adding
a dependency to your package.json file.

The latest development release, when the first one happens, will alway
live on the branch latest-development. You can depend on that in your
project by doing the following in your package.json dependencies:

```
  "wepay-node": "git://github.com/farmdawgnation/wepay-node#latest-development"
```

Finally, if you want to be on the bleeding edge, you can depend your
project on master by removing the hash and everything after it. Since
there hasn't been a dev release yet, that's the best way to go for now.

## Version Numbers

This application mostly follows semantic versioning. Changes in the patch number
simply represent small changes (usually bugfixes). Changes in the minor
version number represent potentially breaking changes and new features
without any major changes to the API structure. The major version changing
signifies me thinking this project has reached a superb level of maturity.
