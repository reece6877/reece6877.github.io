const attackers = ["Sledge","Thatcher","Ash","Thermite","Twitch","Montagne","Glaz","Fuze","Blitz","IQ","Buck","Blackbeard","Capitao","Hibana","Jackal","Ying","Zofia","Dokkaebi","Lion","Finka","Maverick","Nomad","Gridlock","Nokk","Amaru","Kali","Iana","Ace","Zero","Flores","Osa","Sens","Grim","Brava","Ram","Deimos","Denari","Striker"];
const defenders = ["Smoke","Mute","Castle","Pulse","Doc","Rook","Kapkan","Tachanka","Jager","Bandit","Frost","Valkyrie","Caveira","Echo","Mira","Lesion","Ela","Vigil","Maestro","Alibi","Clash","Kaid","Mozzie","Warden","Goyo","Wamai","Oryx","Melusi","Aruni","Thunderbird","Thorn","Azami","Solis","Fenrir","Tubarao","Sentry","Skopos"];

const challenges = [
    { name: "Pistols Only", desc: "No primary. Sidearm all round." },
    { name: "Iron Sights Only", desc: "No optics. Play completely ironsights." },
    { name: "No Sprinting", desc: "Walk only. You are not in a rush." },
    { name: "Crouch Walk", desc: "No standing. Crouch the entire round." },
    { name: "Hipfire Only", desc: "No ADS whatsoever. Point and pray." },
    { name: "No Gadget", desc: "Do not deploy your operator gadget." },
    { name: "Drone Blindfolded", desc: "No droning allowed at all." },
    { name: "Window Gang", desc: "Every entry must be through a window." },
    { name: "No Peeking", desc: "No leaning. Ever." },
    { name: "Reload After Every Kill", desc: "Full reload after every elimination." },
    { name: "Maximum Aggression", desc: "Push immediately. First 10 seconds — go." }
];

const ICON_PATH = "siegeimages/"; 

function tryAllPaths(img, opName, attempt = 0) {
    const name = opName.toLowerCase().replace(/\s/g, '');
    const variations = [
        `r6-operators-list-${name}.avif`,
        `r6s-operators-list-${name}.avif`,
        `r6-operator-list-${name}.avif`,
        `r6s-operator-list-${name}.avif`
    ];

    const manualFixes = {
        "ash": "r6-operators-list-ash_317253.avif",
        "mozzie": "r6-operators-list-mozzie_343537.avif",
        "wamai": "r6-operators-list-wamai_358318.avif",
        "kali": "r6-operators-list-kali_358317.avif",
        "denari": "r6s-operators-list-denari__2_.avif"
    };

    if (attempt === 0 && manualFixes[name]) {
        img.src = ICON_PATH + manualFixes[name];
        img.onerror = () => tryAllPaths(img, opName, 1);
        return;
    }

    if (attempt >= variations.length) {
        img.style.display = 'none';
        img.parentElement.textContent = opName.slice(0, 2).toUpperCase();
        return;
    }

    img.src = ICON_PATH + variations[attempt];
    img.style.display = 'block';
    img.onerror = () => tryAllPaths(img, opName, attempt + 1);
}

function rollOperators() {
    const atk = attackers[Math.floor(Math.random() * attackers.length)];
    const def = defenders[Math.floor(Math.random() * defenders.length)];

    const atkIconBox = document.getElementById('atk-icon');
    const defIconBox = document.getElementById('def-icon');

    atkIconBox.innerHTML = `<img class="op-img">`;
    defIconBox.innerHTML = `<img class="op-img">`;

    tryAllPaths(atkIconBox.querySelector('.op-img'), atk);
    tryAllPaths(defIconBox.querySelector('.op-img'), def);

    document.getElementById('atk-name').innerHTML = `<span class="anim">${atk}</span>`;
    document.getElementById('def-name').innerHTML = `<span class="anim">${def}</span>`;

    [document.getElementById('atk-card'), document.getElementById('def-card')].forEach(card => {
        card.classList.remove('pop');
        void card.offsetWidth;
        card.classList.add('pop');
    });
}

function rollChallenge() {
    const shuffled = [...challenges].sort(() => 0.5 - Math.random());
    const [c1, c2] = shuffled;
    document.getElementById('challenge-p1').innerHTML = `<div class="anim"><div class="challenge-name">${c1.name}</div><div class="challenge-desc">${c1.desc}</div></div>`;
    document.getElementById('challenge-p2').innerHTML = `<div class="anim"><div class="challenge-name">${c2.name}</div><div class="challenge-desc">${c2.desc}</div></div>`;
}

document.getElementById('btn-full').addEventListener('click', () => { rollOperators(); rollChallenge(); });
document.getElementById('btn-challenge').addEventListener('click', rollChallenge);
