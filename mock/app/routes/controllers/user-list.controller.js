var users = require('./user-list.json');

var uniqid = require('uniqid');

exports.create = function(req, res) {
  var newUser = req.body;

  if(newUser.hasOwnProperty("firstName")&&
      newUser.hasOwnProperty("lastName")&&
      newUser.hasOwnProperty("email") &&
      newUser.hasOwnProperty("city") &&
      newUser.hasOwnProperty("dept")){

  newUser.id = uniqid();

  users.push(newUser);

  console.log("--->After Post, users:\n" + JSON.stringify(users, null, 4));

  res.json(users);
  }
  else{
	  res.status(400).send({message : "bad request"});
  }
};

exports.findAll = function(req, res) {
    console.log("--->Find All: \n" + JSON.stringify(users, null, 4));

    res.json(users);
};


exports.update = function(req, res) {
  var id = parseInt(req.params.id);
  var updatedUser = req.body;

  if(updatedUser.hasOwnProperty("firstName")&&
        updatedUser.hasOwnProperty("lastName")&&
        updatedUser.hasOwnProperty("email") &&
        updatedUser.hasOwnProperty("city") &&
        updatedUser.hasOwnProperty("dept")){

	      users.forEach(function(element, index){
        		    if(element.id === req.params.id) {
        			    if(element != null){
                      updatedUser.id = req.params.id;
                      users[index] = updatedUser;
                      res.json(users);
                  }
                  else{
                      res.json(users);
                      res.end("Don't Exist user:\n:" + JSON.stringify(users, null, 4));
                  }
                }
        });
  }
  else {
	    res.status(400).send({message : "bad request"});
	    console.log("bad request");
  }
};

exports.delete = function(req, res) {
	 var check= false;

	 users.forEach(function(element, index){
   		if(element.id === req.params.id) {
        users.splice(index, 1);
   			check=true;
   		}
   });
   console.log("--->After deletion, user list:\n" + JSON.stringify(users, null, 4) );
   	if(check){
   		  res.json(users);
   	}else{
   	    res.status(401).send({message : "provided id is not available"});
   	    check=false;
   	}
};
