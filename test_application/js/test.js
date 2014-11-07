// Script for the test file

var test = {
    questions: [], // array of question objects
    name: null,
    tags: []
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('li_create_test').addEventListener('click', function () {
        console.log('creating test ... ');

        // show the div_test_container
        document.getElementById('div_container_test_details').className = 'show';
    });
    document.getElementById('btn_create_test').addEventListener('click', function () {
        console.log('creating test ... ');
        document.getElementById('div_container_test_details').className = '';

        // create/update the test object
        var form = document.forms.frm_test;
        console.log(form);
        test.name = form.inp_test_name.value;
        test.tags = form.inp_test_tags.value.split(',');
        console.log(test);
        // make an ajax POST request

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/data');
        xhr.setRequestHeader('accept', 'application/json');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.addEventListener('readystatechange', function () {
            if( xhr.readyState === 4 && xhr.status === 200 ) {
                var obj = JSON.parse(xhr.responseText);
                console.log(obj);
            }
        });
        xhr.send(JSON.stringify(test));



        // show the div_test_container
        document.getElementById('div_questions_container').className = 'show';
    });
    document.forms.frm_test.addEventListener('submit', function (event) { // event.target
        event.preventDefault();
    });

    // adds a question to the test object
    document.getElementById('btn_add_question').addEventListener('click', function () {
        test.questions.push({
            question: 'What is the difference between a .call and .apply ?',
            options: ['Way in which they accept function parameters', 'option 2', 'option 3', 'option 4']
        });

        var parent = document.getElementById('div_display_questions');
        parent.innerHTML = '';
        // create a div element - put the question in it
        var question_container = createElement('div', '', 'question_container', parent);
        createElement('div', test.questions[0].question, 'question', question_container);
        var ul_options = createElement('ul', '', 'answers', question_container);
        for (var i = 0, len = test.questions[0].options.length; i < len; i++) {
            createElement('li', test.questions[0].options[i], 'option', ul_options);
        }


        // create a ul element and put all options in the list

    });

    function createElement (type, innerHTML, className, parent) {
        var element = document.createElement(type);
        element.innerHTML = innerHTML;
        if (typeof className !== 'undefined') element.className = className;
        if (typeof parent !== 'undefined') parent.appendChild(element);
        return element;
    }


});

