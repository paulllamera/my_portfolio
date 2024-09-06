

async function contact_me(btn) {
    var form = $("#contactForm")[0];
    $(btn).prop('disabled', true).html('Sending...');
    var fd = new FormData(form);
    fd.append('send_message', "");
    data = await $.ajax({
        url: 'func.php',
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
    });
    try {
        res = JSON.parse(data);
    } catch (error) {
        $("#submitErrorMessage").removeClass('d-none');
        $(btn).prop('disabled', false);
        return;
    }

    if (res.status == 'success') {
        $("#submitSuccessMessage").removeClass('d-none');
        $(btn).html('Sent!');
        setTimeout(() => {
            $("#submitSuccessMessage").addClass('d-none');
            $(btn).prop('disabled', false).html('Send');
        }, 3000);
    } else {
        $("#submitErrorMessage").removeClass('d-none');
        $(btn).html('Sending Error!');
        setTimeout(() => {
            $("#submitErrorMessage").addClass('d-none');
            $(btn).prop('disabled', false).html('Send');;
        }, 3000);
    }
    $.each($(form).find("input, textarea, select"), function (i, v) {
        $(v).removeAttr('disabled').val('');
    });

    console.log(res.message);
}


async function myajax(url, formData) {
    try {
        const currentDate = new Date().toISOString();
        formData.append('csrf', $.cookie("csrf"));
        formData.append('currentDateTime', currentDate);

        const response = await $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
        });

        return response.trim();

    } catch (error) {
        console.log('error getting file')
        return "[{}]";
    }
}

/* $("#contactForm").submit(async function (e) {
    console.log('nakapasok')
    e.preventDefault();
    form = $(this);
    btn = $("#submitButton");
    $(btn).prop('disabled', true);
    var fd = new FormData(form);
    fd.append('send_message', "");
    data = await myajax('func.php', fd);
    res = JSON.parse(data);
    if (res.status == 'success') {
        $("#submitSuccessMessage").removeClass('d-none');
        setTimeout(() => {
            $("#submitSuccessMessage").addClass('d-none');
            $(btn).prop('disabled', false);
        }, 3000);
    } else {
        $("#submitErrorMessage").removeClass('d-none');
        setTimeout(() => {
            $("#submitErrorMessage").addClass('d-none');
            $(btn).prop('disabled', false);
        }, 3000);

    }
    console.log(res.message);
});
 */


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };


    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});




