
// const path = require('path');
// const webpack = require('webpack');
// console.log("testing");
// let _path = path.resolve(__dirname, '../require.json')

// console.log( 'loading ' + _path );
// module.exports = {
//   entry: {
//     ai_obj_core: _path
//   },
//   output: {
//     filename: '[name].js'
//   }
// };
// 
// 
const fs        = require('fs');
const path = require('path');
const webpack = require('webpack');
let _jsFile   = path.join(__dirname, '..','src', 'NodeObserver.js' ); 
//let _indexFile   = path.join(__dirname, '..','src', 'index.js' ); 


var initializeTmpDir = ( dir )=>{
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
}

initializeTmpDir( 'dist' );

module.exports = () => {

  return new Promise((resolve, reject) => {
      var res = {
    
        entry: {
          ai_node_observer: [ _jsFile ] //, _indexFile 
        },
        output: {
          filename: '[name].js',
          path: path.resolve(__dirname, '../dist')
        },
        optimization: {
          // We no not want to minimize our code.
          minimize: false//,
        },
        plugins: [
        ],
        module: {
          rules: [
            {
             test: content => {
                return /\.js$/.test( content );
             },
             use: 'imports-loader?this=>window'
          },
          {
              test: content => {
                  return /\.js$/.test( content );
              },
              use: 'exports-loader?com=com'
          }

          ],

          noParse: content => /\.js$/.test( content )
        }
      };
      resolve( res  );
  });

};