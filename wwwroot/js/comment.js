// JavaScript source code
const allEditIcons = $(".edit-icon");
const allEditIconsParent = $(".edit-icon-parent");
const createCommentButton = $("#create-comment-button");
let buttonDiv = $(".button-div");
let moderationType = $(".ModerationType");
let comment;
let commentParent;
let editIcon;
let iconParent;
let createComment;
moderationType.hide();
buttonDiv.hide();


function enableEdit(event) {
    createComment = $("#create-comment");
    editIcon = $(event.target);
    iconParent = editIcon.parent();
    comment = $(event.target).closest("form").find("#comment");
    commentParent = comment.parent();
    moderationType = $(event.target).closest("form").find(".ModerationType");
    buttonDiv = $(event.target).closest("form").find(".button-div");
    const parentDiv = commentParent.parent().parent();

    if (!buttonDiv.is(":visible")) {
        comment.prop('disabled', false);
        comment.focus();
        setTimeout(() => comment.prop('selectionStart', comment.val().length), 1);
        moderationType.show();
        moderationType.find("select").prop("disabled", false);
        

        createComment.prop('disabled', true);
        createCommentButton.prop('disabled', true);
        comment.addClass("form-control w-75 bg-white");
        commentParent.addClass("form-outline w-100");
        parentDiv.addClass("card-footer py-3 border-0");
        buttonDiv.show();
        allEditIcons.each(function () {
            if (buttonDiv.is(":visible")) {
                $(this).prop('disabled', true);
            }
        });
    }
}

function disableEdit() {
    const parentDiv = buttonDiv.parent();

    if (buttonDiv.is("html *")) {
        comment.prop('disabled', true);
        createComment.prop('disabled', false);
        createCommentButton.prop('disabled', false);
        comment.removeClass("form-control w-75 bg-white");
        commentParent.removeClass("form-outline w-100");
        parentDiv.removeClass("card-footer py-3 border-0");
        moderationType.hide();
        buttonDiv.hide();
        allEditIcons.each(function () {
            if (!buttonDiv.is(":visible")) {
                $(this).prop('disabled', false);
            }
        });
    }
}

function deleteComment(event) {
    const clickedButton = $(event.target);
    const form = $(event.target).closest("form");
    const action = clickedButton.attr("href");
    form.attr("action", action);
    form.submit();
}
