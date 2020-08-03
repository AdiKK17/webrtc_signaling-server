const express = require("express");
const bodyParser = require('body-parser');

const {
  createRoom,
  addOfferSdp,
  addCallerCandidates,
  sendAnswerSdp,
  sendCalleeCandidates,
  checkRoom,
  addCalleeCandidates,
  sendOfferSdp,
  addAnswerSdp,
  sendCallerCandidates,
  showRoom,
  clearRooms
} = require('./utils/room');


const app = express();


app.use(bodyParser.json({limit: '50mb'})); // application/json
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


  app.get('/create_room', (req, res , next) => {
    const roomId = createRoom();
    res.send(roomId);
    next();
  });

  app.post('/get_room_details',(req,res,next) => {
    const roomId = req.body.roomId;

    console.log('/get_room_details');
    console.log(roomId);

    if(checkRoom(roomId)){
      console.log("in the room");
      const offerSdp = sendOfferSdp(roomId);
      const callerCandidates = sendCallerCandidates(roomId);

     res.json({offerSdp: offerSdp,callerCandidates: callerCandidates});
    //  res.json({offerSdp: offerSdp});
     next();
    }

  });

  let room;

  const server = app.listen(process.env.PORT || 3000);
  const io = require('./socket').init(server);

      io.on('connection',(socket) => {
        

        socket.on('create_room', (info) => {
          //join room
          socket.join(info["roomId"]);
          
          //adding offer sdp
          addOfferSdp(info["roomId"],info["offer"]);
        });


        socket.on('add_caller_candidates',(info) => {
          addCallerCandidates(info["roomId"],info["candidate"]);
        });

        
        
        /////////////////////////////<<<<<<<<<<<<

        socket.on('join_room',(info) => {
          console.log("room_joined");
          socket.join(info["roomId"]);
        });

        socket.on('add_callee_candidates',(info) => {
          console.log("add_callee_candidates");
          addCalleeCandidates(info["roomId"],info["candidate"]);

          //sending the callee candidates to the caller
          socket
       .to(info["roomId"])
       .emit('recieve_callee_candidates',info["candidate"]);
        });

        

        socket.on('add_answer_sdp',(info) => {
          console.log('add_answer_sdp');
          addAnswerSdp(info["roomId"],info["answer"]);

          //send to the caller when callee sends in answer spd
        socket
        .to(info["roomId"])
        .emit('recieve_answer_sdp',sendAnswerSdp(info["roomId"]));

        });

      //   socket.on("get_callee_candidates",(info) => {
      //     //send to the caller callee's candidates
      //  socket
      //  .to(info["roomId"])
      //  .emit('recieve_callee_candidates',sendCalleeCandidates(room));
      //   });


        ////////////////////////////<<<<<<<<<<<<<
      
         socket.on('show_room',(info) => {
           showRoom(info["roomId"]);
         });
      
    
  });

    


// socket.on('join_room',(info) => {
        //   const check = checkRoom(info["roomId"]);

        //   socket.emit('receive_room_check', check);

        //   socket.emit('receive_offer_sdp', sendOfferSdp(info["roomId"]));

        //   socket.emit('receive_caller_candidates', sendCallerCandidates(info["roomId"]))
        // });