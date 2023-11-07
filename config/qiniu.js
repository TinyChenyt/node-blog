module.exports = {
    /*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 15:31:03
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 17:50:38
 * @FilePath: \node-blog\util\testFile.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
    // 七牛云上传文件的配置
    accessKey: "UmOYW40oWGETiQbkRk7wtFCoCm1p9igWNdUflAGx",
    secretKey: "2IRG4EDdZznNznA79EIfVAdNueYiwhnw4bn3j1Z_",
    options: {
        scope: "tinyblogdb",
        returnBody: `{"key":"$(key)",
        "bucket":"$(bucket)",
        "name":"$(fname)"}`
    },

    // let putPolicy = new qiniu.rs.PutPolicy(options);

    // let uploadToken = putPolicy.uploadToken(mac);

    // let config = new qiniu.conf.Config();
    // let formUploader = new qiniu.form_up.FormUploader(config);

    // let putExtra = new qiniu.form_up.PutExtra();
    // let localFile = "C:/WorkFiles/blog/vue-blog/src/assets/logo.png";

    // formUploader.putFile(uploadToken, "key", localFile, putExtra, function (respErr,
    //     respBody, respInfo) {
    //     if (respErr) {
    //         throw respErr;
    //     }
    //     if (respInfo.statusCode == 200) {
    //         console.log(respBody);
    //     } else {
    //         console.log(respInfo.statusCode);
    //         console.log(respBody);
    //     }
    // })
}