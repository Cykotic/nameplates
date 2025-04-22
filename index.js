const axios = require('axios'),
    fs = require('fs'),
    path = require('path'),
    names = ["twilight", "vengeance", "cityscape", "koi_pond", "cat_beans", "angels", "cherry_blossoms", "spirit_of_spring"],
    formats = ["asset.webm", "static.png"],
    folder = path.resolve(__dirname, 'nameplates');

if (!fs.existsSync(folder)) fs.mkdirSync(folder);

const download = async (url, outputPath) =>
    axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    .then(({
        data
    }) => new Promise((res, rej) =>
        data.pipe(fs.createWriteStream(outputPath)).on('finish', res).on('error', rej)
    ));

(async () => {
    await Promise.all(names.flatMap(name => formats.map(format =>
        download(
            `https://cdn.discordapp.com/assets/collectibles/nameplates/nameplates/${name}/${format}`,
            path.resolve(folder, `${name}_${format}`)
        ).then(() => console.log(`Downloaded: ${name}_${format}`))
        .catch(err => console.error(`Failed: ${name}_${format}`, err.message))
    )));
})();