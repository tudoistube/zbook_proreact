
module.exports = {
  //entry: __dirname + "/zapp/App.js",
  //entry: __dirname + "/zapp/AppGrocery.js",
  //entry: __dirname + "/zappKanban/App.js",
  //entry: __dirname + "/zapp/Search_56p_key.js",
  //entry: __dirname + "/zappKanban/App.js",
  entry: __dirname + "/zappKanban2/App.js",  
  //entry: __dirname + "/zapp/FocusText_65p_ref.js",
  //entry: __dirname + "/zapp/Greeter_68p_propTypes.js",
  //entry: __dirname + "/zapp/ContactsAppContainer.js",
  //entry: __dirname + "/zapp/Ticket_91p.js",
  //entry: __dirname + "/zapp/AppShopping.js",
  //entry: __dirname + "/zappDnd/App.js",
  //entry: __dirname + "/zappRoute/App.js",


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
