var arr = [],
    elements_to_skip = ['SCRIPT', 'STYLE', 'NOSCRIPT'];

function check(el) {
    var text = el.textContent;
    for (k = 0; k < text.length; k++) {
        temp = text.charCodeAt(k);
        if (temp != 10 && temp != 32 && temp != 160) {
            tag = el.parentElement.tagName;
            if (elements_to_skip.indexOf(tag) == -1) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    return 0;
}

function textNodesUnder(el) {
    var n, a = [],
        walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) a.push(n);
    return a;
}

function join(obj, t1, t2) {
    var result = [],
        t1 = t1 || '=',
        t2 = t2 || '&';
    for (attr in obj) {
        result.push(attr + t1 + obj[attr]);
    }
    return result.join(t2);
};

function translate(arr, response) {
    arr.forEach(function(el, index) {
        el.textContent = response[index];
    });
}

textNodesUnder(document).forEach(function(el) {
    if (check(el))
        arr.push(el);
});

var xhr = new XMLHttpRequest(),
    TheMostImportantToken = '^@!';

text = arr.map(function(el) {
    return el.textContent;
});

options = {
    'key': 'trnsl.1.1.20150330T212825Z.aef560fdba779d33.4626c7f4aee4fc6f4786d45167e52985770df4f4',
    'text': text.join(TheMostImportantToken),
    'lang': 'az',
    'format': 'html',
    'options': '1'
};

url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?' + join(options);

xhr.open('GET', url, true);

var response;

xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    var object = JSON.parse(xhr.response);
    response = object.text[0].split(TheMostImportantToken);
    translate(arr, response);
};

xhr.send(null);