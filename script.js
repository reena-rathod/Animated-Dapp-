// Game state
let gameState = {
    eggCount: 0,
    featherCount: 0,
    coinBalance: 0,
    isWalletConnected: false,
    flockName: "Not joined",
    flockStatus: "Inactive"
};
let eggCount = 0;
let featherCount = 0;
let coinBalance = 0;
let isWalletConnected = false;

function updateDisplay() {
    document.getElementById('eggCount').textContent = eggCount;
    document.getElementById('featherCount').textContent = featherCount;
    document.getElementById('coinBalance').textContent = coinBalance.toFixed(2);
}

function incrementEggs() {
    if (!isWalletConnected) {
        alert("Please connect your wallet first!");
        return;
    }
    eggCount += 10;
    updateDisplay();
}

function incrementFeathers() {
    if (!isWalletConnected) {
        alert("Please connect your wallet first!");
        return;
    }
    featherCount += Math.floor(Math.random() * 10);
    updateDisplay();
}

function incrementCoins() {
    if (!isWalletConnected) {
        alert("Please connect your wallet first!");
        return;
    }
    coinBalance += 1;
    updateDisplay();
}

function autoIncrement() {
    if (isWalletConnected) {
        eggCount += 1;
        featherCount += Math.floor(Math.random() * 3);
        coinBalance += 0.1;
        updateDisplay();
    }
}

setInterval(autoIncrement, 3000);

function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.textContent = ['🐔', '🥚', '🪶'][Math.floor(Math.random() * 3)];
    emoji.style.position = 'absolute';
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = `${Math.random() * 100}%`;
    emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
    emoji.style.opacity = '0.5';
    emoji.style.animation = `float 3s ease-in-out infinite ${Math.random() * 2}s`;
    return emoji;
}

function addFloatingEmojis() {
    const container = document.getElementById('floatingEmojis');
    for (let i = 0; i < 10; i++) {
        container.appendChild(createFloatingEmoji());
    }
}




// DOM Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const startCoopBtn = document.getElementById('startCoopBtn');
const layEggsBtn = document.getElementById('layEggsBtn');
const ruffleFeathersBtn = document.getElementById('ruffleFeathersBtn');
const peckCoinsBtn = document.getElementById('peckCoinsBtn');
const eggCountDisplay = document.getElementById('eggCount');
const featherCountDisplay = document.getElementById('featherCount');
const coinBalanceDisplay = document.getElementById('coinBalance');
const marketplaceItems = document.getElementById('marketplaceItems');
const leaderboardList = document.getElementById('leaderboardList');
const flockNameDisplay = document.getElementById('flockName');
const flockStatusDisplay = document.getElementById('flockStatus');
const flockMembersList = document.getElementById('flockMembers');
const joinFlockBtn = document.getElementById('joinFlockBtn');
const subscribeBtn = document.getElementById('subscribeBtn');
const emailInput = document.getElementById('emailInput');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');

// Event Listeners
connectWalletBtn.addEventListener('click', connectWallet);
startCoopBtn.addEventListener('click', startCoop);
layEggsBtn.addEventListener('click', layEggs);
ruffleFeathersBtn.addEventListener('click', ruffleFeathers);
peckCoinsBtn.addEventListener('click', peckCoins);
joinFlockBtn.addEventListener('click', joinFlock);
subscribeBtn.addEventListener('click', subscribe);
modalClose.addEventListener('click', closeModal);

// Tab functionality
const tabTriggers = document.querySelectorAll('.tab-trigger');
const tabContents = document.querySelectorAll('.tab-content');

tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const tabId = trigger.getAttribute('data-tab');
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        trigger.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Game functions
function connectWallet() {
    if (!gameState.isWalletConnected) {
        gameState.isWalletConnected = true;
        connectWalletBtn.textContent = 'Wallet Connected';
        connectWalletBtn.disabled = true;
        showModal('Wallet Connected', 'Your wallet has been successfully connected!');
        startAutoIncrement();
    }
}

function startCoop() {
    if (!gameState.isWalletConnected) {
        showModal('Connect Wallet', 'Please connect your wallet first to start your coop!');
    } else {
        showModal('Coop Started', 'Your chicken coop has been established. Start earning now!');
    }
}

function layEggs() {
    if (gameState.isWalletConnected) {
        gameState.eggCount += 10;
        updateDisplay();
    } else {
        showModal('Connect Wallet', 'Please connect your wallet to lay eggs!');
    }
}

function ruffleFeathers() {
    if (gameState.isWalletConnected) {
        gameState.featherCount += Math.floor(Math.random() * 10) + 1;
        updateDisplay();
    } else {
        showModal('Connect Wallet', 'Please connect your wallet to ruffle feathers!');
    }
}

function peckCoins() {
    if (gameState.isWalletConnected) {
        gameState.coinBalance += 1;
        updateDisplay();
    } else {
        showModal('Connect Wallet', 'Please connect your wallet to peck for coins!');
    }
}

