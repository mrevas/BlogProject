let index = 0;

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
