const fse = require('fs-extra');

module.exports = function (deployment, network) {
    if (network === 'development') {
        return;
    }
    const dir = 'releases/' + network;

    return fse.readFile(dir + '/deployment.json', 'utf8', function (err, data) {
        let previousDeployment = {};
        if (!err) {
            previousDeployment = JSON.parse(data);
        }
        return fse.ensureDir(dir).then(() => {
            let finalDeployment = {...previousDeployment, ...deployment};
            return fse.writeFile(dir + '/deployment.json', JSON.stringify(finalDeployment), 'utf8');
        });
    });
};