function updateDisplay() {
    eggCountDisplay.textContent = gameState.eggCount;
    featherCountDisplay.textContent = gameState.featherCount;
    coinBalanceDisplay.textContent = gameState.coinBalance.toFixed(2);
}

function startAutoIncrement() {
    setInterval(() => {
        gameState.eggCount += 1;
        gameState.featherCount += Math.floor(Math.random() * 3);
        gameState.coinBalance += 0.1;
        updateDisplay();
    }, 3000);
}

// Marketplace functionality
const marketplaceItemsData = [
    { name: 'Super Chicken Feed', price: 100, description: 'Boost your farm\'s productivity!' },
    { name: 'Golden Egg Nest', price: 200, description: 'Increase your egg production!' },
    { name: 'Automatic Feather Plucker', price: 150, description: 'Collect feathers while you sleep!' }
];

function renderMarketplace() {
    marketplaceItems.innerHTML = '';
    marketplaceItemsData.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'marketplace-item';
        itemElement.innerHTML = `
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <button class="btn" onclick="buyItem('${item.name}', ${item.price})">Buy for ${item.price} 🪙</button>
        `;
        marketplaceItems.appendChild(itemElement);
    });
}

function buyItem(itemName, price) {
    if (gameState.isWalletConnected) {
        if (gameState.coinBalance >= price) {
            gameState.coinBalance -= price;
            updateDisplay();
            showModal('Purchase Successful', `You have bought ${itemName}!`);
        } else {
            showModal('Insufficient Funds', 'You don\'t have enough Cluck Bucks to make this purchase.');
        }
    } else {
        showModal('Connect Wallet', 'Please connect your wallet to make purchases!');
    }
}

// Leaderboard functionality
const leaderboardData = [
    { name: 'EggMaster3000', score: 1000 },
    { name: 'FeatherKing', score: 950 },
    { name: 'CluckNorris', score: 900 },
    { name: 'ChickenLittle', score: 850 },
    { name: 'FowlPlay', score: 800 }
];

function renderLeaderboard() {
    leaderboardList.innerHTML = '';
    leaderboardData.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${player.name} - ${player.score} 🪙`;
        leaderboardList.appendChild(listItem);
    });
}

// Flock functionality
function joinFlock() {
    if (gameState.isWalletConnected) {
        gameState.flockName = "Clucky Champs";
        gameState.flockStatus = "Active";
        flockNameDisplay.textContent = gameState.flockName;
        flockStatusDisplay.textContent = gameState.flockStatus;
        flockStatusDisplay.classList.remove('inactive');
        flockMembersList.innerHTML = `
            <li>You</li>
            <li>EggcellentFarmer</li>
            <li>FeatherFriend22</li>
            <li>CoopMaster99</li>
        `;
        joinFlockBtn.textContent = "Leave Flock";
        joinFlockBtn.onclick = leaveFlock;
        showModal('Flock Joined', 'You have successfully joined the Clucky Champs flock!');
    } else {
        showModal('Connect Wallet', 'Please connect your wallet to join a flock!');
    }
}

function leaveFlock() {
    gameState.flockName = "Not joined";
    gameState.flockStatus = "Inactive";
    flockNameDisplay.textContent = gameState.flockName;
    flockStatusDisplay.textContent = gameState.flockStatus;
    flockStatusDisplay.classList.add('inactive');
    flockMembersList.innerHTML = '';
    joinFlockBtn.textContent = "Join a Flock";
    joinFlockBtn.onclick = joinFlock;
    showModal('Flock Left', 'You have left your flock. Your chicken is feeling lonely!');
}

// Subscription functionality
function subscribe() {
    const email = emailInput.value;
    if (email && email.includes('@')) {
        showModal('Subscription Successful', `Thank you for subscribing with ${email}! You'll receive updates and special offers.`);
        emailInput.value = '';
    } else {
        showModal('Invalid Email', 'Please enter a valid email address.');
    }
}

// Modal functionality
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Initialize game
function initGame() {
    renderMarketplace();
    renderLeaderboard();
    updateDisplay();
}

// Start the game
initGame();

// Floating emojis
function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.textContent = ['🐔', '🥚', '🪶'][Math.floor(Math.random() * 3)];
    emoji.style.position = 'absolute';
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = `${Math.random() * 100}%`;
    emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
    emoji.style.opacity = '0.5';
    emoji.style.animation = `float ${Math.random() * 5 + 5}s linear infinite`;
    return emoji;
}

function addFloatingEmojis() {
    const container = document.getElementById('floatingEmojis');
    for (let i = 0; i < 10; i++) {
        container.appendChild(createFloatingEmoji());
    }
}

addFloatingEmojis();

// Scroll hint
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.getElementById('scrollHint').style.display = 'none';
    }
});