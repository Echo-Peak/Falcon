
var path = require('path');
module.exports = {
    entry: {
        'context': path.resolve(__dirname ,'src/modules/index'),
    },

    output: {
        path: path.resolve(__dirname ,'built'),
        filename: '[name].js'
    },
    cache: true,
    watch:true,
    module: {
        loaders: [

            {
                test: /\.js$/,
                 exclude: /node_modules/,
                 include: path.resolve(__dirname, 'src'),
                loader: 'babel',
                query:{
                     presets:['es2015'],
                    plugins:['transform-es2015-modules-commonjs']
                }
           }
      ]

    },

    resolve: {
        extensions: ['.js',''],
        modulesDirectories: ['node_modules']
    },

    plugins: [
        function(){
        this.plugin("done", function(stats){
            if (stats.compilation.errors && stats.compilation.errors.length){
              //prevent gulp > task > INIT from clearing console if theres a error here
              process.env.blockConsole = true;
              //console BEEP
              console.log("\007"+stats.compilation.errors[0].error);
            }

        });
    }

    ]

}
