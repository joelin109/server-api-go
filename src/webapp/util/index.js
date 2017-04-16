export let isSafari = () => {
    let browser = navigator.appName;
    let _version = navigator.appVersion.toLowerCase();
    return _version.indexOf("applewebkit") > 0 && _version.indexOf("chrome/") <= 0;
}