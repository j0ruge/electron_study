
let addItem = document.getElementById('add-item');
let closeModal = document.getElementById('close-modal');
let modal = document.getElementById('modal');
let showModal = document.getElementById('show-modal');
let itemUrl = document.getElementById('url');

// Disable & Enable modal buttons
exports.toggleModalButtons = () =>
{
    // Check state of buttons
    if(addItem.disabled === true)
    {
        addItem.disabled = false;
        addItem.style.opacity = 1;
        addItem.innerText = 'Add Item';
        closeModal.style.display = 'inline';
    }
    else
    {
        addItem.disabled = true;
        addItem.style.opacity = 0.5;
        addItem.innerText = 'Adding...';
        closeModal.style.display = 'none';
    }
};

showModal.addEventListener('click', () =>
{
    modal.style.display = 'flex';
    itemUrl.focus();
});

closeModal.addEventListener('click', () =>
{
    modal.style.display = 'none';
    itemUrl.value = '';
});