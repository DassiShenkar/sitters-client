/*
 *
 *  Push Notifications codelab
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

/* eslint-env browser, serviceworker, es6 */

self.addEventListener('push', function (event) {
        console.log('[Service Worker] Push Received.');
        console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
        const data = JSON.parse(event.data.text());
        const title = 'Sitters';
        let options;
        if ("parentID" in data) { // Got an invite
            options = {

                badge: data.parentImage,
                data: data._id,
            };
            if(data.status === 'waiting'){ // new invite
                options.icon = data.parentImage;
                options.body = 'New invite from ' +data.parentName;
            }
            else{ // invite status change
                options.icon = data.sitterImage;
                options.body = data.sitterName + data.status + ' your invite';
            }
        }
        else {// New sitter in town
            options = {
                body: "New Sitter In Town:\nMeet " + data.sitterName,
                icon: data.sitterPicture,
                badge: data.sitterPicture,
                data: {
                    id: data._id,
                    type: "notification",
                }
            }
        }


        event.waitUntil(self.registration.showNotification(title, options));
        self.clients.matchAll().then(all => all.forEach(client => {
            client.postMessage(event.data.text());
        }));
    }
);

// self.addEventListener('notificationclick', function (event) {
//     const id = event.notification.data.id;
//     let path = 'http://' + event.target.location.host;
//     if (event.notification.data.type === 'invite') {
//         path += '/invite/' + id;
//     }
//     else {
//         path += '/notification/' + id;
//     }
//
//     event.notification.close();
//     // const urlToOpen = new URL(examplePage, self.location.origin).href;
//
//     const promiseChain = clients.matchAll({
//         type: 'window',
//         includeUncontrolled: true
//     })
//         .then((windowClients) => {
//             let matchingClient = null;
//
//             for (let i = 0; i < windowClients.length; i++) {
//                 const windowClient = windowClients[i];
//                 if (windowClient.url === path) {
//                     matchingClient = windowClient;
//                     break;
//                 }
//             }
//
//             if (matchingClient) {
//                 return matchingClient.focus();
//             } else {
//                 return clients.openWindow(path);
//             }
//         });
//
//     event.waitUntil(promiseChain);
// });

self.addEventListener('notificationclose', function (event) {
    // Do something as the result of the notification close
});

self.addEventListener("message", function (event) {
    //event.source.postMessage("Responding to " + event.data);
    self.clients.matchAll().then(all => all.forEach(client => {
        client.postMessage("Responding to " + event.data);
    }));
});