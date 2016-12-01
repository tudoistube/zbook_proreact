
module.exports = {
  entry: __dirname + "/zappDnd/App.js",

  output: {
    path: __dirname + "/zpublic",
    filename: 'zbundle.js'
  },

  module: {
    loaders:[{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader:'babel',
      query:{
        presets:['es2015', 'stage-0', 'stage-2', 'react']
      }
    }]
  },
  devServer: {
    contentBase: "./zpublic",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
};
