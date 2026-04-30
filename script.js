const khodams = [
    'F-22 Raptor', 'Ferrari SF-23', 'Red Bull RB19',
    'AlphaTauri AT04', 'Pisang Keju khas Israel', 'Space Shuttle Atlantis',
    'Thunderbolt 3000', 'Cherno Alpha', 'Darth Vader',
    'SpaceX Starship', 'Alexander Hugo', 'Aston Martin DBX',
    'Ikan Sapu-sapu', 'Arbys', 'Gboard Clipboard',
    'Sonic The Hedgehog', 'Bumblebee', 'Robert Topala',
    'Titanic II', 'Rover Mars Explorer', 'Motor Ninja',
    'Starkiller Base', 'MK Ultra', 'Tontol Kerbang',
    'Naga Sadow', 'X-Wing Starfighter', 'Plaqueboymax',
    'Komodo dragon', 'Kulkas dua pintu', 'Infinix Note 40 Pro',
    'Kaiju Slattern', 'Dapa kedap suara', 'Jebediah Kerman',
    'Cosori TurboBlaze 6-Quart', 'Batak asli Agartha', 'Nigersaurus',
    'Tungsten Cube', 'Unsymmetrical Dimethylhydrazine'
];

function hashName(name) 
    const s = name.toLowerCase().trim().replace(/\s+/g, '');
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
    }
    return h;
}

function checkKhodam() {
    const name = document.getElementById('nameInput').value.trim();
    const thinkingDiv = document.getElementById('thinking');
    const resultDiv = document.getElementById('result');
    const btn = document.getElementById('btn');

    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';
    thinkingDiv.innerHTML = '';

    if (!name) {
        thinkingDiv.innerHTML = '<span class="error">Tulis namamu dulu.</span>';
        return;
    }

    btn.disabled = true;

    const hash = hashName(name);
    const vowels = (name.match(/[aiueo]/gi) || []).length;
    const consonants = name.replace(/[aiueo\s]/gi, '').length;
    const charSum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const entropy = (hash % 97).toFixed(2);
    const resonance = ((charSum * 1.618) % 100).toFixed(1);
    const match = hash % khodams.length;

    const steps = [
        `mengurai fonem: ${vowels} vokal, ${consonants} konsonan`,
        `menghitung entropi karakter: ${entropy}`,
        `memetakan resonansi nama: ${resonance}%`,
        `mencocokkan dengan ${khodams.length} khodam dalam database...`,
        `kecocokan ditemukan pada indeks [${match}]`,
    ];

    let i = 0;
    function nextStep() {
        if (i > 0) {
            const prev = thinkingDiv.querySelector('.active');
            if (prev) prev.className = 'step done';
        }
        if (i < steps.length) {
            const span = document.createElement('span');
            span.className = 'step active';
            span.textContent = '> ' + steps[i];
            thinkingDiv.appendChild(span);
            i++;
            setTimeout(nextStep, 480 + Math.random() * 200);
        } else {
            const last = thinkingDiv.querySelector('.active');
            if (last) last.className = 'step done';
            btn.disabled = false;
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `<div class="found-label">Khodam kamu</div><strong>${khodams[match]}</strong>`;
        }
    }

    nextStep();
}

document.getElementById('nameInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkKhodam();
});

