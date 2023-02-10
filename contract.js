const initialize = () => {
    const onBoardButton = document.getElementById('connectButton');
    const getAccountsButton = document.getElementById('getAccounts');
    const getAccountsResult = document.getElementById('getAccountsResult');

    const onboarding = new MetaMaskOnboarding();

    const onClickInstall = () => {
        onBoardButton.innerText = 'Installing MetaMask...';
        onBoardButton.disabled = true;
        onboarding.startOnboarding();
    };

    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    const onClickConnect = async () => {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            onBoardButton.innerText = 'Connected';
            onBoardButton.disabled = true;
        }
        catch (error) {
            console.error(error);
        }
    };

    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            onBoardButton.innerText = 'Install MetaMask';
            onBoardButton.onclick = onClickInstall;
            onBoardButton.disabled = false;
        }
        else {
            onBoardButton.innerText = 'Connect to MetaMask';
            onBoardButton.onclick = onClickConnect;
            onBoardButton.disabled = false;
        }
    };

    getAccountsButton.addEventListener('click', async () => {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
    });

    MetaMaskClientCheck();
};

window.addEventListener('DOMContentLoaded', initialize)