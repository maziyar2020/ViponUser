const path = require("path");
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@view": path.resolve(__dirname, "./src/views"),
                "@img": path.resolve(__dirname, "./src/assets/images"),
                "@common": path.resolve(__dirname, "./src/components/common"),
                "@api": path.resolve(__dirname, "./src/services"),
                "@utils": path.resolve(__dirname, "./src/utilities/"),
            },
        },
    },
};