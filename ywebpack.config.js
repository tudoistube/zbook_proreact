module.exports = {
	devtool: 'eval-source-map',
	
	entry: __dirname + "/zapp/main.js",
	
	output: {
		path: __dirname + "/zpublic",
		filename: "bundle.js"
	},
	
	module: {				
		loaders: [			
			{		
				test: /\.json$/,	
				loader: "json"	
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ["es2015", "react"]
				}
			}
		]			
	},				
						
  devServer: {	
    contentBase: "./zpublic",	
    colors: true,	
    historyApiFallback: true,	
    inline: true	
  }	
	
	
}

