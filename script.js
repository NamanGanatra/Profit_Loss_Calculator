let totalProfit = 0;
let totalLoss = 0;

document.getElementById('addPLBtn').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'flex';
    document.body.classList.add('popup-active');
});

document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    document.body.classList.remove('popup-active');
});

document.getElementById('plForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const reason = document.getElementById('reason').value;
    const amount = parseInt(document.getElementById('amount').value);

    const plTable = document.getElementById('plTable');

    // Create new row
    const newRow = document.createElement('div');
    newRow.classList.add('row');

    // Create P&L entry
    const pl = document.createElement('span');
    pl.textContent = (type === 'profit' ? `+ ${amount}` : `- ${amount}`);
    pl.classList.add(type === 'profit' ? 'profit' : 'loss');

    // Reason for P&L
    const reasonSpan = document.createElement('span');
    reasonSpan.textContent = reason;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        const currentAmount = parseInt(pl.textContent.replace(/[+-]/g, ''));
        if (type === 'profit') {
            totalProfit -= currentAmount;
        } else {
            totalLoss -= currentAmount;
        }
        updateTotals();
        newRow.remove();
    });

    newRow.appendChild(pl);
    newRow.appendChild(reasonSpan);
    newRow.appendChild(deleteBtn);
    plTable.appendChild(newRow);

    // Update totals
    if (type === 'profit') {
        totalProfit += amount;
    } else {
        totalLoss += amount;
    }
    updateTotals();

    // Close popup
    document.getElementById('popup').style.display = 'none';
});

function updateTotals() {
    document.getElementById('totalProfit').textContent = `+ ${totalProfit}`;
    document.getElementById('totalLoss').textContent = `- ${totalLoss}`;
}
