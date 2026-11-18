const AWGm1 = document.getElementById('generateButton1');
const AWGm2 = document.getElementById('generateButton2');
const AWGm3 = document.getElementById('generateButton3');
const Clash = document.getElementById('generateButton4');
const WireSock = document.getElementById('generateButton5');
const ClashMASQUE = document.getElementById('generateButton6');
const Xray = document.getElementById('generateButton7');
const container = document.querySelector('.container');

const wiresockDomains = [
    'akbars.ru',
    'babyblog.ru',
    'deepseek.com',
    'dnevnik.ru',
    'edimdoma.ru',
    'is74.ru',
    'ivi.ru',
    'kopilkaurokov.ru',
    'naked-science.ru',
    'nplus1.ru',
    'obrazovaka.ru',
    'pypi.org',
    'sdamgia.ru',
    'skyeng.ru',
    'uchi.ru',
    'videouroki.net',
    'yaklass.ru',
    'youdo.com',
    'youla.ru',
    'zakon.ru',
    'zdorovie.ru',
    'zdorovieinfo.ru',
    'znaika.ru',
    'zoon.ru'];

function generateRandomEndpoint() {
    const ports = [500, 854, 859, 864, 878, 880, 890, 891, 894, 903, 908, 928, 934, 939, 942, 943, 945, 946, 955, 968, 987, 988, 1002, 1010, 1014, 1018, 1070, 1074, 1180, 1387, 1701, 1843, 2371, 2408, 2506, 3138, 3476, 3581, 3854, 4177, 4198, 4233, 4500, 5279, 5956, 7103, 7152, 7156, 7281, 7559, 8319, 8742, 8854, 8886];
    
    const selectedServer = getSelectedServer();
    
    // Фильтруем порты в зависимости от выбранного сервера
    let availablePorts = [...ports];
    if (selectedServer === 'ltePL') {
        availablePorts = ports.filter(port => port !== 988);
    } else if (selectedServer === 'lteFL') {
        availablePorts = ports.filter(port => port !== 1010);
    }
    
    let port = availablePorts[Math.floor(Math.random() * availablePorts.length)];

    if (selectedServer === 'def') {
        const prefixes = [
			"162.159.192.",
			"162.159.195.",
			"engage.cloudflareclient.com",
			"8.6.112.",
			"8.34.70.",
			"8.34.146.",
			"8.35.211.",
			"8.39.125.",
			"8.39.204.",
			"8.39.214.",
			"8.47.69.",
			"188.114.96.",
			"188.114.97.",
			"188.114.98.",
			"188.114.99."
		];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        
        if (prefix === "engage.cloudflareclient.com") {
            return `${prefix}:${port}`;
        } else {
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            return `${prefix}${randomNumber}:${port}`;
        }
    }

    const serverMap = {
		'ltePL': 'tel.pl.tribukvy.ltd',      // Польша LTE
		'lteFL': 'tel.fi.tribukvy.ltd',   	 // Финляндия LTE
		'lteDE': 'tel.de.tribukvy.ltd',  	 // Германия LTE
		'PL': 'pl.tribukvy.ltd',   		  	 // Польша
		'DE': 'de.tribukvy.ltd',    	  	 // Германия
		'RU': 'ru0.tribukvy.ltd',  		  	 // Россия
		'EE': 'ee.tribukvy.ltd',    	 	 // Эстония
        'NL': 'nl.tribukvy.ltd',  		 	 // Нидерланды
        'FL': 'fi.tribukvy.ltd',  		 	 // Финляндия
		'LV': 'lv.tribukvy.ltd' 		 	 // Латвия
    };
    
    const endpoint = serverMap[selectedServer] || 'pl.tribukvy.ltd';
    return `${endpoint}:${port}`;
}

function getSelectedDNS() {
	if (document.getElementById('cf').checked) {
		return "1.1.1.1, 1.0.0.1, 2606:4700:4700::1111, 2606:4700:4700::1001";
	} else if (document.getElementById('malw').checked) {
		return "179.254.166.171, 164.5.224.81, 2a12:bec4:1bb0:27dd::2, 2a13:82c0:0:d::3";
	} else if (document.getElementById('bezmezhau').checked) {
		return "143.20.64.55, 31.58.216.201";
	} else if (document.getElementById('geohide').checked) {
		return "5.175.161.3, 5.175.161.40, 37.221.93.141, 37.221.93.128, 45.13.237.213, 31.25.239.132, 143.20.64.192";
	} else if (document.getElementById('geodema').checked) {
		return "179.236.130.10, 179.236.130.11";
	} else if (document.getElementById('google').checked) {
		return "8.8.8.8, 8.8.4.4, 2001:4860:4860::8888, 2001:4860:4860::8844";
	}}

function getSelectedServer() {
    const serverRadios = document.getElementsByName('server');
    for (let radio of serverRadios) {
        if (radio.checked) {
            return radio.id;
        }
    }
    return 'def'; // По умолчанию стандартный
}

// Функция для получения префикса названия конфига
function getConfigPrefix() {
    const selectedServer = getSelectedServer();
    const selectedDNS = getSelectedDNSRadio();
    
    const standardDNS = ['cf', 'google'];
    if (selectedServer === 'def' && standardDNS.includes(selectedDNS)) {
        return '';
    }
    
    const serverPrefixMap = {
        'ltePL': 'LTEp',
		'lteFL': 'LTEf',
		'lteDE': 'LTEd',
		'PL': 'pl',
        'DE': 'de',
        'RU': 'ru',
        'EE': 'ee',
        'NL': 'nl',
        'FL': 'fl',
		'LV': 'lv',
        'US': 'us'
    };
    
    const dnsPrefixMap = {
        'malw': 'mlw',
        'xbox': 'xbx',
        'geohide': 'ghd',
        'comss': 'cms'
    };
    
    let prefix = '';
    
    if (selectedServer !== 'def' && serverPrefixMap[selectedServer]) {
        prefix += serverPrefixMap[selectedServer];
    }
    
    if (!standardDNS.includes(selectedDNS) && dnsPrefixMap[selectedDNS]) {
        prefix += dnsPrefixMap[selectedDNS];
    }
    
    return prefix;
}

function getConfigFilename(baseName, randomNumber) {
    const prefix = getConfigPrefix();
    if (prefix) {
        return `${prefix}${baseName}_${randomNumber}.conf`;
    }
    return `${baseName}_${randomNumber}.conf`;
}

const fetchWithTimeout = async (url, options = {}, timeout = 3000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    // Оставляем только те заголовки, которые были переданы в параметре options
    const headers = {
        ...options.headers
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout for ${url}`);
        }
        throw error;
    }
};

const sessionCache = {
    config: null,
    timestamp: null
};

const sessionCacheMSQ = {
    config: null,
    timestamp: null
};

const fetchFullConfig = async () => {
    if (sessionCache.config) {
        console.log('Using cached config');
        return sessionCache.config;
    }
    
    const endpoints = [
        'https://warp-workers.warp-api.cfd',				// 0
		'https://warp-sub.warp-api.cfd',					// 1
        'https://warp-vercel-chi.warp-api.cfd',				// 2
		'https://warp-vercel-murex.warp-api.cfd',			// 3
		'https://warp-netlify.warp-api.cfd'					// 4
    ];
    
    let lastError;
    
    for (let i = 0; i < endpoints.length; i++) {
        try {
            console.log(`Trying config endpoint: ${i}`);
            const response = await fetchWithTimeout(endpoints[i], {
                headers: { 'X-Client': 'WARP' }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch config from ${i}: ${response.status}`);
            }
            
            const configData = await response.json();
            
            // Сохраняем в кэш
            sessionCache.config = configData;
            
            return configData;
        } catch (error) {
            console.warn(`Failed to fetch from ${i}:`, error.message);
            lastError = error;
            
            if (i === endpoints.length - 1) {
                throw lastError;
            }
        }
    }
    
    throw lastError;
};

