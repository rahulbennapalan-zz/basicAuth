var http = require('http');
http.createServer(
		function(req, res) {

			res.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
			if (req.method == 'POST') {
				try {
					var header = req.headers.authorization;
					token = header.split(" ")[1];//
					auth = new Buffer(token, 'base64').toString();
					parts = auth.split(/:/);
					username = parts[0];
					password = parts[1];

					var fs = require('fs');
					var access = false;
					var file = 'authData.json';
					fs.readFile(file, 'utf8', function(err, data) {
						if (err) {
							res.end("Auth Failed\n");
							return;
						} else {
							data = JSON.parse(data);
							for ( var i = 0; i < data.length; i++) {
								if (data[i].username == username && data[i].password == password)
									access = true;
							}
						}

						if (access === true)
							res.end("Username:" + username + "\n");
						else {
							res.end("Auth Failed\n");
						}

					});
				} catch (err) {
					res.end("Auth Failed\n" + err);
				}
			} else {
				res.end("Auth Failed\n");
			}

		}).listen(9900, '127.0.0.1');
		console.log("server running");
