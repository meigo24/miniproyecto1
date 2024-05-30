document.addEventListener("DOMContentLoaded", (event) => { 
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    const historyList = document.createElement('ul');
    document.body.appendChild(historyList);

    function updateDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    function calculateResult() {
        try { 
            const result = eval(display.value);
            const historyEntry = `${display.value} = ${result}`;
            saveToHistory(historyEntry);
            display.value = result;
        } catch (error) {
            display.value = 'Error';
        }
    }

    //🌸🌸 Recupera el historial guardado en localStorage o inicializa como un array vacío🌸🌸
    function saveToHistory(entry) {
        let history = JSON.parse(localStorage.getItem('calcHistory')) || []; 
        history.push(entry);
        localStorage.setItem('calcHistory', JSON.stringify(history));
        updateHistoryDisplay();
    }

    // 🌸🌸Actualiza la visualización del historial en la página🌸🌸
    function updateHistoryDisplay() {
        let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
        historyList.innerHTML = '';
        history.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const value = event.target.innerText;

            switch (value) {
                case 'AC':
                    clearDisplay();
                    break;
                case 'DE':
                    deleteLast();
                    break;
                case '=':
                    calculateResult();
                    break;
                default:
                    updateDisplay(value);
                    break;
            }
        });
    });

    // 🌸🌸🌸🌸Inicializa la visualización del historial al cargar la página🌸🌸🌸🌸
    updateHistoryDisplay();
});