const fetchFullConfigMSQ = async () => {
    if (sessionCacheMSQ.config) {
        console.log('Using cached config');
        return sessionCacheMSQ.config;
    }
    
    const endpoints = [
        'https://masque-workers.warp-api.cfd',				// 0
		'https://masque-vercel.warp-api.cfd',		// 1
    ];
    
    let lastError;
    
    for (let i = 0; i < endpoints.length; i++) {
        try {
            console.log(`Trying config endpoint: ${i}`);
            const response = await fetchWithTimeout(endpoints[i]);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch config from ${i}: ${response.status}`);
            }
            
            const configDataMSQ = await response.json();
            
            // Сохраняем в кэш
            sessionCacheMSQ.config = configDataMSQ;
            
            return configDataMSQ;
        } catch (error) {
            console.warn(`Failed to fetch from ${i}:`, error.message);
            lastError = error;
            
            if (i === endpoints.length - 1) {
                throw lastError;
            }
        }
    }
    
    throw lastError;
};

// Popup notification
const showPopup = (message, type = 'success') => {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.innerHTML = message;
    
    if (type === 'error') {
        popup.style.backgroundColor = '#d32f2f';
		popup.style.textAlign = 'center';
    }
    
    document.body.appendChild(popup);
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 2500);
};

const downloadConfig = (fileName, content) => {

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'application/octet-stream' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
	
};

// AWGm1, AWGm2, AWGm3
async function generateWireGuardConfig(version, buttonId) {
    showWarningIfNeeded(async () => {
        const button = document.getElementById(buttonId);
        const status = document.getElementById('status');
        const randomEndpoint = generateRandomEndpoint();
        const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
        
        button.disabled = true;
        button.classList.add("button--loading");
        
        try {
            const configData = await fetchFullConfig();
            const selectedDNS = getSelectedDNS();
            const i1Toggle = document.getElementById('i1toggle');
            const i2area = document.getElementById('i2');
            
            let i1Value = '';
            if (i1Toggle.checked && i2area.value.trim()) {
                i1Value = i2area.value.trim();
            } else {
                if (version === 1) {
                    i1Value = 'I1 = <b 0xce000000010897a297ecc34cd6dd000044d0ec2e2e1ea2991f467ace4222129b5a098823784694b4897b9986ae0b7280135fa85e196d9ad980b150122129ce2a9379531b0fd3e871ca5fdb883c369832f730e272d7b8b74f393f9f0fa43f11e510ecb2219a52984410c204cf875585340c62238e14ad04dff382f2c200e0ee22fe743b9c6b8b043121c5710ec289f471c91ee414fca8b8be8419ae8ce7ffc53837f6ade262891895f3f4cecd31bc93ac5599e18e4f01b472362b8056c3172b513051f8322d1062997ef4a383b01706598d08d48c221d30e74c7ce000cdad36b706b1bf9b0607c32ec4b3203a4ee21ab64df336212b9758280803fcab14933b0e7ee1e04a7becce3e2633f4852585c567894a5f9efe9706a151b615856647e8b7dba69ab357b3982f554549bef9256111b2d67afde0b496f16962d4957ff654232aa9e845b61463908309cfd9de0a6abf5f425f577d7e5f6440652aa8da5f73588e82e9470f3b21b27b28c649506ae1a7f5f15b876f56abc4615f49911549b9bb39dd804fde182bd2dcec0c33bad9b138ca07d4a4a1650a2c2686acea05727e2a78962a840ae428f55627516e73c83dd8893b02358e81b524b4d99fda6df52b3a8d7a5291326e7ac9d773c5b43b8444554ef5aea104a738ed650aa979674bbed38da58ac29d87c29d387d80b526065baeb073ce65f075ccb56e47533aef357dceaa8293a523c5f6f790be90e4731123d3c6152a70576e90b4ab5bc5ead01576c68ab633ff7d36dcde2a0b2c68897e1acfc4d6483aaaeb635dd63c96b2b6a7a2bfe042f6aed82e5363aa850aace12ee3b1a93f30d8ab9537df483152a5527faca21efc9981b304f11fc95336f5b9637b174c5a0659e2b22e159a9fed4b8e93047371175b1d6d9cc8ab745f3b2281537d1c75fb9451871864efa5d184c38c185fd203de206751b92620f7c369e031d2041e152040920ac2c5ab5340bfc9d0561176abf10a147287ea90758575ac6a9f5ac9f390d0d5b23ee12af583383d994e22c0cf42383834bcd3ada1b3825a0664d8f3fb678261d57601ddf94a8a68a7c273a18c08aa99c7ad8c6c42eab67718843597ec9930457359dfdfbce024afc2dcf9348579a57d8d3490b2fa99f278f1c37d87dad9b221acd575192ffae1784f8e60ec7cee4068b6b988f0433d96d6a1b1865f4e155e9fe020279f434f3bf1bd117b717b92f6cd1cc9bea7d45978bcc3f24bda631a36910110a6ec06da35f8966c9279d130347594f13e9e07514fa370754d1424c0a1545c5070ef9fb2acd14233e8a50bfc5978b5bdf8bc1714731f798d21e2004117c61f2989dd44f0cf027b27d4019e81ed4b5c31db347c4a3a4d85048d7093cf16753d7b0d15e078f5c7a5205dc2f87e330a1f716738dce1c6180e9d02869b5546f1c4d2748f8c90d9693cba4e0079297d22fd61402dea32ff0eb69ebd65a5d0b687d87e3a8b2c42b648aa723c7c7daf37abcc4bb85caea2ee8f55bec20e913b3324ab8f5c3304f820d42ad1b9f2ffc1a3af9927136b4419e1e579ab4c2ae3c776d293d397d575df181e6cae0a4ada5d67ecea171cca3288d57c7bbdaee3befe745fb7d634f70386d873b90c4d6c6596bb65af68f9e5121e67ebf0d89d3c909ceedfb32ce9575a7758ff080724e1ab5d5f43074ecb53a479af21ed03d7b6899c36631c0166f9d47e5e1d4528a5d3d3f744029c4b1c190cbfbad06f5f83f7ad0429fa9a2719c56ffe3783460e166de2d8>';
                } else if (version === 2) {
				const sniInput = document.getElementById('i1');
				sniInput.value = wiresockDomains[Math.floor(Math.random() * wiresockDomains.length)];
				i1Toggle.checked = true;
				await generateQuicMask();
				i1Value = i2area.value.trim();
				i1Toggle.checked = false;
				sniInput.value = '';
				i2area.style.display = 'none';
                } else if (version === 3) {
                    i1Value = 'I1 = <b 0x494e56495445207369703a626f624062696c6f78692e636f6d205349502f322e300d0a5669613a205349502f322e302f55445020706333332e61746c616e74612e636f6d3b6272616e63683d7a39684734624b3737366173646864730d0a4d61782d466f7277617264733a2037300d0a546f3a20426f62203c7369703a626f624062696c6f78692e636f6d3e0d0a46726f6d3a20416c696365203c7369703a616c6963654061746c616e74612e636f6d3e3b7461673d313932383330313737340d0a43616c6c2d49443a20613834623463373665363637313040706333332e61746c616e74612e636f6d0d0a435365713a2033313431353920494e564954450d0a436f6e746163743a203c7369703a616c69636540706333332e61746c616e74612e636f6d3e0d0a436f6e74656e742d547970653a206170706c69636174696f6e2f7364700d0a436f6e74656e742d4c656e6774683a20300d0a0d0a>\nI2 = <b 0x5349502f322e302031303020547279696e670d0a5669613a205349502f322e302f55445020706333332e61746c616e74612e636f6d3b6272616e63683d7a39684734624b3737366173646864730d0a546f3a20426f62203c7369703a626f624062696c6f78692e636f6d3e0d0a46726f6d3a20416c696365203c7369703a616c6963654061746c616e74612e636f6d3e3b7461673d313932383330313737340d0a43616c6c2d49443a20613834623463373665363637313040706333332e61746c616e74612e636f6d0d0a435365713a2033313431353920494e564954450d0a436f6e74656e742d4c656e6774683a20300d0a0d0a>';
                }
            }
            
            const keepToggle = document.getElementById('keeptogggle');
            const keepaliveInput = document.getElementById('keepalive');
            let persistentKeepalive = '';
            if (keepToggle.checked) {
                let keepaliveValue = keepaliveInput ? keepaliveInput.value.trim() : '';
                if (keepaliveValue && /^\d+$/.test(keepaliveValue)) {
                    persistentKeepalive = `\nPersistentKeepalive = ${keepaliveValue}`;
                } else if (keepaliveValue === '') {
                    persistentKeepalive = `\nPersistentKeepalive = 25`;
                }
            }
            
            const ipv6Toggle = document.getElementById('ipv6');
            let address = configData.client_ipv4;
            let dns = selectedDNS;
            
            if (ipv6Toggle.checked) {
                address = `${configData.client_ipv4}, ${configData.client_ipv6}`;
            } else {
                dns = dns.split(',').filter(ip => !ip.includes(':')).join(',');
            }
            
			const mtuInput = document.getElementById('mtu');
			const mtuVal = mtuInput?.value.trim() || mtuInput?.placeholder || '1280';
			
    // --- AWG 3.0 ---
		const awg3Toggle = document.getElementById('awg3');
        let awg3Config = '';
        if (awg3Toggle && awg3Toggle.checked) {
            const getValue = (id) => {
				const el = document.getElementById(id);
				if (!el) return '';
				const val = el.value.trim() || el.placeholder || '';
				if (!val || Number(val) === 0) return '';
				return val;
			};

    const cpa = getValue('cpaInput');
    const rkat = getValue('rkatInput');
    const rt = getValue('rtInput');
    const rat = getValue('ratInput');
    const kt = getValue('ktInput');
    const mha = getValue('mhaInput');

                if (cpa) awg3Config += `\nContentPaddingAddition = ${cpa}`;
                if (rkat) awg3Config += `\nRekeyAfterTime = ${rkat}`;
                if (rt) awg3Config += `\nRekeyTimeout = ${rt}`;
                if (rat) awg3Config += `\nRejectAfterTime = ${rat}`;
                if (kt) awg3Config += `\nKeepaliveTimeout = ${kt}`;
                if (mha) awg3Config += `\nMaxHandshakeAttempts = ${mha}`;
            }
			
	// --- AWG 3.1 ---
const isAwg31 = document.getElementById('awg3_1')?.checked;
const isRandomTrailers = document.getElementById('awg3_1_1')?.checked;
const isDisableCookies = document.getElementById('awg3_1_2')?.checked;

if (isAwg31) {
    if (isRandomTrailers) awg3Config += `\nRandomTrailers = on`;
    if (isDisableCookies) awg3Config += `\nDisableCookies = on`;
}
			
            const allowedIPs = getSelectedSites();
            const wireGuardText = `[Interface]
PrivateKey = ${configData.privKey}
Address = ${address}
DNS = ${dns}
MTU = ${mtuVal}
S1 = 0
S2 = 0
S3 = 0
S4 = 0
Jc = 4
Jmin = 40
Jmax = 70
H1 = 1
H2 = 2
H3 = 3
H4 = 4
${i1Value}${awg3Config}

[Peer]
PublicKey = ${configData.peer_pub}
AllowedIPs = ${allowedIPs}
Endpoint = ${randomEndpoint}${persistentKeepalive}`;
            
            const content = wireGuardText || "No configuration available";
            if (content === "No configuration available") {
                showPopup('No configuration to download', 'Ошибка');
                return;
            }
            
            const fileName = getConfigFilename(`WARPv${version}`, randomNumber);
            downloadConfig(fileName, content);
            showPopup('Скачивание конфигурации');
        } catch (error) {
            console.error('Error processing configuration:', error);
            showPopup('Ошибка. Подождите несколько минут или воспользуйтесь <a href="https://generator-config-warp.vercel.app/" target="_blank" style="color: #fff; text-decoration: underline; font-weight: bold;">зеркалом</a>', 'error');
        } finally {
            button.disabled = false;
            button.classList.remove("button--loading");
        }
    });
}

AWGm1.addEventListener('click', () => generateWireGuardConfig(1, 'generateButton1'));
AWGm2.addEventListener('click', () => generateWireGuardConfig(2, 'generateButton2'));
AWGm3.addEventListener('click', () => generateWireGuardConfig(3, 'generateButton3'));

// Clash
Clash.addEventListener('click', async () => {
    const button = document.getElementById('generateButton4');
    const status = document.getElementById('status');
    const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
    button.disabled = true;
    button.classList.add("button--loading");
    try {
	    const msqToggle = document.getElementById('masque');
		const serversToggle = document.getElementById('servers');
		const configData = await fetchFullConfig();
		let awg = '';
		let msq = '';
		let msqg = '';
		let msqp = '';
		let proxy = '';

        const i2area = document.getElementById('i2');
		const i1Toggle = document.getElementById('i1toggle');
		let i1Value = '';
		const sniInput = document.getElementById('i1');
		sniInput.value = wiresockDomains[Math.floor(Math.random() * wiresockDomains.length)];
		i1Toggle.checked = true;
		await generateQuicMask();
		i1Value = i2area.value.trim().replace(/^I1\s*=\s*/, '');
		i1Toggle.checked = false;
		sniInput.value = '';
		i2area.style.display = 'none';

		const mtuInput = document.querySelector('#infoModal2 #mtu');
		const mtuVal = mtuInput?.value.trim() || mtuInput?.placeholder || '1280';

	// --- AWG 3.0 ---
		const awg3cToggle = document.getElementById('awg3c');
		let awg3cConfig = '';
		if (awg3cToggle && awg3cToggle.checked) {
			const getValue = (id) => {
				const el = document.getElementById(id);
				if (!el) return '';
				const val = el.value.trim() || el.placeholder || '';
				if (!val || Number(val) === 0) return '';
				return val;
			};

    const cpa = getValue('cpaInput');
    const rkat = getValue('rkatInput');
    const rt = getValue('rtInput');
    const rat = getValue('ratInput');
    const kt = getValue('ktInput');
    const mha = getValue('mhaInput');

                if (cpa) awg3cConfig += `\n   content-padding-addition: ${cpa}`;
                if (rkat) awg3cConfig += `\n   rekey-after-time: ${rkat}`;
                if (rt) awg3cConfig += `\n   rekey-timeout: ${rt}`;
                if (rat) awg3cConfig += `\n   reject-after-time: ${rat}`;
                if (kt) awg3cConfig += `\n   keepalive-timeout: ${kt}`;
                if (mha) awg3cConfig += `\n   max-handshake-attempts: ${mha}`;
            }

	// --- AWG 3.1 ---
const isAwg31 = document.getElementById('awg3_1c')?.checked;
const isRandomTrailers = document.getElementById('awg3_1_1c')?.checked;
const isDisableCookies = document.getElementById('awg3_1_2c')?.checked;

if (isAwg31) {
    if (isRandomTrailers) awg3cConfig += `\n   random-trailers: true`;
    if (isDisableCookies) awg3cConfig += `\n   disable-cookies: true`;
}

		if (msqToggle.checked) {
			const configDataMSQ = await fetchFullConfigMSQ()
			msq = `msq: &msq
  type: masque
  private-key: ${configDataMSQ.privKey}
  public-key: ${configDataMSQ.peer_pub}
  ip: ${configDataMSQ.client_ipv4}
  ipv6: ${configDataMSQ.client_ipv6}
  mtu: 1280
  udp: true
  remote-dns-resolve: true
  dns: [1.1.1.1, 1.0.0.1, 2606:4700:4700::1111, 2606:4700:4700::1001]`;
			msqg = `- "MASQUE"
    - "MASQUE h2"`;
			msqp = `- name: "MASQUE"
  server: 162.159.198.2
  port: 443
  sni: 4pda.to
  <<: *msq
- name: "MASQUE h2"
  server: 162.159.198.2
  port: 443
  sni: 4pda.to
  network: h2
  <<: *msq`;
		}	
		let proxyg = `proxy-groups:
- name: WARP
  type: select
  icon: https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg
  proxies:
    - "Стандартный 1"
    - "Стандартный 2"
    - "Стандартный 3"
    ${msqg}
  url: 'http://speed.cloudflare.com/'
  interval: 300
rules:
- MATCH,WARP`
		if (serversToggle.checked) {
			awg = `awg: &awg
  amnezia-wg-option:
   version: 3
   jc: 4
   jmin: 40
   jmax: 70
   i1: <b 0xc800000001018800002b45615e996de27ff5ec5f583061ab38eac69fd8fec356802847cd1c7c15a87402bb0a433d4054defedc066e>${awg3cConfig}`;
			proxy = `- name: "🇵🇱 PL"
  <<: [ *warp-common, *awg ]
  server: pl.tribukvy.ltd
  port: 500
- name: "🇳🇱 NL"
  <<: [ *warp-common, *awg ]
  server: nl.tribukvy.ltd
  port: 500  
- name: "🇫🇮 FI"
  <<: [ *warp-common, *awg ]
  server: fi.tribukvy.ltd
  port: 500
- name: "🇷🇺 RU"
  <<: [ *warp-common, *awg ]
  server: ru0.tribukvy.ltd
  port: 500
- name: "🇱🇻 LV"
  <<: [ *warp-common, *awg ]
  server: lv.tribukvy.ltd
  port: 500
- name: "🇩🇪 DE"
  <<: [ *warp-common, *awg ]
  server: de.tribukvy.ltd
  port: 500
- name: "🇪🇪 EE"
  <<: [ *warp-common, *awg ]
  server: ee.tribukvy.ltd
  port: 500  
  
- name: "[LTE] 🇵🇱 PL"
  <<: [ *warp-common, *awg ]
  server: tel.pl.tribukvy.ltd
  port: 500
- name: "[LTE] 🇩🇪 DE"
  <<: [ *warp-common, *awg ]
  server: tel.de.tribukvy.ltd
  port: 500  
- name: "[LTE] 🇫🇮 FI"
  <<: [ *warp-common, *awg ]
  server: tel.fi.tribukvy.ltd
  port: 500`;
			proxyg = `proxy-groups:
- name: WARP + llimonix
  type: select
  icon: https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg
  proxies:
    - "Стандартный 1"
    - "Стандартный 2"
    - "Стандартный 3"
    ${msqg}
    - "🇵🇱 PL"
    - "🇳🇱 NL"
    - "🇫🇮 FI"
    - "🇷🇺 RU"
    - "🇱🇻 LV"
    - "🇩🇪 DE"
    - "🇪🇪 EE"
    - "[LTE] 🇵🇱 PL"
    - "[LTE] 🇫🇮 FI"
    - "[LTE] 🇩🇪 DE"
  url: 'http://speed.cloudflare.com/'
  interval: 300
rules:
- MATCH,WARP + llimonix`;
		}

		const wireGuardText = `warp-common: &warp-common
  type: wireguard
  ip: ${configData.client_ipv4}
  ipv6: ${configData.client_ipv6}
  private-key: ${configData.privKey}
  public-key: ${configData.peer_pub}
  allowed-ips: ['0.0.0.0/0']
  udp: true
  mtu: ${mtuVal}
  remote-dns-resolve: true
  dns: [1.1.1.1, 1.0.0.1, 2606:4700:4700::1111, 2606:4700:4700::1001]
${awg}
${msq}
proxies:
- name: "Стандартный 1"
  <<: *warp-common
  server: 162.159.192.1
  port: 4500
  amnezia-wg-option:
   version: 3
   jc: 4
   jmin: 40
   jmax: 70
   i1: <b 0xce000000010897a297ecc34cd6dd000044d0ec2e2e1ea2991f467ace4222129b5a098823784694b4897b9986ae0b7280135fa85e196d9ad980b150122129ce2a9379531b0fd3e871ca5fdb883c369832f730e272d7b8b74f393f9f0fa43f11e510ecb2219a52984410c204cf875585340c62238e14ad04dff382f2c200e0ee22fe743b9c6b8b043121c5710ec289f471c91ee414fca8b8be8419ae8ce7ffc53837f6ade262891895f3f4cecd31bc93ac5599e18e4f01b472362b8056c3172b513051f8322d1062997ef4a383b01706598d08d48c221d30e74c7ce000cdad36b706b1bf9b0607c32ec4b3203a4ee21ab64df336212b9758280803fcab14933b0e7ee1e04a7becce3e2633f4852585c567894a5f9efe9706a151b615856647e8b7dba69ab357b3982f554549bef9256111b2d67afde0b496f16962d4957ff654232aa9e845b61463908309cfd9de0a6abf5f425f577d7e5f6440652aa8da5f73588e82e9470f3b21b27b28c649506ae1a7f5f15b876f56abc4615f49911549b9bb39dd804fde182bd2dcec0c33bad9b138ca07d4a4a1650a2c2686acea05727e2a78962a840ae428f55627516e73c83dd8893b02358e81b524b4d99fda6df52b3a8d7a5291326e7ac9d773c5b43b8444554ef5aea104a738ed650aa979674bbed38da58ac29d87c29d387d80b526065baeb073ce65f075ccb56e47533aef357dceaa8293a523c5f6f790be90e4731123d3c6152a70576e90b4ab5bc5ead01576c68ab633ff7d36dcde2a0b2c68897e1acfc4d6483aaaeb635dd63c96b2b6a7a2bfe042f6aed82e5363aa850aace12ee3b1a93f30d8ab9537df483152a5527faca21efc9981b304f11fc95336f5b9637b174c5a0659e2b22e159a9fed4b8e93047371175b1d6d9cc8ab745f3b2281537d1c75fb9451871864efa5d184c38c185fd203de206751b92620f7c369e031d2041e152040920ac2c5ab5340bfc9d0561176abf10a147287ea90758575ac6a9f5ac9f390d0d5b23ee12af583383d994e22c0cf42383834bcd3ada1b3825a0664d8f3fb678261d57601ddf94a8a68a7c273a18c08aa99c7ad8c6c42eab67718843597ec9930457359dfdfbce024afc2dcf9348579a57d8d3490b2fa99f278f1c37d87dad9b221acd575192ffae1784f8e60ec7cee4068b6b988f0433d96d6a1b1865f4e155e9fe020279f434f3bf1bd117b717b92f6cd1cc9bea7d45978bcc3f24bda631a36910110a6ec06da35f8966c9279d130347594f13e9e07514fa370754d1424c0a1545c5070ef9fb2acd14233e8a50bfc5978b5bdf8bc1714731f798d21e2004117c61f2989dd44f0cf027b27d4019e81ed4b5c31db347c4a3a4d85048d7093cf16753d7b0d15e078f5c7a5205dc2f87e330a1f716738dce1c6180e9d02869b5546f1c4d2748f8c90d9693cba4e0079297d22fd61402dea32ff0eb69ebd65a5d0b687d87e3a8b2c42b648aa723c7c7daf37abcc4bb85caea2ee8f55bec20e913b3324ab8f5c3304f820d42ad1b9f2ffc1a3af9927136b4419e1e579ab4c2ae3c776d293d397d575df181e6cae0a4ada5d67ecea171cca3288d57c7bbdaee3befe745fb7d634f70386d873b90c4d6c6596bb65af68f9e5121e67ebf0d89d3c909ceedfb32ce9575a7758ff080724e1ab5d5f43074ecb53a479af21ed03d7b6899c36631c0166f9d47e5e1d4528a5d3d3f744029c4b1c190cbfbad06f5f83f7ad0429fa9a2719c56ffe3783460e166de2d8>${awg3cConfig}
- name: "Стандартный 2"
  <<: *warp-common
  server: 162.159.192.1
  port: 4500
  amnezia-wg-option:
   version: 3
   jc: 4
   jmin: 40
   jmax: 70
   i1: ${i1Value}${awg3cConfig}
- name: "Стандартный 3"
  <<: *warp-common
  server: 162.159.192.1
  port: 4500
  amnezia-wg-option:
   version: 3
   jc: 4
   jmin: 40
   jmax: 70
   i1: <b 0x494e56495445207369703a626f624062696c6f78692e636f6d205349502f322e300d0a5669613a205349502f322e302f55445020706333332e61746c616e74612e636f6d3b6272616e63683d7a39684734624b3737366173646864730d0a4d61782d466f7277617264733a2037300d0a546f3a20426f62203c7369703a626f624062696c6f78692e636f6d3e0d0a46726f6d3a20416c696365203c7369703a616c6963654061746c616e74612e636f6d3e3b7461673d313932383330313737340d0a43616c6c2d49443a20613834623463373665363637313040706333332e61746c616e74612e636f6d0d0a435365713a2033313431353920494e564954450d0a436f6e746163743a203c7369703a616c69636540706333332e61746c616e74612e636f6d3e0d0a436f6e74656e742d547970653a206170706c69636174696f6e2f7364700d0a436f6e74656e742d4c656e6774683a20300d0a0d0a>
   i2: <b 0x5349502f322e302031303020547279696e670d0a5669613a205349502f322e302f55445020706333332e61746c616e74612e636f6d3b6272616e63683d7a39684734624b3737366173646864730d0a546f3a20426f62203c7369703a626f624062696c6f78692e636f6d3e0d0a46726f6d3a20416c696365203c7369703a616c6963654061746c616e74612e636f6d3e3b7461673d313932383330313737340d0a43616c6c2d49443a20613834623463373665363637313040706333332e61746c616e74612e636f6d0d0a435365713a2033313431353920494e564954450d0a436f6e74656e742d4c656e6774683a20300d0a0d0a>${awg3cConfig}
${msqp}
${proxy}    
${proxyg}`;
        const content = wireGuardText || "No configuration available";
    if (content === "No configuration available") {
        showPopup('No configuration to download', 'Ошибка');
        return;
    }
    downloadConfig(`ClashWARP_${randomNumber}.yaml`, content);
    showPopup('Скачивание конфигурации');
    } catch (error) {
        console.error('Error processing configuration:', error);
showPopup('Ошибка. Подождите несколько минут или воспользуйтесь <a href="https://generator-config-warp.vercel.app/" target="_blank" style="color: #fff; text-decoration: underline; font-weight: bold;">зеркалом</a>', 'error');
    } finally {
        button.disabled = false;
        button.classList.remove("button--loading");
    } 
});

// ClashMASQUE
ClashMASQUE.addEventListener('click', async () => {
	const button = document.getElementById('generateButton6');
	const status = document.getElementById('status');
	const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
	button.disabled = true;
	button.classList.add("button--loading");
	try {
		const configDataMSQ = await fetchFullConfigMSQ()
		let proxy = 'proxies:'
		let proxyg = `proxy-groups:
- name: WARP
  type: select
  icon: https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg
  proxies:
    - "MASQUE"
    - "MASQUE h2"
  url: 'http://speed.cloudflare.com/'
  interval: 300
rules:
- MATCH,WARP`

		const mtuInput = document.querySelector('#infoModal2 #mtu');
		const mtuVal = mtuInput?.value.trim() || mtuInput?.placeholder || '1280';

// --- AWG 3.0 ---
const awg3cToggle = document.getElementById('awg3c');
let awg3cConfig = '';
if (awg3cToggle && awg3cToggle.checked) {
	const getValue = (id) => {
		const el = document.getElementById(id);
		if (!el) return '';
		const val = el.value.trim() || el.placeholder || '';
		if (!val || Number(val) === 0) return '';
		return val;
	};
	const cpa = getValue('cpaInput');
	const rkat = getValue('rkatInput');
	const rt = getValue('rtInput');
	const rat = getValue('ratInput');
	const kt = getValue('ktInput');
	const mha = getValue('mhaInput');
	if (cpa) awg3cConfig += `\n   content-padding-addition: ${cpa}`;
	if (rkat) awg3cConfig += `\n   rekey-after-time: ${rkat}`;
	if (rt) awg3cConfig += `\n   rekey-timeout: ${rt}`;
	if (rat) awg3cConfig += `\n   reject-after-time: ${rat}`;
	if (kt) awg3cConfig += `\n   keepalive-timeout: ${kt}`;
	if (mha) awg3cConfig += `\n   max-handshake-attempts: ${mha}`;
}

// --- AWG 3.1 ---
const isAwg31 = document.getElementById('awg3_1c')?.checked;
const isRandomTrailers = document.getElementById('awg3_1_1c')?.checked;
const isDisableCookies = document.getElementById('awg3_1_2c')?.checked;

if (isAwg31) {
	if (isRandomTrailers) awg3cConfig += `\n   random-trailers: true`;
	if (isDisableCookies) awg3cConfig += `\n   disable-cookies: true`;
}

	const serversToggle = document.getElementById('servers');
		if (serversToggle.checked) {
			const configData = await fetchFullConfig()
			proxy = `warp-common: &warp-common
  type: wireguard
  ip: ${configData.client_ipv4}
  ipv6: ${configData.client_ipv6}
  private-key: ${configData.privKey}
  public-key: ${configData.peer_pub}
  allowed-ips: ['0.0.0.0/0']
  udp: true
  mtu: ${mtuVal}
  remote-dns-resolve: true
  dns: [1.1.1.1, 1.0.0.1, 2606:4700:4700::1111, 2606:4700:4700::1001]
  amnezia-wg-option:
   version: 3
   jc: 4
   jmin: 40
   jmax: 70
   i1: <b 0xc800000001018800002b45615e996de27ff5ec5f583061ab38eac69fd8fec356802847cd1c7c15a87402bb0a433d4054defedc066e>${awg3cConfig}

proxies:
- name: "🇵🇱 PL"
  <<: [ *warp-common ]
  server: pl.tribukvy.ltd
  port: 500
- name: "🇳🇱 NL"
  <<: [ *warp-common ]
  server: nl.tribukvy.ltd
  port: 500  
- name: "🇫🇮 FI"
  <<: [ *warp-common ]
  server: fi.tribukvy.ltd
  port: 500
- name: "🇷🇺 RU"
  <<: [ *warp-common ]
  server: ru0.tribukvy.ltd
  port: 500
- name: "🇱🇻 LV"
  <<: [ *warp-common ]
  server: lv.tribukvy.ltd
  port: 500
- name: "🇩🇪 DE"
  <<: [ *warp-common ]
  server: de.tribukvy.ltd
  port: 500
- name: "🇪🇪 EE"
  <<: [ *warp-common ]
  server: ee.tribukvy.ltd
  port: 500  
  
- name: "[LTE] 🇵🇱 PL"
  <<: [ *warp-common ]
  server: tel.pl.tribukvy.ltd
  port: 500
- name: "[LTE] 🇩🇪 DE"
  <<: [ *warp-common ]
  server: tel.de.tribukvy.ltd
  port: 500  
- name: "[LTE] 🇫🇮 FI"
  <<: [ *warp-common ]
  server: tel.fi.tribukvy.ltd
  port: 500`;
			proxyg = `proxy-groups:
- name: WARP + llimonix
  type: select
  icon: https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg
  proxies:
    - "MASQUE"
    - "MASQUE h2"
    - "🇵🇱 PL"
    - "🇳🇱 NL"
    - "🇫🇮 FI"
    - "🇷🇺 RU"
    - "🇱🇻 LV"
    - "🇩🇪 DE"
    - "🇪🇪 EE"
    - "[LTE] 🇵🇱 PL"
    - "[LTE] 🇫🇮 FI"
    - "[LTE] 🇩🇪 DE"
  url: 'http://speed.cloudflare.com/'
  interval: 300
rules:
- MATCH,WARP + llimonix`;
		}
		
        const wireGuardText = `msq: &msq
  type: masque
  private-key: ${configDataMSQ.privKey}
  public-key: ${configDataMSQ.peer_pub}
  ip: ${configDataMSQ.client_ipv4}
  ipv6: ${configDataMSQ.client_ipv6}
  mtu: 1280
  udp: true
  remote-dns-resolve: true
  dns: [1.1.1.1, 1.0.0.1, 2606:4700:4700::1111, 2606:4700:4700::1001]  
  
${proxy}
- name: "MASQUE"
  server: 162.159.198.2
  port: 443
  sni: 4pda.to
  <<: *msq
- name: "MASQUE h2"
  server: 162.159.198.2
  port: 443
  sni: 4pda.to
  network: h2
  <<: *msq
    
${proxyg}`;
        const content = wireGuardText || "No configuration available";
    if (content === "No configuration available") {
        showPopup('No configuration to download', 'Ошибка');
        return;
    }
    downloadConfig(`ClashWARP_${randomNumber}.yaml`, content);
    showPopup('Скачивание конфигурации');
    } catch (error) {
        console.error('Error processing configuration:', error);
showPopup('Ошибка. Подождите несколько минут или воспользуйтесь <a href="https://generator-config-warp.vercel.app/" target="_blank" style="color: #fff; text-decoration: underline; font-weight: bold;">зеркалом</a>', 'error');
    } finally {
        button.disabled = false;
        button.classList.remove("button--loading");
    } 
});

// WireSock
WireSock.addEventListener('click', async () => {
	showWarningIfNeeded(async () => {	
    const button = document.getElementById('generateButton5');
    const status = document.getElementById('status');
    const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
    button.disabled = true;
    button.classList.add("button--loading");
    try {
		const configData = await fetchFullConfig();
		const selectedDNS = getSelectedDNS();

		const keepToggle = document.getElementById('keeptogggle');
		const keepaliveInput = document.getElementById('keepalive');
		let persistentKeepalive = '';
		if (keepToggle.checked) {
			let keepaliveValue = keepaliveInput ? keepaliveInput.value.trim() : '';
			if (keepaliveValue && /^\d+$/.test(keepaliveValue)) {
				persistentKeepalive = `\nPersistentKeepalive = ${keepaliveValue}`;
			} else if (keepaliveValue === '') {
				persistentKeepalive = `\nPersistentKeepalive = 25`;
			}
		}

		const ipv6Toggle = document.getElementById('ipv6');
		let address = configData.client_ipv4;
		let dns = selectedDNS;
		
		if (ipv6Toggle.checked) {
			address = `${configData.client_ipv4}, ${configData.client_ipv6}`;
		} else {dns = dns.split(',').filter(ip => !ip.includes(':')).join(',');}

		const allowedIPs = getSelectedSites();
		const randomEndpoint = generateRandomEndpoint();
		
		const customDomainInput = document.getElementById('i1');
		const customDomain = customDomainInput ? customDomainInput.value.trim() : '';
		
		const randomDomain = customDomain || wiresockDomains[Math.floor(Math.random() * wiresockDomains.length)];
		const mtuInput = document.getElementById('mtu');
		const mtuVal = mtuInput?.value.trim() || mtuInput?.placeholder || '1280';

        const wireGuardText = `[Interface]
PrivateKey = ${configData.privKey}
Address = ${address}
DNS = ${dns}
MTU = ${mtuVal}
Jc = 4
Jmin = 40
Jmax = 70


# Protocol masking

Id = ${randomDomain}
Ip = quic
Ib = curl

[Peer]
PublicKey = ${configData.peer_pub}
AllowedIPs = ${allowedIPs}
Endpoint = ${randomEndpoint}${persistentKeepalive}`;
        
        const content = wireGuardText || "No configuration available";
        if (content === "No configuration available") {
            showPopup('No configuration to download', 'Ошибка');
            return;
        }

    const fileName = getConfigFilename('WARPw', randomNumber);
    downloadConfig(fileName, content);
        showPopup('Скачивание конфигурации');
    } catch (error) {
        console.error('Error processing configuration:', error);
        showPopup('Ошибка. Подождите несколько минут или воспользуйтесь <a href="https://generator-config-warp.vercel.app/" target="_blank" style="color: #fff; text-decoration: underline; font-weight: bold;">зеркалом</a>', 'error');
    } finally {
        button.disabled = false;
        button.classList.remove("button--loading");
    }
});
});

// Xray
Xray.addEventListener('click', async () => {
    const button = document.getElementById('generateButton7');
    const status = document.getElementById('status');
    const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
    button.disabled = true;
    button.classList.add("button--loading");
    try {
		const options = ['ca000000010192000040523d20151ea578688a48502d1b7d5ae46906ceb14547fec9aee98a407dab61b229ca5f6707be89c159f3cf9b73a3b8d906f7d3e307f8e39fdb0d35b23c0ffc635d285418cea8bfd98009d234e0e4f95891a7f4', 'c400000001015c000040570b2e25e1a2fb2e1d5cf2bfdaeb0ca79c3255f6384628e6e6c22adb43440db63fa1d26ad16120d9cbdbf0dc2f7a8eb3525561b193c6b6a0ef44e8d118c3b04a3ae880c081a9b9e97321315915787938abd8b925506b830d', 'cb0000000101d6000040500195593d5d325e28e7a9d879ff474b9a1a344d76a202d92776ceaee0e7f8d933ded8bc2f49a31d19cfa2f42a8b6e056c76c4d64b4f09d870f342e0872e69f5486b4e35e32314107a3937b8d3cf14cfc8', 'ce0000000101a400004056160e0ac66b428015297d5e103316b68a89058b61bd795b8cdfd9e6f10e28626e7a4cdf5439f6f67a3b29b4a72361b99cd77343bcb2de18370bdb40b930b3720f46ac48c1833eea55caf480f801f7cbf2694c9860cb6b', 'c70000000101ee00004052dce5fd8b7962ba5c6a03d50565ac10d5cf625b0504d3dd5fc9d3e1e620bb4fd278dd951bb491a144244d01fd9decd226554690447e87773fb6e5212d09e8a5aa2cd9a2a3e25325b5b81264b0a2c315594e05'];
		const configData = await fetchFullConfig();
		const prefix = getConfigPrefix();
		const ipv6Toggle = document.getElementById('ipv6');
		const i1Toggle = document.getElementById('i1toggle');
        const i2area = document.getElementById('i2');
        let i1Value = options[Math.floor(Math.random() * options.length)];
		if (i1Toggle.checked && i2area.value.trim()) {
			i1Value = i2area.value.trim();
			const match = i1Value.match(/0x([0-9a-fA-F]+)/);
			i1Value = match ? match[1] : '';
        }
		let ipv6 = '';
		let ipv6a = '';
		let dnsList = getSelectedDNS()
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

if (!ipv6Toggle.checked) {
    dnsList = dnsList.filter(ip => !ip.includes(':'));
} else { 
	ipv6 = `,\n                    "${configData.client_ipv6}/128"`;
	ipv6a =  `,\n                            "::/0"`;
}
	dnsServers = dnsList
    .map(s => `            "${s}"`)
    .join(',\n');
	
		
		const randomEndpoint = generateRandomEndpoint();
		const keepToggle = document.getElementById('keeptogggle');
		const keepaliveInput = document.getElementById('keepalive');
		const mtuInput = document.getElementById('mtu');
		const mtuVal = mtuInput?.value.trim() || mtuInput?.placeholder || '1280';
		let persistentKeepalive = '';
		if (keepToggle.checked) {
			let keepaliveValue = keepaliveInput ? keepaliveInput.value.trim() : '';
			if (keepaliveValue && /^\d+$/.test(keepaliveValue)) {
				persistentKeepalive = `\n                        "keepAlive": ${keepaliveValue},`;
			} else if (keepaliveValue === '') {
				persistentKeepalive = `\n                        "keepAlive": 25,`;
			}
		}

		const wireGuardText = `{
    "dns": {
        "servers": [
${dnsServers}
        ]
    },
    "inbounds": [
        {
            "listen": "127.0.0.1",
            "port": 10808,
            "protocol": "socks",
            "settings": {
                "auth": "noauth",
                "udp": true
            },
            "sniffing": {
                "destOverride": [
                    "http",
                    "tls"
                ],
                "enabled": true
            },
            "tag": "socks-in"
        },
        {
            "listen": "127.0.0.1",
            "port": 10809,
            "protocol": "http",
            "settings": {
            },
             "sniffing": {
                "destOverride": [
                    "http",
                    "tls"
                ],
                "enabled": true
            },
            "tag": "http-in"
        }
    ],
    "log": {
        "loglevel": "warning"
    },
    "meta": null,
    "outbounds": [
        {
            "protocol": "wireguard",
            "settings": {
                "address": [
                    "${configData.client_ipv4}/32"${ipv6}
                ],
                "mtu": ${mtuVal},
                "peers": [
                    {
                        "allowedIPs": [
                            "0.0.0.0/0"${ipv6a}
                        ],
                        "endpoint": "${randomEndpoint}",${persistentKeepalive}
                        "publicKey": "${configData.peer_pub}"
                    }
                ],
                "secretKey": "${configData.privKey}"
            },
            "streamSettings": {
                "sockopt": {
                    "dialerProxy": "noise-out"
                }
            },
            "tag": "warp"
        },
        {
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "AsIs",
                "noises": [
                    {
                        "delay": "1-2",
                        "packet": "${i1Value}",
                        "type": "hex"
                    },
                    {
                        "delay": "1-3",
                        "packet": "23-911",
                        "type": "rand"
                    },
                    {
                        "delay": "1-3",
                        "packet": "23-911",
                        "type": "rand"
                    },
                    {
                        "delay": "1-3",
                        "packet": "23-911",
                        "type": "rand"
                    },
                    {
                        "delay": "1-3",
                        "packet": "23-911",
                        "type": "rand"
                    },
                    {
                        "delay": "1-3",
                        "packet": "23-911",
                        "type": "rand"
                    },
                    {
                        "delay": "1-3",
                        "packet": "23-911",
                        "type": "rand"
                    },
                    {
                        "delay": "1-3",
                        "packet": "23-911",
                        "type": "rand"
                    },
                    {
                        "delay": "1-3",
                        "packet": "23-911",
                        "type": "rand"
                    }
                ]
            },
            "tag": "noise-out"
        }
    ],
    "remarks": "${prefix}WARP",
    "routing": {
        "domainStrategy": "IPIfNonMatch",
        "rules": [
            {
                "outboundTag": "noise-out",
                "port": "53",
                "type": "field"
            },
            {
                "network": "tcp,udp",
                "outboundTag": "warp",
                "type": "field"
            }
        ]
    }
}`;
        const content = wireGuardText || "No configuration available";
    if (content === "No configuration available") {
        showPopup('No configuration to download', 'Ошибка');
        return;
    }
    downloadConfig(`${prefix}XrayWARP_${randomNumber}.json`, content);
    showPopup('Скачивание конфигурации');
    } catch (error) {
        console.error('Error processing configuration:', error);
showPopup('Ошибка. Подождите несколько минут или воспользуйтесь <a href="https://generator-config-warp.vercel.app/" target="_blank" style="color: #fff; text-decoration: underline; font-weight: bold;">зеркалом</a>', 'error');
    } finally {
        button.disabled = false;
        button.classList.remove("button--loading");
    } 
});

document.getElementById('telegramButton').onclick = function() {
    window.location.href = 'https://t.me/warp_1_1_1_1';
}

document.getElementById('projectsButton').onclick = function() {
    window.location.href = 'https://my-other-projects.vercel.app/';
}

document.getElementById('adButton').onclick = function() {
    window.location.href = 'https://t.me/AgnosiaVPN_bot'
}

document.getElementById('promoButton').onclick = function() {
    window.location.href = 'https://storage.googleapis.com/amnezia/amnezia.org?m-path=premium&arf=VG755WBZDBAPGGYM';
}


function getSelectedSites() {
	
	const toggleCheckbox = document.getElementById('rules');
    if (toggleCheckbox && toggleCheckbox.checked) {
        return "1.0.0.0/8, 2.0.0.0/7, 4.0.0.0/6, 8.0.0.0/7, 11.0.0.0/8, 12.0.0.0/6, 16.0.0.0/4, 32.0.0.0/3, 64.0.0.0/3, 96.0.0.0/4, 112.0.0.0/5, 120.0.0.0/6, 124.0.0.0/7, 126.0.0.0/8, 128.0.0.0/3, 160.0.0.0/5, 168.0.0.0/8, 169.0.0.0/9, 169.128.0.0/10, 169.192.0.0/11, 169.224.0.0/12, 169.240.0.0/13, 169.248.0.0/14, 169.252.0.0/15, 169.255.0.0/16, 170.0.0.0/7, 172.0.0.0/12, 172.32.0.0/11, 172.64.0.0/10, 172.128.0.0/9, 173.0.0.0/8, 174.0.0.0/7, 176.0.0.0/4, 192.0.0.0/9, 192.128.0.0/11, 192.160.0.0/13, 192.169.0.0/16, 192.170.0.0/15, 192.172.0.0/14, 192.176.0.0/12, 192.192.0.0/10, 193.0.0.0/8, 194.0.0.0/7, 196.0.0.0/6, 200.0.0.0/5, 208.0.0.0/4, 224.0.0.0/4, ::/1, 8000::/2, c000::/3, e000::/4, f000::/5, f800::/6, fe00::/9, fec0::/10, ff00::/8";
    }
	
    const sites = [
        { id: 'youtube', ip: '1.192.0.0/10, 1.37.0.0/16, 1.54.0.0/16, 1.9.0.0/16, 101.64.0.0/10, 103.0.0.0/14, 103.100.128.0/19, 103.101.0.0/18, 103.101.128.0/17, 103.103.128.0/17, 103.105.0.0/16, 103.106.192.0/18, 103.107.128.0/17, 103.108.0.0/17, 103.111.128.0/17, 103.111.64.0/19, 103.112.48.0/21, 103.118.64.0/18, 103.119.0.0/16, 103.12.0.0/16, 103.120.0.0/16, 103.122.0.0/15, 103.124.0.0/16, 103.132.16.0/20, 103.132.64.0/18, 103.137.0.0/17, 103.139.128.0/17, 103.14.16.0/20, 103.140.0.0/16, 103.141.64.0/22, 103.144.0.0/16, 103.146.0.0/15, 103.148.0.0/14, 103.15.0.0/16, 103.152.0.0/13, 103.160.0.0/11, 103.17.128.0/17, 103.192.0.0/17, 103.193.0.0/17, 103.196.128.0/17, 103.199.0.0/18, 103.199.192.0/19, 103.199.224.0/21, 103.199.64.0/20, 103.20.0.0/16, 103.200.28.0/22, 103.200.32.0/19, 103.206.128.0/18, 103.21.0.0/17, 103.21.128.0/18, 103.211.104.0/21, 103.211.16.0/20, 103.214.160.0/20, 103.214.192.0/18, 103.218.0.0/16, 103.221.128.0/17, 103.225.176.0/20, 103.225.96.0/19, 103.226.128.0/18, 103.226.224.0/19, 103.228.130.0/23, 103.230.0.0/17, 103.232.128.0/19, 103.233.0.0/16, 103.234.0.0/17, 103.240.180.0/22, 103.242.0.0/19, 103.242.128.0/17, 103.243.0.0/18, 103.243.112.0/21, 103.246.240.0/21, 103.249.0.0/16, 103.25.128.0/17, 103.251.0.0/17, 103.251.192.0/18, 103.252.96.0/19, 103.26.208.0/20, 103.27.0.0/17, 103.28.0.0/15, 103.38.0.0/16, 103.39.128.0/17, 103.39.64.0/18, 103.40.0.0/16, 103.41.0.0/19, 103.42.0.0/16, 103.44.0.0/16, 103.52.0.0/16, 103.54.32.0/19, 103.56.0.0/17, 103.58.64.0/18, 103.59.128.0/17, 103.62.128.0/17, 103.66.64.0/18, 103.7.0.0/17, 103.70.0.0/16, 103.73.160.0/21, 103.73.64.0/18, 103.76.192.0/18, 103.80.0.0/17, 103.85.128.0/17, 103.85.64.0/18, 103.88.192.0/19, 103.89.0.0/16, 103.94.128.0/17, 103.97.0.0/18, 103.97.128.0/18, 104.16.251.55/32, 104.16.252.55/32, 104.21.35.125/32, 104.21.47.95/32, 104.21.74.58/32, 104.23.124.189/32, 104.23.125.189/32, 104.237.160.0/19, 104.244.40.0/21, 104.26.8.2/32, 104.26.9.2/32, 104.31.142.88/32, 104.36.192.0/21, 105.187.0.0/16, 105.203.193.45/32, 106.0.0.0/8, 107.181.160.0/19, 108.160.160.0/20, 108.177.103.0/24, 108.177.104.0/24, 108.177.111.0/24, 108.177.112.0/24, 108.177.119.0/24, 108.177.120.0/22, 108.177.125.0/24, 108.177.126.0/23, 108.177.8.0/21, 108.177.96.0/23, 108.177.98.0/24, 109.224.41.0/24, 109.239.184.0/21, 110.0.0.0/10, 110.128.0.0/10, 110.64.0.0/12, 110.93.128.0/17, 111.0.0.0/8, 112.0.0.0/8, 113.128.0.0/10, 113.192.0.0/13, 113.64.0.0/10, 114.0.0.0/9, 114.136.0.0/13, 114.250.63.0/24, 114.250.64.0/23, 114.250.67.0/24, 114.250.69.0/24, 114.250.70.0/24, 115.126.0.0/15, 115.164.0.0/15, 115.176.0.0/12, 115.64.0.0/11, 116.204.128.0/18, 116.206.0.0/18, 116.206.128.0/19, 116.212.128.0/19, 116.56.0.0/13, 116.64.0.0/10, 117.0.0.0/12, 117.128.0.0/9, 117.52.0.0/15, 117.55.224.0/19, 117.96.0.0/12, 118.107.180.0/22, 118.128.0.0/9, 118.68.0.0/14, 118.96.0.0/13, 119.0.0.0/13, 119.152.0.0/13, 119.16.0.0/12, 119.160.0.0/11, 119.32.0.0/11, 12.0.0.0/8, 120.0.0.0/8, 121.46.64.0/19, 121.64.0.0/12, 122.0.0.0/10, 122.144.0.0/14, 122.152.0.0/13, 122.192.0.0/11, 122.248.0.0/14, 122.252.0.0/15, 123.104.0.0/13, 123.128.0.0/10, 123.192.0.0/11, 123.240.0.0/13, 123.253.0.0/18, 123.253.128.0/18, 124.0.0.0/9, 124.192.0.0/11, 124.248.0.0/14, 125.128.0.0/9, 125.64.0.0/10, 126.0.0.0/7, 128.0.0.0/16, 128.121.0.0/16, 128.242.0.0/16, 128.75.0.0/16, 130.211.0.0/16, 136.22.128.0/19, 137.59.16.0/20, 137.59.32.0/20, 137.59.64.0/18, 139.5.64.0/19, 14.102.128.0/18, 14.128.0.0/9, 140.213.0.0/16, 142.161.0.0/16, 142.250.0.0/16, 142.251.0.0/16, 144.208.192.0/18, 144.48.128.0/18, 145.236.72.0/23, 145.255.0.0/20, 148.163.0.0/17, 148.64.96.0/20, 148.69.0.0/16, 149.54.0.0/17, 150.107.0.0/18, 150.107.204.0/22, 150.129.0.0/21, 150.129.32.0/19, 150.129.96.0/19, 154.0.0.0/13, 154.64.0.0/10, 156.233.0.0/16, 157.20.0.0/16, 157.240.0.0/16, 157.8.0.0/14, 159.106.0.0/16, 159.138.20.20/32, 159.192.0.0/16, 159.65.0.0/16, 161.49.0.0/17, 162.125.0.0/16, 162.220.8.0/21, 162.252.180.0/22, 163.40.0.0/13, 163.53.64.0/18, 164.215.0.0/16, 165.165.0.0/16, 165.21.0.0/16, 166.70.0.0/16, 168.143.0.0/16, 170.238.0.0/16, 171.128.0.0/9, 171.96.0.0/11, 172.217.0.0/19, 172.217.112.4/32, 172.217.113.4/32, 172.217.114.4/32, 172.217.115.4/32, 172.217.116.4/32, 172.217.117.4/32, 172.217.118.4/32, 172.217.119.4/32, 172.217.128.0/21, 172.217.136.0/24, 172.217.140.9/32, 172.217.142.102/32, 172.217.143.0/24, 172.217.145.0/24, 172.217.146.0/23, 172.217.149.0/24, 172.217.150.0/23, 172.217.152.0/24, 172.217.160.0/20, 172.217.192.0/22, 172.217.197.0/24, 172.217.203.0/24, 172.217.204.0/24, 172.217.208.0/24, 172.217.209.94/32, 172.217.211.94/32, 172.217.212.0/24, 172.217.213.94/32, 172.217.214.0/23, 172.217.216.0/24, 172.217.217.94/32, 172.217.218.0/23, 172.217.221.94/32, 172.217.222.0/24, 172.217.68.94/32, 172.217.70.94/32, 172.217.71.94/32, 172.217.72.94/32, 172.217.74.94/32, 172.217.75.0/24, 172.217.76.0/24, 172.217.77.94/32, 172.217.78.94/32, 172.217.79.0/24, 172.253.112.0/21, 172.253.120.0/24, 172.253.122.0/23, 172.253.124.0/22, 172.253.130.0/24, 172.253.132.94/32, 172.253.133.94/32, 172.253.134.94/32, 172.253.135.94/32, 172.253.139.94/32, 172.253.143.0/24, 172.253.144.94/32, 172.253.145.94/32, 172.253.147.0/24, 172.253.148.94/32, 172.253.149.94/32, 172.253.151.94/32, 172.253.152.0/23, 172.253.154.0/24, 172.253.155.94/32, 172.253.156.94/32, 172.253.157.0/24, 172.253.158.94/32, 172.253.58.0/24, 172.253.62.0/23, 172.67.146.99/32, 172.67.167.251/32, 172.67.221.46/32, 172.67.71.70/32, 173.194.0.0/21, 173.194.10.0/24, 173.194.11.137/32, 173.194.114.0/24, 173.194.12.0/24, 173.194.128.0/23, 173.194.133.0/24, 173.194.134.0/23, 173.194.136.0/21, 173.194.14.0/23, 173.194.144.0/24, 173.194.150.0/23, 173.194.152.0/22, 173.194.16.0/24, 173.194.160.0/21, 173.194.17.135/32, 173.194.174.0/23, 173.194.176.0/20, 173.194.18.0/23, 173.194.192.0/19, 173.194.22.0/23, 173.194.24.0/22, 173.194.28.0/23, 173.194.31.0/24, 173.194.40.94/32, 173.194.41.94/32, 173.194.42.94/32, 173.194.43.94/32, 173.194.44.94/32, 173.194.45.94/32, 173.194.46.94/32, 173.194.47.94/32, 173.194.49.0/24, 173.194.50.0/23, 173.194.52.0/22, 173.194.56.0/23, 173.194.59.0/24, 173.194.60.0/23, 173.194.64.0/22, 173.194.68.0/23, 173.194.70.0/24, 173.194.73.0/24, 173.194.74.0/24, 173.194.76.0/22, 173.194.8.0/24, 173.208.128.0/17, 173.231.0.0/18, 173.234.32.0/19, 173.236.128.0/17, 173.244.192.0/19, 173.252.192.0/18, 173.252.64.0/18, 173.255.192.0/18, 174.36.0.0/15, 175.104.0.0/14, 175.112.0.0/12, 175.96.0.0/13, 176.28.128.0/17, 177.64.0.0/12, 178.151.230.0/24, 178.176.156.46/32, 178.22.168.0/24, 178.66.83.0/24, 179.32.0.0/12, 179.60.0.0/16, 179.64.0.0/10, 180.149.224.0/19, 180.149.48.0/20, 180.149.64.0/18, 180.160.0.0/11, 180.192.0.0/11, 181.0.0.0/11, 181.208.0.0/14, 182.176.0.0/12, 182.18.178.204/32, 182.192.0.0/10, 182.2.0.0/16, 182.50.139.56/32, 182.79.0.0/16, 182.93.66.141/32, 183.0.0.0/8, 184.150.0.0/17, 184.150.128.0/18, 184.172.0.0/15, 184.72.0.0/15, 185.100.209.0/24, 185.158.208.0/23, 185.192.248.0/26, 185.192.249.0/24, 185.192.251.192/26, 185.225.248.0/24, 185.23.124.0/23, 185.45.4.0/22, 185.48.9.0/24, 185.5.161.0/26, 185.60.216.0/22, 185.61.94.0/23, 186.128.0.0/9, 187.0.0.0/11, 187.128.0.0/9, 188.114.96.0/22, 188.120.127.0/24, 188.21.9.0/24, 188.234.136.0/21, 188.43.61.0/24, 188.43.68.0/23, 188.93.174.0/24, 189.128.0.0/9, 190.0.0.0/10, 190.224.0.0/11, 192.133.76.0/22, 192.135.88.0/21, 192.178.0.0/16, 192.179.0.0/16, 192.248.0.0/17, 192.86.0.0/24, 193.109.164.0/22, 193.126.242.0/26, 194.78.0.0/24, 194.9.24.0/24, 194.9.25.0/24, 195.12.177.0/26, 195.176.255.192/26, 195.187.0.0/16, 195.234.112.0/22, 195.239.44.0/24, 195.87.177.0/24, 195.95.178.0/24, 196.1.128.0/17, 196.128.0.0/9, 196.32.0.0/11, 197.0.0.0/8, 198.27.64.0/18, 198.44.160.0/19, 199.16.156.0/22, 199.193.112.0/21, 199.59.148.0/22, 199.85.224.0/21, 199.96.56.0/21, 200.96.0.0/11, 201.0.0.0/11, 201.160.0.0/11, 201.48.0.0/16, 202.128.0.0/14, 202.136.0.0/13, 202.148.0.0/14, 202.152.0.0/13, 202.160.0.0/15, 202.163.0.0/16, 202.165.0.0/16, 202.166.0.0/15, 202.168.0.0/15, 202.182.0.0/15, 202.184.0.0/13, 202.24.0.0/13, 202.39.0.0/16, 202.51.64.0/21, 202.51.72.0/22, 202.51.79.0/24, 202.52.0.0/14, 202.60.0.0/16, 202.64.0.0/14, 202.68.0.0/15, 202.70.0.0/16, 202.72.0.0/14, 202.79.0.0/17, 202.80.0.0/13, 202.88.0.0/14, 202.93.0.0/16, 203.101.0.0/16, 203.110.0.0/15, 203.112.0.0/12, 203.128.0.0/12, 203.13.128.0/17, 203.144.0.0/13, 203.162.0.0/15, 203.167.0.0/16, 203.170.0.0/16, 203.171.128.0/17, 203.176.0.0/13, 203.184.0.0/14, 203.189.0.0/17, 203.192.0.0/10, 203.64.0.0/13, 203.76.0.0/15, 203.78.0.0/17, 203.80.0.0/13, 204.145.2.0/23, 204.79.196.0/23, 204.84.0.0/15, 205.186.128.0/18, 206.144.0.0/14, 207.231.168.0/21, 208.0.0.0/11, 208.101.0.0/18, 208.110.64.0/19, 208.187.128.0/17, 208.192.0.0/10, 208.43.0.0/16, 208.54.0.0/17, 208.77.40.0/21, 208.84.220.0/22, 208.98.128.0/18, 209.115.128.0/17, 209.141.112.0/20, 209.145.96.0/19, 209.146.0.0/17, 209.148.128.0/17, 209.191.192.0/19, 209.52.0.0/15, 209.85.144.0/22, 209.85.164.0/23, 209.85.200.0/22, 209.85.224.0/24, 209.85.226.0/24, 209.85.228.0/23, 209.85.230.0/24, 209.85.232.0/22, 209.91.64.0/18, 209.95.32.0/19, 210.0.0.0/7, 212.106.200.0/21, 212.113.52.0/24, 212.154.0.0/17, 212.156.0.0/16, 212.188.10.0/24, 212.188.34.0/24, 212.188.35.0/24, 212.188.37.0/24, 212.188.49.0/24, 212.20.18.0/24, 212.39.86.0/24, 212.43.1.0/24, 212.43.8.0/21, 212.55.184.0/22, 212.90.48.0/20, 213.152.1.64/27, 213.202.0.0/21, 213.221.56.0/27, 213.55.64.0/18, 213.59.210.0/24, 213.59.237.0/24, 216.105.64.0/20, 216.123.192.0/18, 216.19.176.0/20, 216.239.32.0/24, 216.239.34.0/24, 216.239.36.0/24, 216.239.38.0/24, 216.58.192.0/20, 216.58.208.0/21, 216.58.217.0/24, 216.58.220.0/22, 217.119.118.64/26, 217.130.7.0/25, 217.175.200.64/26, 217.197.248.0/23, 217.73.128.0/22, 218.0.0.0/7, 220.0.0.0/9, 220.160.0.0/11, 221.0.0.0/8, 222.0.0.0/8, 223.128.0.0/9, 223.25.128.0/17, 223.27.128.0/17, 223.32.0.0/11, 23.142.48.0/24, 23.152.160.0/24, 23.202.231.167/32, 23.217.138.108/32, 23.224.0.0/15, 23.234.0.0/18, 23.96.0.0/13, 24.244.0.0/18, 27.112.0.0/13, 27.128.0.0/9, 27.2.0.0/15, 27.64.0.0/11, 27.96.0.0/12, 31.13.64.0/18, 31.145.0.0/16, 34.98.127.226/32, 36.0.0.0/9, 37.152.0.0/22, 38.0.0.0/7, 4.0.0.0/9, 40.136.0.0/15, 41.0.0.0/8, 42.0.0.0/8, 43.224.0.0/16, 43.226.16.0/20, 43.228.0.0/16, 43.230.128.0/21, 43.245.128.0/20, 43.245.144.0/21, 43.245.192.0/20, 43.245.96.0/20, 43.250.0.0/16, 43.252.16.0/21, 45.112.128.0/18, 45.113.128.0/18, 45.114.8.0/21, 45.116.192.0/19, 45.116.224.0/20, 45.118.240.0/21, 45.121.128.0/17, 45.124.0.0/18, 45.127.0.0/17, 45.14.108.0/22, 45.249.0.0/16, 45.253.0.0/16, 45.54.0.0/17, 45.64.0.0/16, 45.76.0.0/15, 46.134.192.0/18, 46.32.101.0/24, 46.36.112.0/20, 46.61.154.0/24, 47.88.0.0/14, 49.192.0.0/11, 49.224.0.0/13, 49.32.0.0/11, 5.195.0.0/16, 5.21.228.0/22, 5.30.0.0/15, 5.32.175.0/24, 50.0.0.0/15, 50.117.0.0/17, 50.128.0.0/9, 50.22.0.0/15, 50.87.0.0/16, 51.39.0.0/16, 52.175.9.80/32, 52.58.1.161/32, 54.144.128.85/32, 54.234.18.200/32, 54.64.0.0/11, 58.0.0.0/10, 58.112.0.0/12, 58.128.0.0/9, 58.64.0.0/11, 59.0.0.0/9, 59.152.0.0/18, 59.152.96.0/20, 59.153.128.0/17, 59.160.0.0/11, 61.0.0.0/13, 61.128.0.0/9, 61.16.0.0/12, 61.32.0.0/11, 61.64.0.0/10, 62.0.0.0/16, 62.149.96.0/20, 62.212.240.0/20, 62.231.75.0/24, 63.64.0.0/10, 64.13.192.0/18, 64.15.112.0/20, 64.233.160.0/21, 64.233.168.0/22, 64.233.176.0/20, 64.4.224.0/20, 64.53.128.0/17, 65.192.0.0/11, 65.240.0.0/13, 65.49.0.0/17, 66.102.0.0/20, 66.112.176.0/20, 66.220.144.0/20, 66.248.254.0/24, 66.58.128.0/17, 66.96.224.0/19, 67.15.0.0/16, 67.204.128.0/18, 67.228.0.0/16, 67.230.160.0/19, 67.50.0.0/17, 69.162.128.0/18, 69.171.224.0/19, 69.197.128.0/18, 69.30.0.0/18, 69.48.216.0/21, 69.50.192.0/19, 69.51.64.0/18, 69.59.192.0/19, 69.63.176.0/20, 72.19.32.0/19, 72.234.0.0/15, 74.125.0.0/21, 74.125.12.0/23, 74.125.124.0/24, 74.125.126.0/23, 74.125.128.0/20, 74.125.15.0/24, 74.125.152.0/21, 74.125.160.0/20, 74.125.192.0/23, 74.125.195.0/24, 74.125.196.0/22, 74.125.20.0/23, 74.125.200.0/22, 74.125.204.0/23, 74.125.206.0/24, 74.125.23.0/24, 74.125.24.0/24, 74.125.26.0/23, 74.125.28.0/23, 74.125.31.0/24, 74.125.68.0/22, 74.125.8.0/22, 74.125.90.0/24, 74.125.96.0/20, 74.86.0.0/16, 75.126.0.0/16, 75.98.144.0/20, 77.120.12.0/22, 77.37.252.0/23, 78.37.109.192/26, 78.37.65.0/26, 79.133.76.0/23, 8.242.0.0/15, 8.47.0.0/16, 8.6.0.0/16, 80.253.29.0/24, 80.77.172.0/22, 80.87.199.46/32, 80.87.64.0/19, 80.97.192.0/18, 81.130.96.0/20, 81.192.0.0/16, 81.200.2.0/24, 81.23.16.0/21, 81.23.24.0/21, 81.27.242.128/27, 82.102.152.0/21, 82.102.167.0/24, 82.114.162.0/23, 82.147.133.128/26, 82.148.96.0/19, 82.199.192.0/20, 82.76.231.64/26, 83.219.145.0/24, 83.224.64.0/20, 84.15.64.0/24, 84.235.64.0/22, 84.235.77.0/24, 84.235.78.0/24, 85.112.112.0/20, 85.187.128.0/19, 85.249.244.0/23, 86.120.7.128/27, 86.62.126.64/27, 87.245.192.0/20, 87.245.216.0/21, 88.191.249.0/24, 88.201.0.0/17, 88.218.139.0/24, 89.113.122.0/23, 89.27.128.0/17, 89.35.125.0/24, 90.180.0.0/14, 90.200.0.0/14, 91.185.2.0/24, 92.80.0.0/13, 93.123.23.0/24, 93.179.96.0/21, 94.142.38.0/24, 94.203.108.0/23, 94.24.192.0/18, 94.31.189.0/24, 94.96.0.0/14, 95.142.107.0/27, 95.167.73.0/24, 95.168.192.0/19, 95.59.170.0/24, 95.66.0.0/18, 96.30.64.0/18, 96.44.128.0/18, 96.63.128.0/19, 96.9.128.0/19, 98.159.96.0/20' },
        { id: 'discord', ip: '103.224.0.0/16, 104.154.0.0/15, 104.16.0.0/12, 108.136.0.0/14, 108.156.0.0/14, 108.177.0.0/17, 13.224.0.0/12, 13.248.0.0/14, 13.32.0.0/12, 138.128.136.0/21, 142.250.0.0/15, 143.204.0.0/16, 15.196.0.0/14, 15.204.0.0/16, 162.158.0.0/15, 162.210.192.0/21, 166.117.0.0/16, 170.178.160.0/19, 172.217.0.0/16, 172.241.208.0/21, 172.253.0.0/16, 172.64.0.0/13, 173.194.0.0/16, 173.208.64.0/18, 173.234.144.0/20, 18.128.0.0/9, 18.64.0.0/10, 185.107.56.0/24, 188.114.96.0/22, 192.157.48.0/20, 192.178.0.0/15, 199.115.112.0/21, 204.11.56.0/23, 207.244.64.0/18, 208.115.192.0/18, 208.91.196.0/23, 209.85.128.0/17, 212.32.224.0/19, 212.7.208.0/22, 212.92.104.0/21, 216.137.32.0/19, 216.245.192.0/19, 216.58.192.0/19, 23.227.32.0/19, 23.82.0.0/16, 3.128.0.0/9, 34.0.0.0/15, 34.128.0.0/10, 34.2.0.0/15, 34.64.0.0/10, 35.192.0.0/12, 35.208.0.0/12, 37.1.216.0/21, 37.48.64.0/18, 45.134.10.0/24, 5.200.14.128/25, 5.79.64.0/18, 51.81.0.0/16, 52.222.0.0/16, 52.84.0.0/14, 54.192.0.0/12, 54.224.0.0/11, 64.120.0.0/18, 64.233.160.0/19, 64.31.0.0/18, 65.8.0.0/14, 66.22.192.0/18, 69.162.64.0/18, 70.32.0.0/20, 74.125.0.0/16, 74.63.192.0/18, 75.2.0.0/17, 76.223.0.0/17, 77.247.183.144/28, 78.157.209.168/29, 8.0.0.0/13, 8.32.0.0/11, 81.17.16.0/20, 81.171.0.0/19, 82.192.64.0/19, 85.17.5.0/24, 94.229.72.112/28, 95.211.136.160/27, 99.83.128.0/17, 99.84.0.0/16, 99.86.0.0/16' },
        { id: 'twitter', ip: '104.18.0.0/16, 104.244.40.0/21, 140.248.0.0/16, 146.75.0.0/16, 151.101.0.0/16, 152.192.0.0/13, 162.159.140.229/32, 172.64.148.197/32, 172.64.150.129/32, 172.64.151.110/32, 172.66.0.227/32, 192.229.128.0/17, 199.232.0.0/16, 209.237.192.0/19, 68.232.32.0/20, 69.195.160.0/19, 93.184.220.0/22' },
        { id: 'instagram', ip: '102.0.0.0/8, 103.200.28.0/22, 103.214.160.0/20, 103.226.224.0/19, 103.228.130.0/23, 103.230.0.0/17, 103.240.180.0/22, 103.246.240.0/21, 103.252.96.0/19, 103.39.64.0/18, 103.42.0.0/16, 103.56.0.0/17, 103.73.160.0/21, 103.97.0.0/18, 103.97.128.0/18, 104.16.251.55/32, 104.16.252.55/32, 104.23.124.189/32, 104.23.125.189/32, 104.244.40.0/21, 104.31.142.88/32, 107.181.160.0/19, 108.160.160.0/20, 111.0.0.0/8, 114.0.0.0/10, 115.126.0.0/15, 116.64.0.0/10, 118.107.180.0/22, 118.128.0.0/9, 119.16.0.0/12, 122.0.0.0/10, 122.248.0.0/14, 124.0.0.0/9, 128.121.0.0/16, 128.242.0.0/16, 129.134.0.0/16, 130.211.0.0/16, 148.163.0.0/17, 150.107.0.0/18, 154.64.0.0/10, 156.233.0.0/16, 157.240.0.0/16, 159.106.0.0/16, 159.138.20.20/32, 159.65.0.0/16, 162.125.0.0/16, 162.220.8.0/21, 163.70.128.0/17, 168.143.0.0/16, 173.208.128.0/17, 173.231.0.0/18, 173.234.32.0/19, 173.236.128.0/17, 173.244.192.0/19, 173.252.192.0/18, 173.252.64.0/18, 173.255.192.0/18, 174.36.0.0/15, 179.60.0.0/16, 182.50.139.56/32, 184.172.0.0/15, 184.72.0.0/15, 185.45.4.0/22, 185.60.216.0/22, 192.133.76.0/22, 195.229.0.0/16, 198.27.64.0/18, 198.44.160.0/19, 199.16.156.0/22, 199.193.112.0/21, 199.59.148.0/22, 199.96.56.0/21, 202.160.0.0/15, 202.182.0.0/15, 202.52.0.0/14, 203.110.0.0/15, 204.79.196.0/23, 205.186.128.0/18, 208.0.0.0/11, 208.101.0.0/18, 208.43.0.0/16, 208.77.40.0/21, 209.95.32.0/19, 210.0.0.0/7, 212.95.183.192/26, 213.169.57.64/26, 23.224.0.0/15, 23.234.0.0/18, 23.96.0.0/13, 31.13.64.0/18, 38.0.0.0/7, 4.0.0.0/9, 43.226.16.0/20, 45.114.8.0/21, 45.76.0.0/15, 47.88.0.0/14, 50.117.0.0/17, 50.22.0.0/15, 50.87.0.0/16, 52.175.9.80/32, 52.58.1.161/32, 54.234.18.200/32, 54.64.0.0/11, 57.0.0.0/8, 59.0.0.0/9, 59.160.0.0/11, 64.13.192.0/18, 65.49.0.0/17, 66.220.144.0/20, 67.15.0.0/16, 67.228.0.0/16, 67.230.160.0/19, 69.162.128.0/18, 69.171.224.0/19, 69.197.128.0/18, 69.30.0.0/18, 69.50.192.0/19, 69.63.176.0/20, 74.86.0.0/16, 75.126.0.0/16, 80.87.199.46/32, 87.245.208.0/20, 88.191.249.0/24, 93.179.96.0/21, 96.44.128.0/18, 98.159.96.0/20' },
        { id: 'facebook', ip: '102.0.0.0/8, 103.200.28.0/22, 103.226.224.0/19, 103.228.130.0/23, 103.230.0.0/17, 103.240.180.0/22, 103.246.240.0/21, 103.252.96.0/19, 103.42.0.0/16, 103.56.0.0/17, 103.73.160.0/21, 103.97.0.0/18, 103.97.128.0/18, 104.103.0.0/16, 104.104.0.0/16, 104.110.0.0/16, 104.124.0.0/16, 104.16.251.55/32, 104.16.252.55/32, 104.23.124.189/32, 104.23.125.189/32, 104.244.40.0/21, 104.31.142.88/32, 104.71.0.0/16, 104.76.0.0/15, 104.83.0.0/16, 104.84.152.74/32, 107.181.160.0/19, 108.160.160.0/20, 111.0.0.0/8, 112.0.0.0/8, 114.0.0.0/10, 115.126.0.0/15, 116.64.0.0/10, 118.107.180.0/22, 118.128.0.0/9, 119.16.0.0/12, 122.0.0.0/10, 122.248.0.0/14, 124.0.0.0/9, 128.121.0.0/16, 128.242.0.0/16, 129.134.0.0/16, 13.104.0.0/14, 148.163.0.0/17, 150.107.0.0/18, 152.192.0.0/13, 154.64.0.0/10, 156.233.0.0/16, 157.240.0.0/16, 159.106.0.0/16, 159.138.20.20/32, 159.65.0.0/16, 162.125.0.0/16, 162.220.8.0/21, 163.70.128.0/17, 168.143.0.0/16, 173.208.128.0/17, 173.231.0.0/18, 173.236.128.0/17, 173.244.192.0/19, 173.252.192.0/18, 173.252.64.0/18, 173.255.192.0/18, 174.36.0.0/15, 179.60.0.0/16, 182.50.139.56/32, 184.172.0.0/15, 184.24.0.0/13, 184.51.0.0/16, 184.72.0.0/15, 184.84.0.0/14, 185.45.4.0/22, 185.60.216.0/22, 190.96.0.0/14, 192.133.76.0/22, 195.229.0.0/16, 198.27.64.0/18, 198.44.160.0/19, 199.16.156.0/22, 199.193.112.0/21, 199.59.148.0/22, 199.96.56.0/21, 2.16.10.0/23, 2.16.102.0/23, 2.16.106.0/23, 2.16.154.0/24, 2.16.16.0/23, 2.16.164.0/23, 2.16.168.0/23, 2.16.170.0/23, 2.16.172.0/23, 2.16.192.0/20, 2.16.2.0/23, 2.16.224.0/19, 2.16.52.0/23, 2.16.56.0/23, 2.16.62.0/23, 2.17.112.0/22, 2.17.251.0/24, 2.18.112.0/20, 2.18.16.0/20, 2.18.244.0/22, 2.18.64.0/20, 2.19.0.0/20, 2.19.112.0/20, 2.19.192.0/24, 2.19.196.0/22, 2.19.204.0/22, 2.19.240.0/20, 2.19.48.0/20, 2.20.254.0/23, 2.20.45.0/24, 2.21.0.0/20, 2.21.128.0/20, 2.21.16.0/20, 2.21.173.0/24, 2.21.240.0/24, 2.21.244.0/23, 2.21.32.0/20, 2.21.64.0/20, 2.21.96.0/20, 2.22.144.0/20, 2.22.230.0/23, 2.22.61.0/24, 2.22.80.0/20, 2.23.144.0/20, 2.23.160.0/20, 2.23.80.0/20, 2.23.96.0/20, 202.160.0.0/15, 202.182.0.0/15, 202.52.0.0/14, 203.110.0.0/15, 205.186.128.0/18, 208.0.0.0/11, 208.101.0.0/18, 208.43.0.0/16, 208.77.40.0/21, 209.95.32.0/19, 210.0.0.0/7, 212.95.165.0/26, 213.155.157.0/24, 23.0.0.0/14, 23.10.0.0/16, 23.15.0.0/16, 23.194.0.0/15, 23.196.0.0/16, 23.200.0.0/14, 23.206.0.0/15, 23.214.0.0/15, 23.216.0.0/16, 23.218.0.0/15, 23.220.0.0/16, 23.222.0.0/16, 23.224.0.0/15, 23.234.0.0/18, 23.32.0.0/14, 23.36.0.0/16, 23.41.0.0/16, 23.43.0.0/16, 23.44.0.0/16, 23.47.0.0/16, 23.48.0.0/16, 23.52.0.0/15, 23.55.0.0/16, 23.65.29.169/32, 23.72.0.0/15, 23.75.0.0/16, 23.76.0.0/16, 23.96.0.0/13, 31.13.64.0/18, 38.0.0.0/7, 4.0.0.0/9, 43.226.16.0/20, 45.114.8.0/21, 45.76.0.0/15, 47.88.0.0/14, 5.178.42.128/25, 5.178.43.0/25, 50.117.0.0/17, 50.22.0.0/15, 50.87.0.0/16, 52.175.9.80/32, 52.58.1.161/32, 54.234.18.200/32, 54.64.0.0/11, 57.0.0.0/8, 59.0.0.0/9, 59.160.0.0/11, 62.115.252.0/24, 62.115.253.16/32, 62.115.253.187/32, 62.115.253.202/32, 62.115.253.35/32, 62.115.253.49/32, 64.13.192.0/18, 65.49.0.0/17, 66.220.144.0/20, 67.15.0.0/16, 67.228.0.0/16, 67.230.160.0/19, 69.162.128.0/18, 69.171.224.0/19, 69.197.128.0/18, 69.30.0.0/18, 69.50.192.0/19, 69.63.176.0/20, 72.246.0.0/15, 74.86.0.0/16, 75.126.0.0/16, 80.239.138.0/24, 80.67.82.0/24, 80.87.199.46/32, 84.53.172.0/22, 87.245.192.0/20, 87.245.216.0/21, 88.191.249.0/24, 88.221.110.0/24, 88.221.111.0/24, 88.221.128.0/21, 92.122.100.0/22, 92.122.160.0/20, 92.122.224.0/21, 92.122.244.0/22, 92.123.106.0/24, 92.123.132.0/22, 92.123.180.0/22, 92.123.236.0/22, 93.179.96.0/21, 95.100.0.0/15, 96.16.0.0/16, 96.17.0.0/16, 96.44.128.0/18, 98.159.96.0/20' },
        { id: 'viber', ip: '100.24.0.0/13, 100.48.0.0/12, 103.224.0.0/16, 104.100.52.122/32, 104.101.246.135/32, 104.102.35.137/32, 104.102.37.25/32, 104.102.9.153/32, 104.103.0.0/16, 104.104.23.122/32, 104.108.227.25/32, 104.115.232.148/32, 104.120.71.233/32, 104.121.1.57/32, 104.121.20.26/32, 104.121.6.94/32, 104.124.161.50/32, 104.127.28.243/32, 104.18.34.21/32, 104.18.38.43/32, 104.69.151.173/32, 104.73.224.135/32, 104.81.120.129/32, 104.81.96.79/32, 104.82.116.151/32, 104.82.225.130/32, 104.82.74.149/32, 104.83.0.0/16, 104.85.28.109/32, 104.86.32.250/32, 104.86.43.238/32, 104.87.211.98/32, 104.87.217.244/32, 104.90.65.127/32, 104.96.131.124/32, 107.20.0.0/15, 107.22.0.0/15, 108.128.0.0/13, 108.136.0.0/14, 108.156.0.0/14, 108.177.127.121/32, 108.177.14.121/32, 108.177.15.121/32, 118.128.0.0/9, 13.134.0.0/15, 13.216.0.0/15, 13.218.251.156/32, 13.219.0.0/16, 13.222.75.189/32, 13.222.78.184/32, 13.222.86.86/32, 13.223.0.0/16, 13.224.0.0/12, 13.249.0.0/16, 13.250.193.187/32, 13.32.0.0/12, 136.143.176.0/20, 139.162.0.0/16, 142.250.0.0/16, 142.251.0.0/16, 143.204.0.0/16, 15.184.0.0/14, 15.197.240.20/32, 152.228.128.0/17, 16.24.0.0/13, 16.60.0.0/16, 172.104.149.86/32, 172.104.203.186/32, 172.104.251.198/32, 172.217.16.0/21, 172.217.168.0/23, 172.217.171.0/24, 172.217.208.121/32, 172.253.130.121/32, 172.253.152.121/32, 172.253.153.121/32, 172.64.149.213/32, 172.64.153.235/32, 173.194.220.121/32, 173.194.221.121/32, 173.194.222.121/32, 173.194.73.121/32, 173.222.154.139/32, 173.223.31.113/32, 174.129.0.0/16, 175.0.0.0/10, 18.130.0.0/16, 18.132.0.0/15, 18.134.122.197/32, 18.134.59.172/32, 18.135.117.5/32, 18.135.177.220/32, 18.136.127.158/32, 18.139.242.128/32, 18.140.23.87/32, 18.143.246.137/32, 18.153.0.0/16, 18.154.0.0/15, 18.156.0.0/14, 18.160.0.0/15, 18.164.0.0/15, 18.168.0.0/15, 18.170.0.0/16, 18.171.1.226/32, 18.171.41.173/32, 18.172.0.0/15, 18.175.85.207/32, 18.175.87.96/32, 18.175.95.153/32, 18.184.0.0/15, 18.192.0.0/14, 18.196.0.0/15, 18.198.0.0/16, 18.199.140.29/32, 18.199.33.112/32, 18.202.15.199/32, 18.203.179.78/32, 18.204.0.0/14, 18.208.0.0/13, 18.232.0.0/14, 18.238.0.0/15, 18.244.0.0/15, 18.64.0.0/14, 184.192.0.0/10, 184.24.0.0/13, 184.51.225.127/32, 184.72.0.0/15, 184.84.0.0/14, 185.117.96.0/24, 185.199.108.153/32, 185.199.109.153/32, 185.199.110.153/32, 185.199.111.153/32, 185.53.177.0/24, 188.114.96.0/22, 192.155.80.0/20, 192.178.0.0/16, 194.90.0.0/16, 199.191.50.0/23, 199.59.240.0/22, 199.60.103.0/24, 2.18.220.0/22, 2.19.16.0/20, 2.20.16.0/22, 2.20.208.0/20, 2.21.192.0/20, 2.22.128.0/20, 204.141.0.0/16, 204.236.128.0/17, 209.85.233.121/32, 216.137.32.0/19, 216.198.51.0/24, 216.198.52.0/23, 216.198.54.0/24, 216.58.198.0/24, 216.58.201.0/24, 216.58.204.115/32, 216.58.205.147/32, 216.58.206.83/32, 216.58.207.0/24, 216.58.211.19/32, 216.58.212.0/24, 216.58.213.115/32, 216.58.214.147/32, 23.12.109.242/32, 23.12.143.146/32, 23.12.97.4/32, 23.14.34.166/32, 23.15.170.46/32, 23.15.249.237/32, 23.194.149.64/32, 23.194.226.30/32, 23.194.65.129/32, 23.197.121.245/32, 23.197.133.9/32, 23.198.177.51/32, 23.199.0.0/16, 23.2.232.109/32, 23.20.0.0/14, 23.200.102.152/32, 23.204.1.115/32, 23.204.101.242/32, 23.204.33.4/32, 23.207.128.143/32, 23.207.97.137/32, 23.208.33.139/32, 23.210.113.112/32, 23.211.65.127/32, 23.212.212.6/32, 23.212.25.243/32, 23.214.0.0/16, 23.217.253.17/32, 23.218.120.67/32, 23.218.165.27/32, 23.219.225.129/32, 23.219.226.21/32, 23.221.161.2/32, 23.222.0.0/16, 23.223.73.43/32, 23.223.80.221/32, 23.239.0.0/19, 23.32.193.143/32, 23.34.43.91/32, 23.36.237.176/32, 23.37.0.0/16, 23.39.240.134/32, 23.4.60.224/32, 23.40.219.129/32, 23.40.224.244/32, 23.42.9.100/32, 23.43.184.192/32, 23.43.64.88/32, 23.43.69.59/32, 23.47.135.123/32, 23.48.183.161/32, 23.49.17.127/32, 23.49.180.170/32, 23.49.225.129/32, 23.50.198.179/32, 23.51.0.0/16, 23.52.209.48/32, 23.52.29.95/32, 23.54.1.105/32, 23.54.133.248/32, 23.55.145.207/32, 23.55.151.223/32, 23.56.203.16/32, 23.57.0.0/16, 23.58.19.116/32, 23.58.225.96/32, 23.59.9.37/32, 23.60.206.123/32, 23.61.230.20/32, 23.61.53.187/32, 23.63.117.208/32, 23.64.254.234/32, 23.65.168.195/32, 23.66.150.181/32, 23.66.218.221/32, 23.67.137.132/32, 23.7.141.250/32, 23.75.121.71/32, 23.79.185.87/32, 23.9.214.254/32, 3.1.32.169/32, 3.109.234.132/32, 3.120.0.0/13, 3.160.0.0/13, 3.168.0.0/14, 3.173.0.0/16, 3.174.0.0/15, 3.208.0.0/12, 3.224.0.0/13, 3.232.0.0/14, 3.248.96.161/32, 3.64.0.0/12, 3.8.0.0/14, 3.81.0.0/16, 3.82.169.130/32, 3.82.73.126/32, 3.82.84.153/32, 3.83.0.0/16, 3.84.107.152/32, 3.84.193.100/32, 3.84.255.143/32, 3.85.0.0/16, 3.86.0.0/15, 3.88.77.251/32, 3.88.83.251/32, 3.88.98.117/32, 3.89.0.0/16, 3.90.0.0/15, 3.92.0.0/14, 32.192.0.0/12, 34.102.239.211/32, 34.110.180.34/32, 34.192.0.0/12, 34.224.0.0/12, 34.241.118.111/32, 34.246.38.139/32, 34.247.246.112/32, 34.248.0.82/32, 34.248.44.60/32, 34.251.79.37/32, 34.252.67.37/32, 34.255.173.135/32, 34.255.238.7/32, 34.95.80.122/32, 35.153.0.0/16, 35.156.0.0/14, 35.160.0.0/12, 35.176.0.0/15, 35.178.0.0/16, 35.179.34.60/32, 35.179.53.4/32, 35.184.0.0/13, 37.59.32.0/19, 44.192.36.36/32, 44.193.0.0/16, 44.194.0.0/15, 44.196.0.0/14, 44.205.0.0/16, 44.206.0.0/15, 44.208.0.0/12, 50.16.0.0/14, 51.102.0.0/16, 51.200.0.0/13, 51.24.0.0/16, 51.91.18.0/24, 52.0.0.0/13, 52.16.44.138/32, 52.17.197.238/32, 52.17.77.171/32, 52.19.19.253/32, 52.192.0.0/12, 52.20.0.0/14, 52.208.0.0/13, 52.220.0.0/15, 52.222.0.0/16, 52.28.0.0/15, 52.30.36.94/32, 52.31.137.136/32, 52.31.45.56/32, 52.44.0.0/15, 52.49.55.16/32, 52.51.177.20/32, 52.54.0.0/15, 52.56.0.0/14, 52.64.0.0/12, 52.8.117.89/32, 52.84.0.0/14, 52.88.0.0/13, 54.144.0.0/14, 54.150.169.192/32, 54.151.23.130/32, 54.152.0.0/16, 54.156.0.0/14, 54.160.0.0/11, 54.192.0.0/16, 54.196.0.0/15, 54.198.0.0/16, 54.204.0.0/15, 54.208.0.0/13, 54.216.0.0/14, 54.220.0.0/15, 54.224.0.0/14, 54.230.0.0/16, 54.234.0.0/15, 54.236.0.0/15, 54.239.0.0/16, 54.240.0.0/16, 54.241.125.141/32, 54.242.0.0/15, 54.246.127.3/32, 54.246.135.135/32, 54.247.115.42/32, 54.251.64.83/32, 54.38.0.0/16, 54.64.0.0/11, 63.176.0.0/12, 63.32.0.0/14, 64.233.161.121/32, 64.233.162.121/32, 64.233.163.121/32, 64.233.164.121/32, 64.233.165.121/32, 64.233.166.121/32, 64.233.167.121/32, 64.233.184.121/32, 65.8.0.0/14, 66.102.0.0/20, 66.175.208.0/20, 67.202.0.0/18, 69.192.0.0/16, 72.246.0.0/15, 72.44.32.0/19, 74.125.131.121/32, 74.125.133.121/32, 74.125.143.121/32, 74.125.205.121/32, 74.125.206.121/32, 74.125.29.121/32, 74.207.224.0/19, 75.101.128.0/17, 8.47.0.0/16, 8.6.0.0/16, 88.221.68.0/22, 88.221.96.0/22, 92.122.12.0/22, 92.122.68.0/22, 92.123.160.0/21, 92.123.176.0/22, 92.123.196.0/22, 95.100.224.0/20, 95.100.48.0/20, 95.213.180.0/23, 96.17.213.251/32, 96.6.0.0/15, 98.80.0.0/12, 99.80.0.0/15, 99.83.175.80/32, 99.84.0.0/16, 99.86.0.0/16' },
        { id: 'rutracker', ip: '104.21.0.0/16, 162.159.0.0/16, 172.66.0.0/15, 185.81.128.0/23, 188.114.96.0/22' },
        { id: 'bestchange', ip: '104.20.17.195/32, 109.238.88.180/32, 138.249.0.0/16, 162.19.0.0/16, 172.66.145.174/32, 185.137.232.0/24, 186.2.165.47/32, 186.2.165.82/32, 188.124.37.0/24, 188.165.24.0/21, 193.187.173.0/24, 34.8.0.0/13, 37.9.36.0/22, 5.135.168.224/27, 5.39.61.112/28, 54.36.0.0/15, 94.23.152.0/21, 95.129.232.0/24' },
        { id: 'animego', ip: '104.21.83.227/32, 172.67.182.101/32, 185.178.208.0/24, 201.24.122.0/24, 49.13.80.0/20, 85.239.36.0/24' },
		{ id: 'hdrezka', ip: '103.224.0.0/16, 104.21.15.6/32, 104.247.80.0/22, 13.248.213.45/32, 13.248.243.5/32, 136.243.74.157/32, 146.255.0.0/16, 152.89.28.0/23, 162.255.116.0/22, 172.224.0.0/12, 172.67.160.248/32, 176.58.38.0/23, 176.58.40.0/24, 176.58.41.0/24, 176.58.42.0/24, 176.58.45.0/24, 176.58.46.0/24, 176.58.48.0/23, 176.58.50.0/24, 176.58.54.0/24, 176.58.56.0/24, 176.58.57.0/24, 178.63.75.0/26, 179.32.0.0/12, 185.190.188.0/24, 185.190.190.0/24, 185.231.220.0/24, 185.53.177.0/24, 185.53.178.0/24, 199.59.240.0/22, 199.80.52.0/22, 212.124.124.0/25, 212.124.96.0/24, 213.111.160.0/22, 45.10.216.0/23, 46.8.8.0/23, 5.45.76.0/22, 5.45.84.0/22, 5.9.51.64/27, 54.64.0.0/11, 76.223.105.230/32, 76.223.67.189/32, 82.221.104.144/29, 82.221.105.0/24, 85.217.222.0/24, 89.105.207.64/26, 91.132.188.0/23, 99.83.175.80/32' },
		{ id: 'rutor', ip: '104.21.0.0/16, 172.67.153.242/32, 188.114.96.0/22, 193.46.255.0/24, 75.2.37.224/32' },
		{ id: 'nnmclub', ip: '104.21.0.0/16, 172.67.144.20/32, 172.67.175.99/32, 188.114.96.0/22' },
		{ id: 'itch', ip: '104.103.0.0/16, 104.104.0.0/16, 104.109.0.0/16, 104.110.0.0/16, 104.117.0.0/16, 104.123.0.0/16, 104.124.0.0/16, 104.21.12.135/32, 104.26.0.0/16, 104.76.0.0/16, 104.81.0.0/16, 104.83.0.0/16, 104.84.152.66/32, 104.84.153.177/32, 104.93.20.18/32, 104.95.0.0/16, 172.67.132.40/32, 172.67.68.41/32, 172.67.69.99/32, 173.222.0.0/16, 184.24.0.0/13, 184.51.0.0/16, 184.86.0.0/16, 193.108.152.0/22, 2.16.10.0/23, 2.16.100.0/23, 2.16.102.0/23, 2.16.106.0/23, 2.16.152.0/23, 2.16.154.0/24, 2.16.16.0/23, 2.16.164.0/23, 2.16.168.0/23, 2.16.170.0/23, 2.16.172.0/23, 2.16.182.0/23, 2.16.192.0/20, 2.16.2.0/23, 2.16.224.0/19, 2.16.54.0/23, 2.16.56.0/23, 2.16.62.0/23, 2.16.88.0/23, 2.17.112.0/22, 2.17.128.0/19, 2.17.196.0/22, 2.17.20.0/22, 2.17.251.0/24, 2.18.112.0/20, 2.18.16.0/20, 2.18.176.0/20, 2.18.244.0/22, 2.18.64.0/20, 2.19.0.0/20, 2.19.112.0/20, 2.19.193.0/24, 2.19.194.0/23, 2.19.196.0/22, 2.19.204.0/22, 2.19.240.0/20, 2.19.48.0/20, 2.20.12.0/22, 2.20.134.0/23, 2.20.242.0/24, 2.20.244.0/23, 2.20.253.0/24, 2.20.254.0/23, 2.20.45.0/24, 2.20.64.0/20, 2.20.96.0/20, 2.21.0.0/20, 2.21.128.0/20, 2.21.16.0/20, 2.21.173.0/24, 2.21.244.0/23, 2.21.32.0/20, 2.21.64.0/20, 2.21.88.0/22, 2.21.96.0/20, 2.22.144.0/20, 2.22.230.0/23, 2.22.242.0/23, 2.22.250.0/23, 2.22.254.0/23, 2.22.50.0/24, 2.22.55.0/24, 2.22.61.0/24, 2.22.80.0/20, 2.23.0.0/20, 2.23.144.0/20, 2.23.160.0/20, 2.23.176.0/20, 2.23.208.0/20, 2.23.224.0/19, 2.23.80.0/20, 2.23.96.0/20, 200.80.0.0/12, 209.95.32.0/19, 212.95.165.0/26, 213.155.157.0/24, 23.0.0.0/14, 23.10.0.0/16, 23.12.0.0/16, 23.15.0.0/16, 23.192.0.0/14, 23.196.0.0/15, 23.200.0.0/13, 23.209.0.0/16, 23.210.0.0/16, 23.213.0.0/16, 23.214.0.0/15, 23.216.0.0/16, 23.218.0.0/15, 23.220.0.0/16, 23.222.0.0/16, 23.32.0.0/14, 23.36.0.0/16, 23.38.0.0/16, 23.40.0.0/15, 23.43.0.0/16, 23.44.0.0/15, 23.47.0.0/16, 23.48.0.0/16, 23.50.0.0/16, 23.53.0.0/16, 23.54.0.0/15, 23.56.0.0/16, 23.58.0.0/16, 23.60.0.0/14, 23.64.0.0/15, 23.7.0.0/16, 23.72.0.0/15, 23.75.0.0/16, 23.76.0.0/16, 35.192.0.0/12, 45.33.0.0/17, 45.79.0.0/16, 5.178.42.128/25, 5.178.43.0/25, 62.115.252.0/24, 62.115.253.16/32, 62.115.253.18/31, 62.115.253.202/32, 62.115.253.24/31, 62.115.253.26/32, 62.115.253.33/32, 62.115.253.40/31, 62.115.253.49/32, 62.115.253.57/32, 62.115.253.65/32, 72.246.0.0/15, 8.47.0.0/16, 8.6.0.0/16, 80.239.138.0/24, 80.67.82.0/24, 84.53.172.0/22, 87.245.192.0/20, 87.245.216.0/21, 88.221.110.0/24, 88.221.111.0/24, 88.221.120.0/22, 88.221.128.0/21, 88.221.83.0/24, 92.122.0.0/15, 93.186.137.144/32, 93.186.137.146/32, 93.186.137.171/32, 93.186.137.178/32, 93.186.137.184/32, 93.186.137.208/32, 93.186.137.210/31, 95.100.0.0/15, 96.16.0.0/16, 96.17.0.0/16' },
		{ id: 'telegram', ip: '104.17.94.19/32, 104.17.95.19/32, 104.18.32.94/32, 104.20.26.203/32, 104.21.70.22/32, 104.26.14.213/32, 104.26.15.213/32, 108.156.0.0/14, 108.177.119.121/32, 108.177.14.121/32, 13.224.0.0/12, 13.249.0.0/16, 13.32.0.0/12, 142.250.0.0/16, 142.251.0.0/16, 143.204.0.0/16, 149.154.160.0/20, 15.197.195.200/32, 172.217.16.147/32, 172.217.168.0/24, 172.217.169.243/32, 172.217.17.211/32, 172.217.171.0/24, 172.217.18.179/32, 172.217.19.0/24, 172.217.20.0/23, 172.217.208.121/32, 172.217.22.243/32, 172.217.23.0/24, 172.253.130.121/32, 172.253.152.121/32, 172.253.154.121/32, 172.64.155.162/32, 172.66.170.24/32, 172.67.217.241/32, 172.67.71.168/32, 173.194.220.121/32, 173.194.221.121/32, 173.194.222.121/32, 173.194.73.121/32, 178.128.240.0/20, 18.159.138.14/32, 18.159.155.234/32, 18.159.249.246/32, 18.164.0.0/15, 18.173.0.0/16, 18.184.0.0/16, 18.185.199.31/32, 18.193.171.24/32, 18.194.24.212/32, 18.197.200.29/32, 18.197.213.146/32, 18.197.66.168/32, 18.198.218.245/32, 18.198.220.176/32, 18.198.227.74/32, 18.199.117.139/32, 18.239.0.0/16, 18.244.0.0/16, 18.66.0.0/16, 185.199.108.153/32, 185.199.109.153/32, 185.199.110.153/32, 185.199.111.153/32, 188.166.0.0/17, 188.245.0.0/16, 192.178.0.0/16, 209.85.233.121/32, 213.180.193.250/32, 216.150.1.0/24, 216.150.16.0/24, 216.58.198.0/24, 216.58.201.0/24, 216.58.204.115/32, 216.58.207.0/24, 23.88.0.0/17, 3.120.74.76/32, 3.121.124.169/32, 3.121.7.66/32, 3.122.165.131/32, 3.122.43.86/32, 3.123.214.200/32, 3.124.144.119/32, 3.125.225.3/32, 3.125.242.22/32, 3.160.0.0/15, 3.165.0.0/16, 3.174.0.0/15, 3.222.67.212/32, 3.33.238.178/32, 3.64.42.180/32, 3.65.30.41/32, 3.66.185.112/32, 3.67.231.136/32, 3.67.237.255/32, 3.68.55.200/32, 3.69.1.198/32, 3.71.214.142/32, 3.72.148.84/32, 3.72.171.88/32, 3.72.22.14/32, 3.73.231.206/32, 3.75.64.222/32, 3.77.169.114/32, 3.77.228.127/32, 3.78.139.112/32, 3.78.3.234/32, 35.156.90.142/32, 35.157.104.54/32, 35.158.7.244/32, 35.159.7.174/32, 35.240.0.0/13, 37.9.36.0/22, 46.4.0.0/16, 52.222.0.0/16, 52.28.133.13/32, 52.28.161.154/32, 52.57.114.196/32, 52.57.18.104/32, 52.59.155.110/32, 52.59.23.48/32, 52.84.0.0/14, 54.160.0.0/11, 54.230.0.0/16, 54.64.0.0/11, 63.176.0.0/12, 64.233.161.121/32, 64.233.162.121/32, 64.233.163.121/32, 64.233.164.121/32, 64.233.165.121/32, 64.233.167.121/32, 67.199.248.0/24, 74.125.131.121/32, 74.125.205.121/32, 74.125.29.121/32, 8.47.0.0/16, 8.6.0.0/16, 91.105.192.0/23, 91.108.12.0/22, 91.108.16.0/22, 91.108.20.0/22, 91.108.4.0/22, 91.108.56.0/22, 91.108.8.0/22, 92.204.208.0/20, 95.161.64.0/20, 99.84.0.0/16, 99.86.0.0/16' },
		{ id: 'whatsapp', ip: '1.38.0.0/16, 1.9.131.98/32, 101.48.0.0/13, 101.64.0.0/10, 102.0.0.0/8, 103.0.0.0/14, 103.101.128.0/17, 103.119.0.0/16, 103.120.0.0/16, 103.131.0.0/16, 103.156.0.0/14, 103.160.0.0/11, 103.199.64.0/20, 103.203.88.0/21, 103.21.128.0/18, 103.226.128.0/18, 103.232.128.0/19, 103.234.0.0/17, 103.240.0.0/17, 103.41.0.0/19, 103.63.64.0/18, 103.73.64.0/18, 103.8.0.0/14, 103.97.128.0/18, 105.112.191.35/32, 105.112.48.32/32, 105.174.34.100/32, 105.187.241.161/32, 105.235.156.162/32, 105.235.3.100/32, 106.78.62.226/32, 108.59.160.0/20, 109.173.136.0/21, 109.226.16.128/25, 109.75.52.0/23, 110.0.0.0/11, 110.160.0.0/13, 110.40.0.0/13, 110.93.128.0/17, 111.80.0.0/13, 111.96.0.0/11, 112.0.0.0/8, 113.128.0.0/10, 114.0.0.0/10, 114.136.0.0/13, 114.96.0.0/11, 115.164.0.0/15, 115.64.0.0/11, 116.206.0.0/18, 116.64.0.0/10, 117.128.0.0/9, 117.52.0.0/15, 118.96.0.0/13, 119.16.0.0/12, 119.32.0.0/11, 120.0.0.0/8, 122.0.0.0/10, 122.152.0.0/13, 123.104.0.0/13, 123.128.0.0/10, 123.192.0.0/11, 124.0.0.0/9, 124.208.0.0/12, 126.0.0.0/7, 128.200.0.0/15, 129.0.0.0/16, 129.134.0.0/16, 131.0.0.0/16, 131.108.0.0/16, 131.161.0.0/16, 131.221.0.0/16, 131.255.0.0/16, 132.245.0.0/16, 132.255.0.0/16, 134.19.216.34/32, 137.59.64.0/18, 138.0.0.0/16, 138.118.128.0/17, 138.121.0.0/16, 138.185.0.0/16, 138.186.0.0/16, 138.219.0.0/16, 138.36.0.0/16, 138.59.0.0/16, 138.97.0.0/16, 138.99.0.0/16, 139.5.32.0/19, 139.5.64.0/19, 140.213.0.0/16, 141.226.176.33/32, 143.0.0.0/16, 143.208.0.0/16, 143.255.0.0/16, 145.255.92.0/22, 149.255.0.0/16, 149.62.0.0/16, 15.197.206.217/32, 15.197.210.208/32, 150.129.128.0/17, 151.158.214.33/32, 151.236.169.97/32, 151.248.102.161/32, 152.255.0.0/16, 154.64.0.0/10, 156.0.0.0/16, 156.38.0.0/16, 157.240.0.0/16, 159.146.0.0/16, 159.224.0.0/16, 160.113.0.0/16, 160.202.144.0/21, 161.0.0.0/16, 162.221.212.0/22, 163.70.128.0/17, 165.169.0.0/16, 165.56.0.0/16, 167.142.0.0/16, 168.0.0.0/16, 168.121.0.0/16, 168.181.0.0/16, 168.194.0.0/16, 168.196.0.0/16, 168.197.0.0/16, 168.253.0.0/16, 168.90.0.0/16, 169.239.0.0/16, 170.150.0.0/16, 170.231.0.0/16, 170.233.0.0/16, 170.238.0.0/16, 170.245.0.0/19, 170.246.128.0/17, 170.250.0.0/16, 170.52.48.0/21, 170.78.0.0/16, 170.80.0.0/16, 170.83.0.0/16, 170.84.128.0/18, 170.84.192.0/19, 171.128.0.0/9, 171.96.0.0/11, 172.93.16.0/20, 175.0.0.0/10, 175.96.0.0/13, 176.240.128.0/17, 176.28.128.0/17, 176.58.72.0/24, 177.10.0.0/15, 177.128.0.0/10, 177.16.0.0/12, 177.192.0.0/12, 177.220.0.0/15, 177.223.0.0/16, 177.224.0.0/11, 177.32.0.0/11, 177.64.0.0/12, 177.80.0.0/13, 177.88.0.0/14, 177.92.0.0/16, 177.96.0.0/11, 178.88.114.128/26, 179.0.0.0/11, 179.128.0.0/11, 179.176.0.0/13, 179.184.0.0/14, 179.189.0.0/17, 179.192.0.0/10, 179.32.0.0/12, 179.48.0.0/13, 179.60.0.0/16, 179.62.0.0/15, 179.64.0.0/10, 18.214.194.113/32, 18.214.229.238/32, 18.224.156.0/32, 18.232.172.199/32, 180.149.48.0/20, 180.192.0.0/11, 181.0.0.0/11, 181.116.0.0/14, 181.128.0.0/10, 181.32.0.0/13, 181.64.0.0/11, 182.176.0.0/12, 182.192.0.0/10, 182.50.0.0/16, 182.79.0.0/16, 183.0.0.0/8, 185.11.11.0/24, 185.143.124.0/22, 185.173.60.0/22, 185.191.52.0/22, 185.2.96.0/22, 185.27.106.0/24, 185.47.188.0/22, 185.48.240.0/24, 185.54.255.128/26, 185.58.68.0/24, 185.60.216.0/22, 185.76.178.0/24, 185.78.131.128/26, 185.78.131.64/26, 185.81.140.0/23, 185.81.33.0/24, 185.82.96.0/24, 185.85.152.0/23, 185.89.218.0/23, 186.0.0.0/15, 186.128.0.0/9, 186.16.0.0/12, 186.2.128.0/19, 186.32.0.0/11, 186.4.0.0/14, 186.64.0.0/10, 186.8.0.0/13, 187.0.0.0/11, 187.128.0.0/9, 187.32.0.0/16, 187.36.0.0/14, 187.48.0.0/12, 187.64.0.0/10, 188.0.149.0/24, 188.137.0.0/17, 188.247.240.0/21, 188.64.201.0/24, 189.0.0.0/12, 189.128.0.0/9, 189.32.0.0/11, 189.64.0.0/10, 190.0.0.0/10, 190.104.0.0/15, 190.107.0.0/16, 190.108.0.0/14, 190.122.0.0/16, 190.123.8.0/21, 190.124.0.0/14, 190.128.0.0/10, 190.211.0.0/17, 190.212.0.0/14, 190.216.0.0/13, 190.80.0.0/13, 190.88.0.0/14, 190.94.0.0/15, 190.96.0.0/14, 191.0.0.0/10, 191.100.0.0/16, 191.102.0.0/15, 191.128.0.0/9, 192.114.144.0/22, 192.124.220.0/24, 192.254.96.0/20, 193.135.136.0/24, 193.212.0.0/15, 193.95.0.0/17, 193.95.164.192/26, 195.12.160.0/19, 195.122.31.128/26, 195.13.189.64/26, 195.162.80.0/22, 195.174.0.0/15, 195.222.47.0/24, 195.229.0.0/16, 195.250.64.0/19, 195.5.48.0/20, 196.128.0.0/9, 197.0.0.0/8, 198.231.28.0/22, 200.0.0.0/10, 200.128.0.0/11, 200.160.0.0/15, 200.176.0.0/12, 200.192.0.0/14, 200.198.0.0/15, 200.208.0.0/12, 200.69.64.0/18, 200.72.0.0/13, 200.80.0.0/12, 200.96.0.0/11, 201.0.0.0/11, 201.128.0.0/12, 201.148.0.0/17, 201.152.0.0/13, 201.160.0.0/11, 201.192.0.0/10, 201.47.0.0/16, 201.48.0.0/16, 201.52.0.0/14, 201.56.0.0/13, 201.80.0.0/12, 202.128.0.0/14, 202.136.0.0/13, 202.152.0.0/13, 202.164.128.0/18, 202.176.0.0/14, 202.184.0.0/13, 202.51.79.0/24, 202.64.0.0/14, 202.70.0.0/16, 202.71.0.0/22, 202.72.0.0/14, 202.88.0.0/16, 202.90.0.0/15, 202.93.0.0/16, 203.104.0.0/14, 203.109.128.0/17, 203.112.0.0/12, 203.128.0.0/12, 203.184.0.0/14, 203.192.0.0/10, 203.52.0.0/15, 203.72.0.0/14, 203.76.0.0/15, 203.78.0.0/17, 203.82.0.0/15, 203.99.0.0/16, 204.110.56.0/21, 204.186.0.0/16, 204.236.64.0/18, 207.194.0.0/16, 207.228.128.0/18, 207.229.128.0/18, 207.70.128.0/18, 208.104.0.0/16, 208.66.48.0/21, 209.104.64.0/18, 209.146.0.0/17, 209.148.128.0/17, 209.52.0.0/15, 209.59.64.0/18, 209.91.64.0/18, 210.0.0.0/7, 212.112.117.224/27, 212.113.184.0/22, 212.120.241.0/24, 212.145.0.0/16, 212.154.111.0/24, 212.199.140.0/24, 212.2.96.0/19, 212.217.0.0/17, 212.232.96.0/20, 212.30.0.0/19, 212.43.8.0/21, 212.47.128.0/19, 212.52.128.0/19, 212.56.132.0/23, 212.65.152.0/23, 212.65.158.0/23, 212.68.192.0/20, 212.68.208.0/20, 212.95.183.192/26, 212.96.64.0/19, 213.150.160.0/19, 213.157.192.0/19, 213.180.193.250/32, 213.202.0.0/21, 213.204.119.0/24, 213.230.52.0/22, 213.52.0.0/17, 213.57.0.0/17, 213.94.76.0/24, 216.177.160.0/19, 217.168.6.0/23, 217.168.80.0/20, 217.22.184.0/22, 217.25.24.0/23, 217.64.96.0/20, 217.73.140.0/23, 217.76.71.0/24, 217.79.128.0/21, 219.0.0.0/8, 222.128.0.0/11, 223.128.0.0/9, 223.27.128.0/17, 24.200.0.0/14, 24.222.0.0/16, 24.236.64.0/18, 24.244.0.0/18, 24.55.64.0/18, 27.64.0.0/11, 3.143.101.84/32, 3.33.139.32/32, 3.33.221.48/32, 3.33.252.61/32, 3.95.117.170/32, 31.13.64.0/18, 31.145.0.0/16, 31.3.93.0/24, 36.0.0.0/9, 37.152.0.0/22, 37.238.0.0/16, 37.26.80.0/23, 40.96.0.0/12, 41.0.0.0/8, 42.0.0.0/8, 43.224.0.0/16, 43.230.128.0/21, 43.245.96.0/20, 43.246.0.0/15, 43.252.0.0/20, 45.112.176.0/20, 45.113.128.0/18, 45.118.240.0/21, 45.121.128.0/17, 45.160.0.0/12, 45.178.0.0/15, 45.224.0.0/14, 45.228.0.0/15, 45.232.0.0/13, 45.6.64.0/18, 45.64.0.0/16, 45.7.0.0/16, 46.1.124.0/23, 46.196.0.0/16, 46.197.0.0/18, 46.99.249.0/24, 49.224.0.0/13, 49.32.0.0/11, 49.64.0.0/10, 5.104.2.0/24, 5.20.0.0/21, 5.22.176.0/20, 51.39.0.0/16, 52.96.0.0/12, 54.160.0.0/11, 54.235.227.249/32, 57.0.0.0/8, 58.128.0.0/9, 58.16.0.0/12, 59.153.128.0/17, 59.153.64.0/18, 59.160.0.0/11, 60.0.0.0/8, 62.0.0.0/16, 62.1.0.0/16, 62.197.192.0/18, 62.209.24.0/21, 62.24.128.0/17, 62.251.128.0/17, 62.4.128.0/17, 62.74.63.0/26, 62.75.0.0/19, 62.8.64.0/19, 62.84.0.0/20, 63.143.64.0/18, 64.119.192.0/20, 64.66.0.0/20, 65.192.0.0/11, 65.48.128.0/17, 66.128.160.0/19, 66.201.160.0/19, 66.50.0.0/16, 66.8.0.0/17, 66.97.224.0/19, 67.218.80.0/20, 69.92.0.0/16, 70.160.0.0/11, 72.136.0.0/13, 72.192.0.0/11, 74.118.80.0/22, 74.50.208.0/21, 77.136.0.0/16, 77.224.0.0/13, 77.237.0.0/21, 77.243.16.0/21, 77.52.0.0/24, 78.154.160.0/19, 78.159.164.0/22, 78.8.0.0/14, 79.101.112.0/23, 80.76.170.0/23, 80.77.164.0/24, 81.167.36.0/23, 81.192.0.0/16, 81.196.173.128/26, 81.196.26.128/25, 82.199.192.0/20, 82.76.231.128/26, 82.76.231.192/26, 82.78.186.128/26, 82.78.186.192/26, 82.78.68.0/26, 82.78.68.64/26, 82.85.13.128/26, 82.85.19.0/26, 82.85.43.0/26, 83.119.16.0/20, 83.174.0.0/18, 83.255.224.0/21, 84.15.0.0/16, 84.208.7.0/24, 84.22.34.96/28, 84.91.172.0/24, 85.114.48.0/23, 85.114.96.0/19, 86.110.224.97/32, 86.127.118.0/23, 86.56.128.0/24, 87.201.168.0/21, 87.235.208.0/20, 88.212.9.0/24, 88.216.174.0/24, 89.108.140.0/22, 89.45.2.0/23, 90.244.152.0/21, 91.185.14.0/24, 91.225.200.0/22, 92.63.8.0/21, 92.80.0.0/13, 93.103.0.0/16, 93.191.8.128/26, 93.57.114.0/24, 93.57.122.0/24, 93.57.123.0/24, 93.62.101.0/24, 93.91.192.0/22, 94.153.128.0/17, 94.198.177.0/24, 94.76.104.0/21, 94.79.192.0/19, 94.96.0.0/14, 95.107.145.0/24, 95.180.0.0/18, 95.209.200.0/21, 95.94.0.0/15' }
		//{ id: '', ip: '' },//
	];

    const selectedSites = sites.filter(site => document.getElementById(site.id).checked);
    const ipv6Toggle = document.getElementById('ipv6');
	
    if (selectedSites.length === 0) {
		if (ipv6Toggle.checked) {return "0.0.0.0/0, ::/0"} else {return "0.0.0.0/0"} // default 
    } else {
        const ips = selectedSites.map(site => site.ip).join(', ');
        return ips; 
    }
}

const modal = document.getElementById("infoModal");
const modal2 = document.getElementById("infoModal2");
const modalw = document.getElementById("warning");
const awg3hid = document.getElementById("awg3hid");
const splithid = document.getElementById("splithid");
const infoBtn = document.getElementById("infoButton");
const infoBtn2 = document.getElementById("infoButton2");
const infoBtn3 = document.getElementById("infoButton3");
const infoBtn4 = document.getElementById("infoButton4");
const span = document.getElementsByClassName("close")[0];
const span2 = document.getElementsByClassName("close")[1];


function lockBodyScroll() {
    document.body.style.overflow = 'hidden';
}

// Функция для разблокировки прокрутки body
function unlockBodyScroll() {
    document.body.style.overflow = '';
}


// Функция для открытия модального окна
function openModal() {
	awg3hid.style.display = "block";
	splithid.style.display = "block";
    modal.style.display = "block";
    lockBodyScroll(); 
}

function openModal2() {
    modal2.style.display = "block";
    lockBodyScroll(); 
}

function openModal4() {
	awg3hid.style.display = "none";
	splithid.style.display = "none";
    modal.style.display = "block";
    lockBodyScroll(); 
}

// AmneziaWG
infoBtn.onclick = openModal;
// WireSock
infoBtn2.onclick = openModal;
// Clash
infoBtn3.onclick = openModal2;
// Xray
infoBtn4.onclick = openModal4;


// Закрытие по клику на крестики
span.onclick = function() {
    modal.style.display = "none";
    unlockBodyScroll(); 
}

span2.onclick = function() {
	modal2.style.display = "none";
    unlockBodyScroll(); 
}

// Закрытие по клику вне модального окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        unlockBodyScroll();
    };
	
	if (event.target == modal2) {
		modal2.style.display = "none";
        unlockBodyScroll();
    };
}

// Функция для проверки выбранных сайтов и управления toggle
function updateToggleState() {
    const toggleCheckbox = document.getElementById('rules');
    const siteCheckboxes = document.querySelectorAll('.Sites .payment-radio');
    
    // Проверяем, выбран ли хотя бы один чекбокс сайта
    let isAnySiteChecked = false;
    siteCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isAnySiteChecked = true;
        }
    });
    
    // Если выбран хотя бы один сайт, отключаем toggle и сбрасываем его
    if (isAnySiteChecked) {
        toggleCheckbox.disabled = true;
        toggleCheckbox.checked = false; // Сбрасываем toggle
    } else {
        toggleCheckbox.disabled = false;
    }
}

// Добавляем обработчики для всех чекбоксов сайтов
document.addEventListener('DOMContentLoaded', function() {
    const siteCheckboxes = document.querySelectorAll('.Sites .payment-radio');
    
    siteCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateToggleState);
    });
    
    // Инициализация при загрузке страницы
    updateToggleState();
});



// Функция для проверки, является ли выбранный DNS блокирующим
function isBlockingDNS() {
    const blockingDNS = ['comss', 'geohide', 'xbox', 'malw'];
    const selectedDNS = getSelectedDNSRadio();
    return blockingDNS.includes(selectedDNS);
}

// Функция для получения ID выбранного DNS
function getSelectedDNSRadio() {
    const dnsRadios = document.querySelectorAll('input[name="payment"]');
    for (let radio of dnsRadios) {
        if (radio.checked) {
            return radio.id;
        }
    }
    return null;
}

// Функция для проверки, является ли радио-кнопка DNS
function isDNSRadio(radio) {
    return radio.getAttribute('name') === 'payment';
}

// Функция для сброса выбранных сайтов
function resetSelectedSites() {
    const siteCheckboxes = document.querySelectorAll('input[name="sites"]');
    siteCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.checked = false;
            
            // Обновляем визуальное состояние
            const parentOption = checkbox.closest('.payment-option');
            if (parentOption) {
                parentOption.classList.remove('payment-option--checked');
            }
        }
    });
    
    // Обновляем состояние toggle после сброса сайтов
    if (typeof updateToggleState === 'function') {
        updateToggleState();
    }
}

// Функция для обновления состояния радио-кнопок
function updateRadioButtonsState() {
    const isBlocking = isBlockingDNS();
    const serverRadios = document.querySelectorAll('input[name="server"]');
    const serverOptions = document.querySelectorAll('.server-option');
    const siteOptions = document.querySelectorAll('.Sites .payment-option');
    const siteCheckboxes = document.querySelectorAll('input[name="sites"]');
    

    serverRadios.forEach(radio => {
        radio.disabled = isBlocking;
    });
    
    serverOptions.forEach(option => {
        if (isBlocking) {
            option.style.opacity = '0.5';
            option.style.cursor = 'not-allowed';
            option.style.pointerEvents = 'none';
        } else {
            option.style.opacity = '';
            option.style.cursor = '';
            option.style.pointerEvents = 'auto';
        }
    });
    

    siteCheckboxes.forEach(checkbox => {
        checkbox.disabled = isBlocking;
    });
    
    siteOptions.forEach(option => {
        if (isBlocking) {
            option.style.opacity = '0.5';
            option.style.cursor = 'not-allowed';
            option.style.pointerEvents = 'none';
        } else {
            option.style.opacity = '';
            option.style.cursor = '';
            option.style.pointerEvents = 'auto';
        }
    });
    
    // Для payment-опций (DNS) только меняем внешний вид, но не блокируем
    const paymentOptions = document.querySelectorAll('.dnsinfo .payment-option');
    paymentOptions.forEach(option => {
        const radio = option.querySelector('input');
        if (radio && isDNSRadio(radio)) {
            // DNS радио всегда доступны
            option.style.opacity = '1';
            option.style.cursor = 'pointer';
            option.style.pointerEvents = 'auto';
        }
    });
}

// Функция для сброса сервера на стандартный без блокировки возможности выбора
function resetServerToDefault() {
    const defaultServer = document.getElementById('def');
    if (defaultServer) {
        defaultServer.checked = true;
        document.querySelectorAll('.server-option').forEach(option => {
            option.classList.remove('server-option--checked');
        });
        
        const parentOption = defaultServer.closest('.server-option');
        if (parentOption) {
            parentOption.classList.add('server-option--checked');
        }
    }
}

// Добавляем обработчики для всех DNS радио-кнопок
document.addEventListener('DOMContentLoaded', function() {
    const dnsRadios = document.querySelectorAll('input[name="payment"]');
    
    dnsRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Если выбран блокирующий DNS
            if (isBlockingDNS()) {

                resetServerToDefault();
                resetSelectedSites();
                
                // Сбрасываем все остальные payment-радио (кроме текущего)
                dnsRadios.forEach(otherRadio => {
                    if (otherRadio !== radio && otherRadio.checked) {
                        otherRadio.checked = false;
                        
                        // Обновляем визуальное состояние для сброшенных опций
                        const parentOption = otherRadio.closest('.payment-option');
                        if (parentOption) {
                            parentOption.classList.remove('payment-option--checked');
                        }
                    }
                });
            }
            updateRadioButtonsState();
        });
    });
    updateRadioButtonsState();
	
    // Добавляем обработчики для server-радио, чтобы они нормально работали после разблокировки
    const serverRadios = document.querySelectorAll('input[name="server"]');
    serverRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Обновляем визуальное состояние при выборе сервера
            document.querySelectorAll('.server-option').forEach(option => {
                option.classList.remove('server-option--checked');
            });
            
            const parentOption = this.closest('.server-option');
            if (parentOption) {
                parentOption.classList.add('server-option--checked');
            }
        });
    });
});

const textarea = document.getElementById('keepalive');
  textarea.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
  });
  textarea.addEventListener('paste', function(e) {
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^\d*$/.test(pastedText)) {
      e.preventDefault();
    }
  });
  textarea.addEventListener('keydown', function(e) {
    const controlKeys = [
      'Backspace', 'Delete', 'Tab', 'Enter', 'Escape', 
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'PageUp', 'PageDown'
    ];
    if (controlKeys.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });


const keepToggle = document.getElementById('keeptogggle');
const keepaliveContainer = document.querySelector('.keepalive-container');
if (keepToggle && keepaliveContainer) {
    if (keepToggle.checked) {
        keepaliveContainer.classList.add('visible');
    } else {
        keepaliveContainer.classList.remove('visible');
    }
    keepToggle.addEventListener('change', function() {
        if (this.checked) {
            keepaliveContainer.classList.add('visible');
        } else {
            keepaliveContainer.classList.remove('visible');
        }
    });
}

const i1Toggle = document.getElementById('i1toggle');
const i1textarea = document.querySelector('.i1');
if (i1Toggle && i1textarea) {
    if (i1Toggle.checked) {
        i1textarea.classList.add('visible');
    } else {
        i1textarea.classList.remove('visible');
    }
    i1Toggle.addEventListener('change', function() {
        if (this.checked) {
            i1textarea.classList.add('visible');
        } else {
            i1textarea.classList.remove('visible');
        }
    });
}

// Дополнительные настройки (сворачиваемый блок)
const optionsToggle = document.getElementById('optionsToggle');
const optionsDiv = document.getElementById('optionsDiv');
const optionsArrow = document.getElementById('optionsArrow');

if (optionsToggle && optionsDiv && optionsArrow) {
    optionsToggle.addEventListener('click', function() {
        optionsDiv.classList.toggle('show');
        
        if (optionsDiv.classList.contains('show')) {
            optionsArrow.style.transform = 'rotate(180deg)';
        } else {
            optionsArrow.style.transform = 'rotate(0deg)';
        }
    });
}

const textarea1 = document.querySelector('.i2');
textarea1.addEventListener('input', function () {
  this.style.height = 'auto'; // Сброс для уменьшения при удалении текста
  this.style.height = (this.scrollHeight) + 'px'; // Установка высоты по контенту
});


// ========== QUIC генератор ==========
async function generateQuicMask() {
    const sniInput = document.getElementById('i1');
    const i1Toggle = document.getElementById('i1toggle');
    const i2area = document.getElementById('i2');
    
    if (!i1Toggle || !i1Toggle.checked) {
        i2area.style.display = 'none';
        return;
    }

    i2area.style.display = 'block';
    
    let sni = sniInput.value.trim();
    
    if (!sni) {
        i2area.value = '';
		i2area.style.display = 'none';
        return;
    }
    
    const level = 3; // ---------------------
    const dcid = new Uint8Array(1);
    window.crypto.getRandomValues(dcid);
    const scid = new Uint8Array(0);
    const token = new Uint8Array(0);
    const pkn = new Uint8Array([0]);
    
    const clientHello = quicTlsClientHelloSniOnly(sni);
    const [payload, cutSettings] = quicTlsClientHelloToFrames(clientHello, level);
    const packet = await quicInitial(dcid, scid, token, pkn, payload, 0);
    quicFixCutSettings(cutSettings, packet.byteLength, pkn.byteLength, payload.byteLength);
	
    const hexResult = quicToHex(packet);
    i2area.value = `I1 = <b 0x${hexResult}>`;
	i2area.style.height = 'auto';
    i2area.style.height = i2area.scrollHeight + 'px';
}

const i1Input = document.getElementById('i1');
i1Input.addEventListener('input', generateQuicMask);
i1Toggle.addEventListener('change', generateQuicMask);
document.getElementById('i2').style.display = 'none';
document.addEventListener('DOMContentLoaded', function() {

const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); 
                this.blur();
            }
        });
    });
}); //

// Функция для проверки выбранного сервера и показа предупреждения
function showWarningIfNeeded(callback) {
    const selectedServer = getSelectedServer();
    const warningModal = document.getElementById("warning");
    
    if (selectedServer !== 'def') {
        // Показываем модальное окно с предупреждением
        if (warningModal) {
            warningModal.style.display = "block";
            lockBodyScroll();
            
            // Добавляем обработчик для закрытия модального окна
            const closeWarning = function() {
                warningModal.style.display = "none";
                unlockBodyScroll();
                removeListeners();
                // Выполняем колбэк после закрытия
                if (callback) callback();
            };
            
            const removeListeners = function() {
                const closeBtn = warningModal.querySelector('.close');
                if (closeBtn) closeBtn.removeEventListener('click', closeWarning);
                window.removeEventListener('click', outsideClickHandler);
            };
            
            const outsideClickHandler = function(event) {
                if (event.target === warningModal) {
                    closeWarning();
                }
            };
            
            const closeBtn = warningModal.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeWarning);
            }
            window.addEventListener('click', outsideClickHandler);
        } else {
            if (callback) callback();
        }
    } else {
        if (callback) callback();
    }
}


const awg3Toggle = document.getElementById('awg3');
const awg3_1Toggle = document.getElementById('awg3_1');
const musor3 = document.getElementById('musor3');
const musor4 = document.getElementById('musor4');

if (awg3Toggle && musor3) {
    awg3Toggle.addEventListener('change', function() {
        if (this.checked) {
            musor3.classList.add('show');
        } else {
            musor3.classList.remove('show');
        }
    });
}

if (awg3_1Toggle && musor4) {
    awg3_1Toggle.addEventListener('change', function() {
        if (this.checked) {
            musor4.classList.add('show');
        } else {
            musor4.classList.remove('show');
        }
    });
}

const awg3cToggle = document.getElementById('awg3c');
const awg3_1cToggle = document.getElementById('awg3_1c');
const musor3с = document.getElementById('musor3с');
const musor4с = document.getElementById('musor4с');

if (awg3cToggle && musor3c) {
    awg3cToggle.addEventListener('change', function() {
        if (this.checked) {
            musor3c.classList.add('show');
        } else {
            musor3c.classList.remove('show');
        }
    });
}

if (awg3_1cToggle && musor4c) {
    awg3_1cToggle.addEventListener('change', function() {
        if (this.checked) {
            musor4c.classList.add('show');
        } else {
            musor4c.classList.remove('show');
        }
    });
}

// Сброс всех элементов управления при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
	const rulesToggle = document.getElementById('rules');
	const keepToggle = document.getElementById('keeptogggle');
	const keepaliveContainer = document.querySelector('.keepalive-container');
	const i1Toggle = document.getElementById('i1toggle');
	const i1textarea = document.querySelector('.i1');
	const i2area = document.getElementById('i2');
	const keepaliveInput = document.getElementById('keepalive');
	const i1Input = document.getElementById('i1');
	const ipv6Toggle = document.getElementById('ipv6');
	const awg3_1_1 = document.getElementById('awg3_1_1');
	const awg3_1_2 = document.getElementById('awg3_1_2');
	const awg3_1_1с = document.getElementById('awg3_1_1');
	const awg3_1_2с = document.getElementById('awg3_1_2');
	const awg3Inputs = ['cpaInput', 'mhaInput', 'ktInput', 'ratInput', 'rkatInput', 'rtInput'];
	const awg3cToggle = document.getElementById('awg3c');
	const awg3_1cToggle = document.getElementById('awg3_1c');
	
	document.querySelectorAll('[id="mtu"]').forEach(input => {
		input.value = '';
	});
	rulesToggle.checked = false;
	rulesToggle.disabled = false;
	keepToggle.checked = false;
	keepaliveContainer.classList.remove('visible');
	i1Toggle.checked = false;
	i1textarea.classList.remove('visible');
	i2area.style.display = 'none';
	i2area.value = '';
	keepaliveInput.value = '';
	i1Input.value = '';
	ipv6Toggle.checked = true;
	awg3Toggle.checked = false;
	awg3cToggle.checked = false;
	awg3_1Toggle.checked = false;
	awg3_1cToggle.checked = false;
	awg3_1_1.checked = true;
	awg3_1_2.checked = true; 
	awg3_1_1c.checked = true;
	awg3_1_2c.checked = true; 
	awg3Inputs.forEach(id => {
		document.querySelectorAll(`[id="${id}"]`).forEach(input => {
            input.value = '';
		});
	});
});

// Случайно AWG 3.0
function randomizeAwg3() {
    const getRandomRange = (minLow, minHigh, maxLow, maxHigh) => {
        const min = Math.floor(Math.random() * (minHigh - minLow + 1)) + minLow;
        const max = Math.floor(Math.random() * (maxHigh - maxLow + 1)) + maxLow;
        return `${min}-${max}`;
    };

    const updateInputs = (id, minLow, minHigh, maxLow, maxHigh) => {
        const elements = document.querySelectorAll(`[id="${id}"]`);
        elements.forEach(el => {
            el.value = getRandomRange(minLow, minHigh, maxLow, maxHigh);
        });
    };

    updateInputs('cpaInput', 5, 49, 50, 110);
    updateInputs('mhaInput', 5, 24, 25, 40);
    updateInputs('ktInput', 5, 10, 11, 25);
    updateInputs('ratInput', 50, 99, 100, 200);
    updateInputs('rkatInput', 50, 99, 100, 150);
    updateInputs('rtInput', 3, 9, 10, 15);
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Логика для кнопок 1, 2, 3 (Основной блок AWG) ---
    const awg3 = document.getElementById('awg3');
    const awg3_1 = document.getElementById('awg3_1');

    const btn1Text = document.querySelector('#generateButton1 .button__text');
    const btn2Text = document.querySelector('#generateButton2 .button__text');
    const btn3Text = document.querySelector('#generateButton3 .button__text');

    function updateAWGMain() {
        let version = '2.0';

        if (awg3_1 && awg3_1.checked) {
            version = '3.1';
        } else if (awg3 && awg3.checked) {
            version = '3.0';
        }

        if (btn1Text) btn1Text.textContent = `AWG ${version} (1 вариант)`;
        if (btn2Text) btn2Text.textContent = `AWG ${version} (2 вариант)`;
        if (btn3Text) btn3Text.textContent = `AWG ${version} (3 вариант)`;
    }

    if (awg3) awg3.addEventListener('change', updateAWGMain);
    if (awg3_1) awg3_1.addEventListener('change', updateAWGMain);


    // --- 2. Логика для Clash (Кнопка 4) и MASQUE UI ---
    const masqueCheckbox = document.getElementById('masque');
    const awg3c = document.getElementById('awg3c');
    const awg3_1c = document.getElementById('awg3_1c');
    const xray = document.getElementById('xray');
    const containerClash = document.querySelector('.containerClash');
    
    // Элементы Clash
    const ClashMASQUE = document.getElementById('generateButton6');
    const Clash = document.querySelector('#generateButton4 .button__text');

    // Функция вычисления текущей версии для Clash
    function getClashVersion() {
        if (awg3_1c && awg3_1c.checked) return '3.1';
        if (awg3c && awg3c.checked) return '3.0';
        return '2.0';
    }

    // Обновленная функция MASQUE UI
    function updateMasqueUI() {
        const isChecked = masqueCheckbox ? masqueCheckbox.checked : false;

        if (isChecked) {
            if (ClashMASQUE) ClashMASQUE.style.display = 'none';
            if (Clash) Clash.textContent = 'AWG и MASQUE';
            if (containerClash) containerClash.style.height = '100px';
            if (xray) xray.style.marginTop = '-60px';
            if (containerClash) containerClash.style.marginTop = '60px';
        } else {
            if (ClashMASQUE) ClashMASQUE.style.display = '';
            if (Clash) Clash.textContent = `AWG ${getClashVersion()}`;
            if (containerClash) containerClash.style.height = '160px';
            if (xray) xray.style.marginTop = '-30px';
            if (containerClash) containerClash.style.marginTop = '30px';
        }
    }

    // Подключаем слушатели событий
    if (masqueCheckbox) masqueCheckbox.addEventListener('change', updateMasqueUI);
    if (awg3c) awg3c.addEventListener('change', updateMasqueUI);
    if (awg3_1c) awg3_1c.addEventListener('change', updateMasqueUI);

    // Первичная инициализация
    updateAWGMain();
    updateMasqueUI();
});
