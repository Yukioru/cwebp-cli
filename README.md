# cwebp-cli

CLI tool for convert jpg/png files to webp.

## How to install
```
npm install -g cwebp-cli
```
```
yarn global add cwebp-cli
```

## How to use
Run `cwebp` in your console.


## Options
```
-V, --version          output the version number
-r, --recursive        Walk given directory recursively
-f, --files <items>    Files to convert, split by ','
-q, --quality <float>  Specify the compression factor for RGB channels between 0 and 100 (default: 75)
-m, --method <int>     Specify the compression method to use. This parameter controls the trade off between encoding speed and the compressed file size and quality. Possible values range from 0 to 6 (default: 4)
-h, --help             output usage information
```