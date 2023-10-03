function calculateBudget() {

    // НАЧАЛО ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

    var investment = parseInt(document.getElementById("investment").value.replace(/\s/g, ""));
    var rent = parseInt(document.getElementById("rent").value);
    var cityFactor = parseFloat(document.getElementById("city").value.replace(",", "."));
    var locationFactor = parseFloat(document.getElementById("location").value.replace(",", "."));
    var format = parseInt(document.getElementById("format").value);

    var investmentInput = document.getElementById("investment");
    var rentInput = document.getElementById("rent");

    // КОНЕЦ ОБЪЯВЛНИЕ ПЕРЕМЕННЫХ

    //НАЧАЛО ВЫЧИСЛЕНИЯ ВЫРУЧКИ Маржина, рентабельности, расходов и тд

    var revenue = locationFactor * format * cityFactor; // Вычисление выручки

    var marginPercentage;

    if (format === 350) {
        marginPercentage = 0.3; // Задаем маржу в процентах для формата 350
    } else if (format === 400) {
        marginPercentage = 0.27; // Задаем маржу в процентах для формата 400
    } else if (format === 450) {
        marginPercentage = 0.28; // Задаем маржу в процентах для формата 450
    } else if (format === 500) {
        marginPercentage = 0.29; // Задаем маржу в процентах для формата 500
    } else {
        marginPercentage = 0; // Задайте нужное значение для других форматов
    }


    var expenses = rent + (revenue - (revenue * marginPercentage)); // Вычисление расходов
    var profit = revenue - expenses; // Вычисление прибыли
    var profitabilityPercentage = (profit / revenue) * 100; // Вычисление рентабельности в процентах
    var paybackMonths = investment / profit; // Вычисление окупаемости в месяцах

    // Получаем элементы, с которыми будем работать
    var resultElement = document.getElementById("result"); // Элемент для отображения результатов
    var revenueElement = document.getElementById("revenue"); // Элемент для отображения выручки
    var marginElement = document.getElementById("margin"); // Элемент для отображения маржи
    var expensesElement = document.getElementById("expenses"); // Элемент для отображения расходов
    var profitElement = document.getElementById("profit"); // Элемент для отображения прибыли
    var profitabilityElement = document.getElementById("profitability"); // Элемент для отображения рентабельности
    var paybackMonthsElement = document.getElementById("paybackMonths"); // Элемент для отображения окупаемости в месяцах


    resultElement.classList.remove("hidden"); // Показываем элемент с результатами
    revenueElement.textContent = revenue.toLocaleString("ru-RU") + " ₽"; // Устанавливаем значение выручки
    marginElement.textContent = (marginPercentage * 100).toFixed(0) + " %"; // Устанавливаем значение маржи в процентах
    expensesElement.textContent = expenses.toLocaleString("ru-RU") + " ₽"; // Устанавливаем значение расходов
    profitElement.textContent = profit.toLocaleString("ru-RU") + " ₽"; // Устанавливаем значение прибыли
    profitabilityElement.textContent = profitabilityPercentage.toFixed(2) + " %"; // Устанавливаем значение рентабельности в процентах
    paybackMonthsElement.textContent = paybackMonths.toFixed(2) + " мес."; // Устанавливаем значение окупаемости в месяцах


    // КОНЕЦ ВЫЧИСЛЕНИЯ ВЫРУЧКИ


    // НАЧАЛО ИЗМЕНЕНИЯ ЦВЕТА И ЗНАЧЕНИЙ ПОЛЗУНКА ПРИ СДВИГЕ 

    investmentInput.addEventListener("input", updateInvestmentValue); // Добавляем обработчик события input для поля ввода investment, чтобы вызывать функцию updateInvestmentValue при изменении значения
    rentInput.addEventListener("input", updateRentValue); // Добавляем обработчик события input для поля ввода rent, чтобы вызывать функцию updateRentValue при изменении значения

    var investmentValueOutput = document.getElementById("investmentValue"); // Получаем элемент вывода значения инвестиций
    investmentValueOutput.textContent = investment.toLocaleString("ru-RU") + " ₽"; // Устанавливаем значение инвестиций
    var rentValueOutput = document.getElementById("rentValue"); // Получаем элемент вывода значения аренды

    rentValueOutput.textContent = rent.toLocaleString("ru-RU"); // Устанавливаем значение аренды

    function updateInvestmentValue() {
        var investment = parseInt(investmentInput.value); // Получаем значение инвестиций из поля ввода
        investmentValueOutput.textContent = investment.toLocaleString("ru-RU") + " ₽"; // Обновляем вывод значения инвестиций
    }

    function updateRentValue() {
        var rent = parseInt(rentInput.value); // Получаем значение аренды из поля ввода
        rentValueOutput.textContent = rent.toLocaleString("ru-RU") + " ₽"; // Обновляем вывод значения аренды
    }


}

document.getElementById("investment").addEventListener("input", calculateBudget); // Добавляем обработчик события input для поля ввода investment, чтобы вызывать функцию calculateBudget при изменении значения
document.getElementById("rent").addEventListener("input", calculateBudget); // Добавляем обработчик события input для поля ввода rent, чтобы вызывать функцию calculateBudget при изменении значения
document.getElementById("city").addEventListener("change", calculateBudget); // Добавляем обработчик события change для поля выбора city, чтобы вызывать функцию calculateBudget при изменении выбранного значения
document.getElementById("location").addEventListener("change", calculateBudget); // Добавляем обработчик события change для поля выбора location, чтобы вызывать функцию calculateBudget при изменении выбранного значения
document.getElementById("format").addEventListener("change", calculateBudget); // Добавляем обработчик события change для поля выбора format, чтобы вызывать функцию calculateBudget при изменении выбранного значения


rent.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value; // Получаем текущее значение ползунка аренды
    const progress = (tempSliderValue / rent.max) * 100; // Вычисляем прогресс в процентах
    rent.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`; // Устанавливаем фоновый градиент для ползунка аренды
});

investment.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value; // Получаем текущее значение ползунка инвестиций
    const progress = (tempSliderValue / investment.max) * 100; // Вычисляем прогресс в процентах
    investment.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`; // Устанавливаем фоновый градиент для ползунка инвестиций
});
