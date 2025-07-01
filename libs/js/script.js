 $(document).ready(function() {
            // Array to store the TEMPORARY selections within the modal
            let tempSelectedUniversities = [];
            const maxUniversitySelections = 3; // Max universities user can select

            // Array to store the CONFIRMED selections for the main page display and "Add Subjects" button
            let confirmedSelectedUniversities = [];

            // Array to store the subjects added by the user
            let addedSubjects = [];
            const maxSubjectSelections = 7; // Max subjects user can add

            // Variable to keep track of the index of the subject being edited
            let editingSubjectIndex = -1; // -1 means no subject is currently being edited

            // List of suggested subjects (original case preserved for display, but lowercased for comparison)
            const allSuggestedSubjects = [
                "English Home Language", "Afrikaans Home Language", "isiZulu Home Language",
                "isiXhosa Home Language", "Sepedi Home Language", "Setswana Home Language",
                "Sesotho Home Language", "Xitsonga Home Language", "Tshivenda Home Language",
                "siSwati Home Language", "isiNdebele Home Language", "English First Additional Language",
                "Afrikaans First Additional Language", "isiZulu First Additional Language", "Mathematics",
                "Mathematical Literacy", "Physical Sciences", "Life Sciences", "Geography", "History",
                "Agricultural Sciences", "Accounting", "Business Studies", "Economics", "Religion Studies",
                "Consumer Studies", "Hospitality Studies", "Tourism", "Dramatic Arts", "Music",
                "Visual Arts", "Design", "Computer Applications Technology (CAT)", "Information Technology (IT)",
                "Engineering Graphics and Design (EGD)", "Civil Technology", "Mechanical Technology",
                "Electrical Technology", "Maritime Economics", "Aviation Studies", "Fashion Design"
            ];
            // Lowercased version for efficient comparison
            const allSuggestedSubjectsLower = allSuggestedSubjects.map(s => s.toLowerCase());

            // Function to update the visibility of the "Add Subjects" button
            function updateAddSubjectsButtonVisibility() {
                if (confirmedSelectedUniversities.length > 0) {
                    $('#addSubjectsBtn').show(); // Show the button
                } else {
                    $('#addSubjectsBtn').hide(); // Hide the button
                }
            }

            // Function to update the visibility of the "Submit All Data" button
            function updateSubmitButtonVisibility() {
                if (addedSubjects.length >= maxSubjectSelections) {
                    $('#submitDataBtn').show(); // Show the submit button
                } else {
                    $('#submitDataBtn').hide(); // Hide the submit button
                }
            }

            // Function to render subject suggestions based on a provided list (or all suggestions if none provided)
            function renderSubjectSuggestions(subjectsToRender = allSuggestedSubjects) {
                const $suggestionsContainer = $('#subjectSuggestions');
                $suggestionsContainer.empty(); // Clear previous suggestions

                if (subjectsToRender.length === 0) {
                    $suggestionsContainer.append($('<p class="text-muted">No matching suggestions.</p>'));
                    return;
                }

                subjectsToRender.forEach(subject => {
                    const $suggestion = $('<span class="subject-suggestion btn btn-light btn-sm"></span>').text(subject);
                    $suggestion.on('click', function() {
                        $('#subjectName').val($(this).text()).trigger('input'); // Trigger input to update validation
                    });
                    $suggestionsContainer.append($suggestion);
                });
            }

            // Function to display added subjects on the main page
            function displayAddedSubjects() {
                const $addedSubjectsSection = $('#addedSubjectsSection');
                const $displayContainer = $('#addedSubjectsDisplay');
                $displayContainer.empty(); // Clear previous display

                if (addedSubjects.length === 0) {
                    $addedSubjectsSection.hide(); // Hide the entire section
                    $displayContainer.append($('<p class="text-muted" id="noSubjectsAdded">No subjects added yet.</p>'));
                } else {
                    $addedSubjectsSection.show(); // Show the entire section
                    addedSubjects.forEach((subject, index) => {
                        const subjectItem = `
                            <div class="subject-display-item">
                                <span>${subject.name}</span>
                                <div class="subject-actions">
                                    <span class="badge bg-primary">Level: ${subject.level}</span>
                                    <button type="button" class="btn btn-sm btn-info edit-subject-btn" data-index="${index}">Edit</button>
                                    <button type="button" class="btn btn-sm btn-danger delete-subject-btn" data-index="${index}">Delete</button>
                                </div>
                            </div>
                        `;
                        $displayContainer.append(subjectItem);
                    });
                    // Attach event listeners after elements are added to DOM
                    $('.edit-subject-btn').on('click', function() {
                        const index = $(this).data('index');
                        editSubject(index);
                    });
                    $('.delete-subject-btn').on('click', function() {
                        const index = $(this).data('index');
                        deleteSubject(index);
                    });
                }
                updateSubmitButtonVisibility(); // Update submit button visibility after subjects are displayed
            }

            // Function to delete a subject
            function deleteSubject(index) {
                addedSubjects.splice(index, 1); // Remove 1 element at the given index
                displayAddedSubjects(); // Re-render the list
            }

            // Function to edit a subject
            function editSubject(index) {
                editingSubjectIndex = index; // Store the index of the subject being edited
                const subjectToEdit = addedSubjects[index];

                // Populate the modal fields with the subject's current data
                $('#subjectName').val(subjectToEdit.name).trigger('input'); // Trigger input for validation/filtering
                $('#subjectLevel').val(subjectToEdit.level).trigger('change'); // Trigger change for validation

                // Open the subject modal
                $('#subjectModal').modal('show');
            }


            // Add click event listener to each card within the university modal
            $('.card-clickable').on('click', function() {
                const universityId = $(this).attr('id');
                const universityFullName = $(this).data('fullname');

                // Check if the card is already selected (in the temporary array)
                const isSelected = tempSelectedUniversities.some(uni => uni.id === universityId);

                if (isSelected) {
                    // If selected, deselect it
                    $(this).removeClass('selected');
                    tempSelectedUniversities = tempSelectedUniversities.filter(uni => uni.id !== universityId);
                } else {
                    // If not selected and we haven't reached the max selections
                    if (tempSelectedUniversities.length < maxUniversitySelections) {
                        $(this).addClass('selected');
                        tempSelectedUniversities.push({ id: universityId, name: universityFullName });
                    } else {
                        // Provide feedback (e.g., via console log)
                        console.log(`You can select a maximum of ${maxUniversitySelections} universities.`);
                        return; // Prevent further action if max selected
                    }
                }

                // Log temporary selections (for debugging)
                console.log("Temporary selected in modal:", tempSelectedUniversities.map(uni => uni.id).join(', '));

                // If 3 universities are selected in the modal, automatically confirm and close
                if (tempSelectedUniversities.length === maxUniversitySelections) {
                    // Copy temporary selections to confirmed selections
                    confirmedSelectedUniversities = [...tempSelectedUniversities];

                    // Update the display on the main page
                    const displayNames = confirmedSelectedUniversities.map(uni => uni.name || uni.id);
                    $('#selectedUniversityDisplay').text(displayNames.join(', '));

                    // Update the "Add Subjects" button visibility
                    updateAddSubjectsButtonVisibility();

                    // Close the university modal
                    $('#universityModal').modal('hide');
                }
            });

            // Handle the "Confirm Selection" button click in the university modal footer
            $('#confirmUniversitySelection').on('click', function() {
                // Copy temporary selections to confirmed selections
                confirmedSelectedUniversities = [...tempSelectedUniversities];

                // Update the display on the main page
                const displayNames = confirmedSelectedUniversities.map(uni => uni.name || uni.id);
                $('#selectedUniversityDisplay').text(displayNames.length > 0 ? displayNames.join(', ') : 'None');

                // Update the "Add Subjects" button visibility
                updateAddSubjectsButtonVisibility();

                // Close the university modal
                $('#universityModal').modal('hide');
                console.log("Confirmed selections:", confirmedSelectedUniversities.map(uni => uni.id).join(', '));
            });

            // Handle university modal opening
            $('#universityModal').on('show.bs.modal', function () {
                // When the modal is about to be shown, populate tempSelectedUniversities with confirmed ones
                // so previous selections are visually present for editing.
                tempSelectedUniversities = [...confirmedSelectedUniversities];

                // Visually mark selected cards inside the modal based on tempSelectedUniversities
                $('.card-clickable').removeClass('selected'); // Clear all selections first
                tempSelectedUniversities.forEach(uni => {
                    $(`#${uni.id}`).addClass('selected');
                });
            });


            // Handle university modal closing
            $('#universityModal').on('hidden.bs.modal', function () {
                // Clear temporary selections when modal is hidden, without affecting confirmed ones
                tempSelectedUniversities = [];
                // Ensure all cards are deselected visually for next modal open
                $('.card-clickable').removeClass('selected');
            });

            // Function to validate subject name
            function validateSubjectName(inputElement) {
                const subjectNameInput = $(inputElement);
                const subjectNameFeedback = $('#subjectNameFeedback');
                const subjectName = subjectNameInput.val().trim();
                const subjectNameLower = subjectName.toLowerCase();

                subjectNameInput.removeClass('is-valid is-invalid is-unrecognized'); // Clear previous states

                if (subjectName === '') {
                    subjectNameInput.addClass('is-invalid');
                    subjectNameFeedback.text('Subject name cannot be empty.');
                    return false;
                }

                // Updated pattern to allow letters, spaces, and parentheses
                const pattern = /^[a-zA-Z ()]+$/; // Regex for letters, spaces, and parentheses
                if (!pattern.test(subjectName)) {
                    subjectNameInput.addClass('is-invalid');
                    subjectNameFeedback.text('Only letters, spaces, and parentheses are allowed for the subject name.');
                    return false;
                }


                // Check for exact match in the lowercased list
                if (allSuggestedSubjectsLower.includes(subjectNameLower)) {
                    subjectNameInput.addClass('is-valid');
                    subjectNameFeedback.text('Looks good!');
                    return true;
                } else {
                    // Not an exact match, mark as unrecognized (orange)
                    subjectNameInput.addClass('is-unrecognized'); // Apply orange border class
                    subjectNameFeedback.text('Subject is not recognized. Please select only from the suggested list.');
                    return false;
                }
            }


            // Handle Save Subject button click in the Subject Modal
            $('#saveSubjectBtn').on('click', function() {
                const subjectNameInput = $('#subjectName');
                const subjectLevelInput = $('#subjectLevel');
                const subjectLevel = subjectLevelInput.val();
                const subjectName = subjectNameInput.val().trim();
                const subjectNameLower = subjectName.toLowerCase();

                let isFormValid = true;

                // Validate subject name using the new function
                if (!validateSubjectName(subjectNameInput)) {
                    isFormValid = false;
                }

                // Validate subject level
                if (!subjectLevel) { // Check if level is selected
                    subjectLevelInput.addClass('is-invalid').removeClass('is-valid');
                    isFormValid = false;
                } else {
                    subjectLevelInput.addClass('is-valid').removeClass('is-invalid');
                }

                if (isFormValid) {
                    // Check for duplicate subject names (case-insensitive)
                    const isDuplicate = addedSubjects.some((subject, idx) =>
                        subject.name.toLowerCase() === subjectNameLower && idx !== editingSubjectIndex
                    );

                    if (isDuplicate) {
                        alert(`Subject "${subjectName}" has already been added. Please enter a unique subject.`);
                        subjectNameInput.addClass('is-invalid is-unrecognized'); // Mark as invalid/unrecognized
                        $('#subjectNameFeedback').text('This subject has already been added.');
                        return; // Stop function execution
                    }

                    // Prevent adding more subjects if already at max and not editing
                    if (addedSubjects.length >= maxSubjectSelections && editingSubjectIndex === -1) {
                        alert(`You can only add a maximum of ${maxSubjectSelections} subjects.`);
                        return; // Stop function execution
                    }

                    console.log(`Subject Added: ${subjectName}, Level: ${subjectLevel}`);

                    // Check if we are editing an existing subject or adding a new one
                    if (editingSubjectIndex !== -1) {
                        // Update existing subject
                        addedSubjects[editingSubjectIndex] = { name: subjectName, level: subjectLevel };
                        editingSubjectIndex = -1; // Reset editing state
                    } else {
                        // Add new subject
                        addedSubjects.push({ name: subjectName, level: subjectLevel });
                    }

                    displayAddedSubjects(); // Update the display on the main page

                    // Clear the form fields and remove validation feedback
                    subjectNameInput.val('').removeClass('is-valid is-invalid is-unrecognized');
                    subjectLevelInput.val('').find('option:first').prop('selected', true).removeClass('is-valid is-invalid');
                    $('#subjectNameFeedback').text(''); // Clear feedback message

                    // Close the subject modal
                    $('#subjectModal').modal('hide');
                } else {
                    console.log("Please correct the highlighted fields.");
                    // Bootstrap's invalid-feedback messages will appear
                }
            });

            // Real-time validation and filtering for subjectName
            $('#subjectName').on('input', function() {
                const inputValue = $(this).val().trim().toLowerCase();

                // Filter suggestions based on input (case-insensitive)
                const filteredSubjects = allSuggestedSubjects.filter(subject =>
                    subject.toLowerCase().includes(inputValue)
                );
                renderSubjectSuggestions(filteredSubjects); // Render filtered suggestions

                // Apply validation styling using the new function
                validateSubjectName(this);
            });

            // Validation feedback for subjectLevel
            $('#subjectLevel').on('change', function() {
                if (this.checkValidity() && $(this).val() !== '') {
                    $(this).addClass('is-valid').removeClass('is-invalid');
                } else {
                    $(this).addClass('is-invalid').removeClass('is-valid');
                }
            });

            // Render suggestions and reset form when the subject modal is shown
            $('#subjectModal').on('show.bs.modal', function () {
                renderSubjectSuggestions(); // Render all suggestions initially
                // Clear form fields and validation feedback when modal is opened for a new entry
                $('#subjectForm')[0].reset(); // Reset form to clear inputs and dropdown
                $('#subjectName').removeClass('is-valid is-invalid is-unrecognized');
                $('#subjectLevel').removeClass('is-valid is-invalid');
                $('#subjectNameFeedback').text(''); // Clear specific feedback message
                editingSubjectIndex = -1; // Ensure editing state is reset when opening for new entry
            });

            // Handle Submit All Data button click
            $('#submitDataBtn').on('click', function() {
                // Ensure all necessary data is available
                if (confirmedSelectedUniversities.length === 0) {
                    alert("Please select at least one university before submitting.");
                    return;
                }
                if (addedSubjects.length !== maxSubjectSelections) { // Changed to strict equality
                    alert(`Please add exactly ${maxSubjectSelections} subjects before submitting.`);
                    return;
                }

                const dataToSend = {
                    universities: confirmedSelectedUniversities,
                    subjects: addedSubjects
                };

                console.log("Data to send to API:", dataToSend);

                // --- AJAX CALL PLACEHOLDER ---
                // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
                // and configure method, headers, and body as needed by your API.
                fetch('YOUR_API_ENDPOINT_HERE', {
                    method: 'POST', // Or 'PUT', 'GET', etc.
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers like authorization tokens here
                        // 'Authorization': 'Bearer YOUR_AUTH_TOKEN'
                    },
                    body: JSON.stringify(dataToSend)
                })
                .then(response => {
                    if (!response.ok) {
                        // Handle HTTP errors
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json(); // Or response.text() if your API doesn't return JSON
                })
                .then(data => {
                    console.log('API response:', data);
                    alert('Data successfully submitted!');
                    // Optionally, clear the form or provide further feedback to the user
                    confirmedSelectedUniversities = [];
                    addedSubjects = [];
                    updateAddSubjectsButtonVisibility();
                    displayAddedSubjects();
                    $('#selectedUniversityDisplay').text('None');
                })
                .catch(error => {
                    console.error('Error submitting data:', error);
                    alert('Failed to submit data. Please try again. Error: ' + error.message);
                });
            });


            // Initial calls on page load
            updateAddSubjectsButtonVisibility();
            displayAddedSubjects(); // Initialize subject display and submit button visibility
        });
