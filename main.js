document.addEventListener('DOMContentLoaded', function() {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const calendarHeader = document.getElementById('month-year');
    const calendarDays = document.getElementById('calendar-days');
    const calendarDates = document.getElementById('calendar-dates');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pages = document.querySelectorAll('.form-page');

    let currentDate = new Date();
    let currentPage = 0;

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        calendarHeader.textContent = `${date.toLocaleString('pt-BR', { month: 'long' })} ${year}`;

        calendarDays.innerHTML = '';
        calendarDates.innerHTML = '';

        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            calendarDays.appendChild(dayElement);
        });

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            calendarDates.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateCell = document.createElement('div');
            dateCell.textContent = i;
            dateCell.classList.add('p-2', 'hover:bg-gray-200', 'rounded');
            calendarDates.appendChild(dateCell);
        }
    }

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === pageIndex);
        });
    }

    function nextPage() {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    }

    prevButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Inicializar a página inicial
    showPage(currentPage);
    renderCalendar(currentDate);

    // Expor funções globalmente
    window.nextPage = nextPage;
    window.prevPage = prevPage;
});
