$(document).ready(function () {
    restartAllUser();
    $('.AddBtn').on('click', function (event) {
        let user = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            userName: $("#userName").val(),
            password: $("#password").val(),
            roles: getRole("#selectRole")

        }
        fetch("api/newUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(user)
        }).then(() => openTabById('nav-home'))
            .then(() => restartAllUser());
        $('input').val('');
    });
});

function createTableRow(u) {
    let userRole = "";
    for (let i = 0; i < u.roles.length; i++) {
        userRole += " " + u.roles[i].role;
    }
    return `<tr id="user_table_row">
            <td>${u.id}</td>
            <td>${u.firstName}</td>
            <td>${u.lastName}</td>
            <td>${u.email}</td>
            <td>${u.username}</td>
            <td>${u.password}</td>
            <td>${userRole}</td>
            <td>
            <a  href="/api/${u.id}" class="btn btn-info eBtn" >Edit</a>
            </td>
            <td>
            <a  href="/api/delete/${u.id}" class="btn btn-danger delBtn">Delete</a>
            </td>
        </tr>`;
}

function getRole(address) {
    let data = [];
    $(address).find("option:selected").each(function () {
        data.push({id: $(this).val(), role: $(this).attr("name"), authority: $(this).attr("name")})
    });
    return data;
}

function restartAllUser() {
    let UserTableBody = $("#user_table_body")

    UserTableBody.children().remove();

    fetch("api/allusers")
        .then((response) => {
            response.json().then(data => data.forEach(function (item, i, data) {
                let TableRow = createTableRow(item);
                UserTableBody.append(TableRow);
            }));
        }).catch(error => {
        console.log(error);
    });
}

document.addEventListener('click', function (event) {
    event.preventDefault()
    if ($(event.target).hasClass('delBtn')) {
        let href = $(event.target).attr("href");
        delModalButton(href)
    }


    if ($(event.target).hasClass('eBtn')) {
        let href = $(event.target).attr("href");
        $(".editUser #exampleModal").modal();

        $.get(href, function (user) {
            $(".editUser #id").val(user.id);
            $(".editUser #firstNameEd").val(user.firstName);
            $(".editUser #lastNameEd").val(user.lastName);
            $(".editUser #emailEd").val(user.email);
            $(".editUser #userNameEd").val(user.userName);
            $(".editUser #passwordEd").val(user.password);
            $(".editUser #selectRoleEd").val(user.roles);
        });
    }
    if ($(event.target).hasClass('editButton')) {
        let user = {
            id: $('#id').val(),
            firstName: $('#firstNameEd').val(),
            lastName: $('#lastNameEd').val(),
            email: $('#emailEd').val(),
            userName: $('#userNameEd').val(),
            password: $('#passwordEd').val(),
            roles: getRole("#selectRoleEd")
        }
        editModalButton(user)
    }

    if ($(event.target).hasClass('logout')) {
        logout();
    }
    if ($(event.target).hasClass('btnUserTable')) {
        userTable();
    }

});

function delModalButton(href) {
    fetch(href, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    }).then(() => restartAllUser());
}

function editModalButton(user) {
    fetch("api/edit", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
    }).then(function (response) {
        $('input').val('');
        $('.editUser #exampleModal').modal('hide');
        restartAllUser();
    })
}

function openTabById(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}

function logout() {
    document.location.replace("/logout");
}

function userTable() {
    document.location.replace("/user");
}


