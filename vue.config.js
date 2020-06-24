const path = require('path');
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
				'vue-good-table': path.join(__dirname, 'vue-good-table'),
            },
        },
		plugins: [
			new MonacoEditorPlugin({
				languages: ['javascript', 'css', 'html', 'json', 'markdown'],
				features: ['!gotoSymbol'],
			}),
		],
    },
};
