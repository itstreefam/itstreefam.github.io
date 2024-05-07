window.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("myForm");
    var status = document.getElementById("status");
    var statusClone = status;
  
    // Success and Error functions for after the form is submitted
    function success() {
        form.reset();
        status.classList.add("success");
        status.innerHTML =  "<div class='text-center pt-2'> \
                                <div class='alert alert-success d-flex' role='alert' style='width: fit-content; margin: auto;'> \
                                <svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg> \
                                Thank you! \
                            </div>";
    }

    function error() {
        status.classList.add("error");
        status.innerHTML =  "<div class='text-center pt-2'> \
                                <div class='alert alert-danger d-flex' role='alert' style='width: fit-content; margin: auto;'> \
                                <svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg> \
                                Try again! \
                            </div>";
    }

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
        status.replaceWith(statusClone);
    });
  });
  
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
  }