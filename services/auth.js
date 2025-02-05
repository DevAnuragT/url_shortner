const sessionIdToUserMap= new Map();

function setSessionId(sessionId, user) {
  sessionIdToUserMap.set(sessionId, user);
}

function getSessionId(sessionId) {
  return sessionIdToUserMap.get(sessionId);
} 

module.exports= { setSessionId, getSessionId };