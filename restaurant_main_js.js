//https: //crudcrud.com/api/95b51ee81d7c4a6c9ed338195813c991
async function saveData(event) {
    event.preventDefault();

    const dishes = event.target.dishes.value;
    const price = event.target.price.value;
    const table = event.target.tableno.value;

    const BillObj = {
        dishes,
        price,
        table
    }

    if (dishes === '' || price === '' || table === '') {
        alert('empty field are not allowed');
    }
    try {
        let res = await axios.post('https://crudcrud.com/api/95b51ee81d7c4a6c9ed338195813c991/makeorder', BillObj);
        display(res.data);
    } catch (err) {
        console.log(err);
    }

    event.target.dishes.value = '';
    event.target.price.value = '';
    event.target.tableno.value = '';

}

async function display(BillObj) {
    const { dishes, price, table } = BillObj;
    let parent = null;


    // //  getting parent element 
    // const parent = document.querySelector('#parent');

    //  creatinh child element
    const h2 = document.createElement('h2');
    const li = document.createElement('li');
    const hr = document.createElement('hr');
    li.className = 'style-li';

    li.textContent = 'Table' + table + " : " + price + " : " + dishes;
    h2.textContent = `Table ${table}`;


    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.className = 'btn btn-danger float-end';

    let id = BillObj._id;
    deleteButton.onclick = async() => {
        try {
            console.log(id);
            let res = await axios.delete(`https://crudcrud.com/api/95b51ee81d7c4a6c9ed338195813c991/makeorder/${id}`);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
        // parent.removeChild(h2);
        if (table === 'table1') {
            parent = document.querySelector('#parent1')
        } else if (table === 'table2') {
            parent = document.querySelector('#parent2');
        } else {
            parent = document.querySelector('#parent3');
        }
        parent.removeChild(li);

        //  parent element to append child

        console.log(table);
    }

    if (table === 'table1') {
        //  getting parent element
        // console.log('fngnfgfn')
        parent = document.querySelector('#parent1');
        li.appendChild(deleteButton);
        // parent.appendChild(h2);
        parent.appendChild(li);
        parent.appendChild(hr);

    } else if (table === 'table2') {
        //  getting parent element
        //console.log('fngnfgfn')
        parent = document.querySelector('#parent2');
        li.appendChild(deleteButton);
        // parent.appendChild(h2);
        parent.appendChild(li);
        parent.appendChild(hr);

    } else {
        parent = document.querySelector('#parent3');
        li.appendChild(deleteButton);
        // parent.appendChild(h2);
        parent.appendChild(li);
        parent.appendChild(hr);
    }





}
window.addEventListener('DOMContentLoaded', async() => {
    try {
        let res = await axios.get('https://crudcrud.com/api/95b51ee81d7c4a6c9ed338195813c991/makeorder')
        for (var i = 0; i < res.data.length; i++) {
            display(res.data[i]);
        }
    } catch (err) {
        console.log(err);
    }
});