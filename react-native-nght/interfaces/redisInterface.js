var redis = require("redis"),
        client = redis.createClient(process.env.REDIS_URL);

var exports = module.exports = {};

exports.set = function(stringKey, stringValue) {
  client.set(stringKey, stringValue, redis.print);
}

exports.get = function(stringKey) {
  client.get(stringKey, function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
  });
}

// Goes, "Name of table" "Key":"Value" OPTIONAL:print
exports.hset = function(tableName, key, value, print=false) {
  if (print) {
    client.hset(tableName, key, value, redis.print);
  } else {
    client.hset(tableName, key, value);
  }
}


// This will grab and print the Keys from the named hash table passed in
exports.hGetKeys= function(tableName) {
  client.hkeys(tableName, function (err, replies) {
      console.log(replies.length + " replies:");
      replies.forEach(function (reply, i) {
          console.log("    " + i + ": " + reply);
      });
      client.quit();
  });
}

