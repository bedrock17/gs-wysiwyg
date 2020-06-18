const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
				'vue-good-table': path.join(__dirname, 'vue-good-table'),
            },
        },
    },
};
