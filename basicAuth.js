var http = require('http');
http.createServer(
		function(req, res) {

			var header = req.headers.authorization;
			token = header.split(" ")[1];//
			auth = new Buffer(token, 'base64').toString();
			parts = auth.split(/:/);
			username = parts[0];
			password = parts[1];

			var fs = require('fs');
			var access = false;
			var file = 'username.json';
			res.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
			fs.readFile(file, 'utf8', function(err, data) {
				if (err) {
					res.end('Internal Error Occured\n');
					return;
				} else {
					data = JSON.parse(data);
					for ( var i = 0; i < data.length; i++) {
						console.log(data[i].username + " " + data[i].password);
						console.log(username + " " + password);
						if (data[i].username == username
								&& data[i].password == password)
							access = true;
						else
							console.log(false);
					}
				}

				if (access === true)
					res.end("Username:" + username + "\n");
				else {
					res.end("Auth Failed\n" + access);
				}

			});

		}).listen(9900, '127.0.0.1');
