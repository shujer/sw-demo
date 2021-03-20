/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

// 监听来自网页客户端的消息
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  var promise = self.clients.matchAll().then(function (clientList) {
    var senderID = event.source.id;
    // 消息不传递给发送者本身
    clientList.forEach(function (client) {
      if (client.id === senderID) {
        return;
      }
      client.postMessage({
        client: senderID,
        message: event.data,
      });
    });
  });
  if (event.waitUntil) {
    event.waitUntil(promise);
  }
});
