/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "ffa563dc414fb51381ac7d7168ba5594"
  }, {
    "url": "pwa-512x512.png",
    "revision": "ffa563dc414fb51381ac7d7168ba5594"
  }, {
    "url": "pwa-192x192.png",
    "revision": "59ad99fa0319199a66c2a547a1200fee"
  }, {
    "url": "index.html",
    "revision": "5a924506169d64ab82e7bc6dc4a197de"
  }, {
    "url": "icon.svg",
    "revision": "50a868175607a7301056e29e7bb0b7c6"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a2d59606d2dbfeb54f411e8960036325"
  }, {
    "url": "assets/web-Drb7hEQ1.js",
    "revision": null
  }, {
    "url": "assets/web-CUpdWvI4.js",
    "revision": null
  }, {
    "url": "assets/web-BFaanlyU.js",
    "revision": null
  }, {
    "url": "assets/web-7ubgEy3R.js",
    "revision": null
  }, {
    "url": "assets/index-Cg5GD0RN.css",
    "revision": null
  }, {
    "url": "assets/index-Ce9Lyaf8.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a2d59606d2dbfeb54f411e8960036325"
  }, {
    "url": "icon.svg",
    "revision": "50a868175607a7301056e29e7bb0b7c6"
  }, {
    "url": "pwa-192x192.png",
    "revision": "59ad99fa0319199a66c2a547a1200fee"
  }, {
    "url": "pwa-512x512.png",
    "revision": "ffa563dc414fb51381ac7d7168ba5594"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "ffa563dc414fb51381ac7d7168ba5594"
  }, {
    "url": "manifest.webmanifest",
    "revision": "edbf421d37e6725c38a4c897aa5f07b6"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
