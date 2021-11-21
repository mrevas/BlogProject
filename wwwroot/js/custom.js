const allEditIcons = $(".edit-icon");
const allEditIconsParent = $(".edit-icon-parent");
const createCommentButton = $("#create-comment-button");
let index = 0;
let editing = false;
let comment;
let commentParent;
let editIcon;
let iconParent;
let createComment;

const addTag = () => {
    const tagEntry = document.getElementById("TagEntry");
    const isDuplicate = search(tagEntry.value);

    if (tagEntry.value && !isDuplicate) {
        $('#TagList').append($('<option>', {
            value: tagEntry.value.replace(/\W/g, ''),
            text: tagEntry.value.replace(/\W/g, '')
        }));

        index++;
        tagEntry.value = "";
    } else if (isDuplicate) {
        tagEntry.value = "";
        toastr.error(`Sorry, ${tagEntry.value} is already a tag.`)
    }
}

const deleteTag = () => {
    const tagValue = $('#TagList').val();
    const selectedOption = $(`#TagList option[value='${tagValue}'`);
    selectedOption.remove();
}

const replaceTag = (tag, index) => {
    let newOption = new Option(tag, tag);
    document.getElementById("TagList").options[index] = newOption;
}

$("form").on("submit", function () {
    $("#TagList option").prop("selected", "selected");
});

if (tagValues != '') {
    let tagArray = tagValues.split(",");
    tagArray.map((tag, index) => replaceTag(tag, index))
}

function search(str) {
    const tagListOptions = $("#TagList option");
    const tagArray = [];
    tagListOptions.each(function () {
        tagArray.push(this.textContent)
    })

    return tagArray.find(m => m.toLowerCase() === str.toLowerCase());

}

function enableEdit(event) {
    createComment = $("#create-comment")
    editIcon = $(event.target)
    iconParent = editIcon.parent();
    comment = $(event.target).parent().parent().parent().parent().find("#comment");
    commentParent = comment.parent();
    const parentDiv = commentParent.parent().parent();
    const buttons = $('<div id="button-div" class="float-end mt-2 pt-1"><button type="submit" class="btn btn-primary btn-sm m-1">Post comment</button><button onclick="disableEdit()" type="button" class="btn btn-outline-primary btn-sm">Cancel</button></div>');
    
    if (!buttons.is("html *")) {
        comment.prop('disabled', false);
        comment.focus();
        setTimeout(() => comment.prop('selectionStart', comment.val().length), 1)
        
        createComment.prop('disabled', true);
        comment.addClass("form-control w-100 bg-light");
        commentParent.addClass("form-outline w-100");
        parentDiv.addClass("card-footer py-3 border-0");
        parentDiv.append(buttons);
        allEditIcons.each(function () {
            if (buttons.is("html *")) {
                $(this).prop('disabled', true);
                createCommentButton.prop('disabled', true);
            }
        });
    }
}

function disableEdit() {
    const buttonDiv = $("#button-div");
    const parentDiv = buttonDiv.parent();

    if (buttonDiv.is("html *")) {
        comment.prop('disabled', true);
        createComment.prop('disabled', false);
        comment.removeClass("form-control w-100 bg-light");
        commentParent.removeClass("form-outline w-100");
        parentDiv.removeClass("card-footer py-3 border-0");
        buttonDiv.remove();
        allEditIcons.each(function () {
            if (!buttonDiv.is("html *")) {
                $(this).prop('disabled', false);
                createCommentButton.prop('disabled', false);
            }
        });
    }
}