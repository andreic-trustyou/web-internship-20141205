#!/usr/bin/env node

var sys = require("util")
var my_http = require("http")
var path = require("path")
var url = require("url")
var filesys = require("fs");


var port = 9090;

var http = my_http.createServer(function(request,response){
	var my_path = url.parse(request.url).pathname;
	if (my_path == "/") {
		my_path = "index.html";
	}

	var full_path = path.join(process.cwd(), my_path);



	path.exists(full_path,function(exists){
		if (!exists){
			response.writeHeader(404, {"Content-Type": "text/plain"});  
			response.write("404 Not Found\n");  
			response.end();
		}
		else{
			filesys.readFile(full_path, "binary", function(err, file) {  
			     if (err) {  
			         response.writeHeader(500, {"Content-Type": "text/plain"});  
			         response.write(err + "\n");  
			         response.end();  
			   
			     }  
				 else{
					response.writeHeader(200);  
			        response.write(file, "binary");  
			        response.end();
				}
					 
			});
		}
	});
}).listen(port);

sys.puts("Server Running on " + port);
