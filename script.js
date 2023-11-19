function submitAssignment() {
    var assignmentName = document.getElementById('assignmentName').value;
    var subject = document.getElementById('subject').value;
    var description = document.getElementById('description').value;
    var fileInput = document.getElementById('file');
    var file = fileInput.files[0];

    // Check if all fields are filled
    if (assignmentName && subject && description && file) {
        // Create a FormData object to send the data to the server
        var formData = new FormData();
        formData.append('assignmentName', assignmentName);
        formData.append('subject', subject);
        formData.append('description', description);
        formData.append('file', file);

        // Send the data to the server using Fetch API
        fetch('/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success popup
                document.getElementById('successPopup').style.display = 'block';
            } else {
                // Show error popup
                document.getElementById('errorPopup').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error popup in case of network error
            document.getElementById('errorPopup').style.display = 'block';
        });
    } else {
        // Show error popup if any field is empty
        document.getElementById('errorPopup').style.display = 'block';
    }
}
