"use strict"

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const $ = document;
const requestBtn = $.getElementById('request-btn');
const productsBtn = $.getElementById('products-btn');
const formContainer = $.getElementById('form-container');
const productsContainer = $.getElementById('products-container');
const form = $.getElementById('form');
const inputs = $.querySelectorAll('.input');
const taxCode = $.getElementById('taxcode')
const resultMessage = $.getElementById('message');

const supabase = createClient
('https://wbkeahghzxpcrxdbmdge.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India2VhaGdoenhwY3J4ZGJtZGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5OTU3MDQsImV4cCI6MjAyMTU3MTcwNH0.g0VDd1nt_JwDOKjItT6pWdtLjLqm9zs5k1toXLCHo5I')


const goToForm = () => {
    $.documentElement.scrollTo({
        behavior: 'smooth',
        top: formContainer.offsetHeight
    })
}

const goToProducts = () => {
    $.documentElement.scrollTo({
        behavior: 'smooth',
        top: 250
    })
}

const checkInputs = () => {
    let isDataEmpty = false;

    inputs.forEach(input => {
        if (!input.value) {
            isDataEmpty = true;
        }
    })

    if (isDataEmpty) {
        showErrorMsg('لطفا اطلاعات رو تکمیل کنید');
    }else {
        setInfo();
    }
}

async function setInfo () {

    let taxCodeValue = 0;

    if (taxCode.value) {
        taxCodeValue = taxCode.value
    }
    
    
    const { data, error } = await supabase
    .from('posUsers')
    .insert({
        name: inputs[0].value,
        lastName: inputs[1].value,
        phoneNumber: inputs[2].value,
        staticNumber: inputs[3].value,
        birthday: inputs[4].value,
        idNumber: inputs[5].value,
        idCardNumber: inputs[6].value,
        fatherName: inputs[7].value,
        bankName: inputs[8].value,
        shebaNumber: inputs[9].value,
        cardNumber: inputs[10].value,
        industry: inputs[11].value,
        shopName: inputs[12].value,
        shopAddress: inputs[13].value,
        shopPostalCode: inputs[14].value,
        taxCode: taxCodeValue
    })

    if (error) {
        showErrorMsg('لطفا دئباره تلاش کنید');
    }else {
        showSuccessMsg('اطلاعات شما با موفقیت ثبت شد');
        resetInputs();
    }

}

const showErrorMsg = message => {
    resultMessage.innerHTML = message;
    resultMessage.classList.remove('success')
    resultMessage.classList.add('error')

    setTimeout(() => {
        resultMessage.classList.remove('error')
    }, 3000);
}

const showSuccessMsg = message => {
    resultMessage.innerHTML = message;
    resultMessage.classList.remove('error')
    resultMessage.classList.add('success')

    setTimeout(() => {
        resultMessage.classList.remove('success')
    }, 3000);
}

const resetInputs = () => {
    inputs.forEach(input => {
        input.value = '';
    })

    taxCode.value = '';
}

requestBtn.addEventListener('click', () => {
    goToForm();
})

productsBtn.addEventListener('click', () => {
    goToProducts();
})

form.addEventListener('submit', event => {
    event.preventDefault();
    checkInputs();
})