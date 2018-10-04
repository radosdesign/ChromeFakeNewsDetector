// Show warning dialog only in case it wasn't already shown
let warning_already_shown = sessionStorage.getItem('prop_warning_shown') === 'true';
if (!warning_already_shown) {

    // Generate random Dialog ID
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    let dialog_id = makeid();

    // Dialog
    document.body.innerHTML += '<dialog id="' + dialog_id + '" style="top:10%;z-index: 9999; background-color:rgba(0,0,0,0);border: none;' +
        'padding: 1em !important; text-align: center; line-height: 1.5; font-family: Arial, Helvetica, sans-serif;' +
        'position: fixed; -webkit-touch-callout: none; -webkit-user-select: none; user-select: none;">' +
        '<img src="' + chrome.extension.getURL(img_asset) + '" style="width: 100%;height: auto;">' +
        '<div style="position:relative; top:-100px; color: #fff">' + txt_more_info + '</div>' +
        '<div id="dismiss_w" style="position:relative; top:-100px;color: #fff; font-size: 18px; padding-top: 10px; padding-bottom: 5px;text-decoration: underline;cursor: pointer;">' +
        txt_close + '</div></dialog>';

    //
    let dialog = document.querySelector("#" + dialog_id)
    dialog.querySelector("#dismiss_w").addEventListener("click", function () {
        sessionStorage.setItem('prop_warning_shown', true);
        dialog.close()
    })

    dialog.showModal()
}