// getLatLong(){
//     let addresses = [];
//     BaseData.getSitters().forEach(function(sitter) {
//         geocoder.geocode(sitter.address.street + " " + sitter.address.houseNumber + ", " + sitter.address.city , function ( err, data ) {
//             if(err)
//                 console.log(err);
//             else
//                 addresses.push(data);
//             // do something with data
//         });
//
//     });
//     console.log(addresses);
//
// }