// class FireHose{

//   constructor(resource){

//       new Firehose.Consumer({
//         message: function(msg){
//           that.updateState(msg)
//         },
//         connected: function(){
//           console.log("Great Scotts!! We're connected!");
//         },
//         disconnected: function(){
//           console.log("Well shucks, we're not connected anymore");
//         },
//         error: function(){
//           console.log("Well then, something went horribly wrong.");
//         },
//         uri: '//localhost:7474/' + resource + '/' + resource.id
//       }).connect();
//   }


// }


