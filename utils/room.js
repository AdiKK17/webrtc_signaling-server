const rooms = [];

//////////////////////////////////////
//Create room
function createRoom() {
    const callerCandidates = [];
    const calleeCandidates = [];
    const offer = {"offer": {
      "type": "nasd",
      "sdp": "nasd",
    },};
    const answer = {"answer": {
      "type": "bbfsdf",
      "sdp": "ghvsdfgshdf",
    },};
    const id = Math.floor(1000 + Math.random() * 9000).toString();

    const room = {id,callerCandidates,calleeCandidates,offer,answer};
    rooms.push(room);

    return room.id;
}

//add offer sdp
function addOfferSdp(roomId,offer_sdp){
  const room = getCurrentRoom(roomId);
  if(!room){
    return;
  }
  room.offer = offer_sdp;
}

//add callerCandidates
function addCallerCandidates(roomId,candidate){
  const room = getCurrentRoom(roomId);
  if(!room){
    console.log("room doesnt exist");
    return;
  }
  room.callerCandidates.push(candidate);
}

function sendAnswerSdp(roomId){
  console.log("sending answer to caller");
  console.log(roomId);
  const room = getCurrentRoom(roomId);
  console.log(room.answer);
  return room.answer;
}

function sendCalleeCandidates(roomId){
  const room = getCurrentRoom(roomId);
  if(!room){
    return;
  }
  return room.calleeCandidates;
}
//////////////////////////////////////////////////



///////////<<<<<<<<<<<<<<<<<
function checkRoom(roomId){
  const room = getCurrentRoom(roomId);
  if(!room){
    return false;
  }
  return true;
}

function addCalleeCandidates(roomId,candidate){
  const room = getCurrentRoom(roomId);
  if(!room){
    console.log("room doesnt exist");
    return;
  }
  room.calleeCandidates.push(candidate);
}

function sendOfferSdp(roomId){
  const room = getCurrentRoom(roomId);
  return room.offer;
}

function addAnswerSdp(roomId,answer_sdp){
  const room = getCurrentRoom(roomId);
  if(!room){
    console.log("wrong room id");
    return;
  }
  room.answer = answer_sdp;
}

function sendCallerCandidates(roomId){
  const room = getCurrentRoom(roomId);
  return room.callerCandidates;
}
///////////<<<<<<<<<<<<<<<<<


//Get current room
function getCurrentRoom(id) {
  return rooms.find(room => room.id === id);
}

//Show room
function showRoom(roomId){
  const room = getCurrentRoom(roomId);

  if(!room){
    console.log("no room found");
    return
  }
  // console.log(room);
  console.log(room.id);
  // console.log(room.id);
  // console.log(room.offer.sdp);   
  console.log(room.offer.type);   
  // console.log(room.answer.sdp);   
  console.log(room.answer.type);
  
  // console.log(room.offer);   
  // console.log(room.answer);
  
  console.log("caller candidates");   
  console.log(room.callerCandidates.length);
  // room.callerCandidates.forEach(element => {
  //   console.log(element);
  // });

  console.log("callee candidates");   
  console.log(room.calleeCandidates.length);
  // room.calleeCandidates.forEach(element => {
  //   console.log(element);
  // });
  return room;
}

function clearRooms() {
  rooms = [];
}



module.exports = {
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
};

