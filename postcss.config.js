import cssnanoPlugin from "cssnano";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import preCss from "precss";
import postcssFunctions from "postcss-functions";
import postcssMediaMinmax from "postcss-media-minmax"

const myFunction = (value) => {
    // Do something with the input value
    return value * 2;
};
export default {
    plugins: [
        cssnanoPlugin({ stage: 1 }),
        autoprefixer(),
        postcssImport(),
        preCss(),
        postcssMediaMinmax(),
        postcssFunctions({
            functions: {
                myFunction,
            },
        }),
    ],
};
