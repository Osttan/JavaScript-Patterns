const User = function (name) {
  this.name = name;
  this.chatroom = "";
};

User.prototype = {
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  },
};

const Chatroom = function () {
  let users = {}; // List of users

  return {
    register: function (user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function (message, from, to) {
      if (to) {
        // Single user message
        to.receive(message, from);
      } else {
        // Mass message
        for (key in users) {
          if (users[key] !== from) {
            users[key].receive(message, from);
          }
        }
      }
    },
  };
};

const andre = new User("Andre");
const kaori = new User("Kaori");
const miwa = new User("Miwa");

const chatroom = new Chatroom();

chatroom.register(andre);
chatroom.register(kaori);
chatroom.register(miwa);

andre.send("Hello Kaori", kaori);
miwa.send("Hello Andre, you are the best dev ever!", andre);
kaori.send("Hello Everyone!!!");
