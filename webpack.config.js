
var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./frontend/Pathfinder",
  output: {
    filename: "./bundle.js"
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["*", ".js"]
  },
  module: {
   loaders: [
     {
       test: [/\.js?$/],
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015']
       }
     }
   ]
 }
};
