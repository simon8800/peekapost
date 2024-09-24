// get queries

const appGetIndex = (req, res) => {
  /* 
  *Todo 
  - Get all messages with their usernames and user ids (create this query)
  */
  res.render("index");
}

const appGetSignup = (req, res) => {
  // render signup page
  res.render("sign-up")
}

const appPostSignup = (req, res) => {
  // process sign up and redirect to index
  res.status(200).json({message: "I am in the works"});

}

const appGetSignin = (req, res) => {
  // render signup page
  res.render("sign-in")
}

const appPostSignin = (req, res) => {
  // process sign up and redirect to index
  res.status(200).json({message: "I am in the works"});

}


const appPostMessage = (req, res) => {
  // process message and redirect to index
  res.status(200).json({message: "I am in the works"});
}

module.exports = {
  appGetIndex,
  appGetSignup,
  appPostSignup,
  appPostMessage,
  appGetSignin,
  appPostSignin,
}