$('#watch7-user-header').append('<button class="quokka yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded yt-can-buffer">Add To Quokka Chat!</button>');

function getId(url) {
    url = url.split('')
    if (url.indexOf('=') > -1) {
        return url.slice((url.indexOf('=') + 1)).join('');
    } else {
        return url.slice((url.indexOf('.') + 4)).join('');
    }
}

$(document).on('ready', function() {
    var url = window.location.href;
    var data = {
        url: url,
        embedId: getId(url)
    }

    $('.quokka').on('click', function() {

        chrome.runtime.sendMessage({
            command: 'get',
            embedId: data.embedId
        })
        chrome.runtime.onMessage.addListener(function(req, sender) {
            if (req.command === 'get') {
                if (req.message !== null) {
                    console.log('it already exists! redirecting! :)')
                    location.href = 'http://www.quokka.chat/room/' + req.message._id;
                } else {
                    chrome.runtime.sendMessage({
                        command: 'send',
                        data: data
                    });
                    chrome.runtime.onMessage.addListener(function(req, sender) {
                        if (req.command === 'send') {
                            location.href = 'http://www.quokka.chat/room/' + req.message._id;
                        }
                    })
                }
            }
        })
    });
})