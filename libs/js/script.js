document.addEventListener('DOMContentLoaded', () => {
    // Get started button click handler
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'selectUni.html';
        });
    }

    // DOM Elements - Pages
    const formPage = document.getElementById('form-page');
    const recommendationsPage = document.getElementById('recommendations-page');
    const improveGradesPage = document.getElementById('improve-grades-page');
    const applicationChecklistPage = document.getElementById('application-checklist-page');
    const faqsPage = document.getElementById('faqs-page');

    // Navigation Buttons - Back to Form
    const backToFormBtnRecs = document.getElementById('back-to-form-btn-recs');
    const backToFormBtnImprove = document.getElementById('back-to-form-btn-improve');
    const backToFormBtnChecklist = document.getElementById('back-to-form-btn-checklist');
    const backToFormBtnFaqs = document.getElementById('back-to-form-btn-faqs');

    // Navbar Links
    const navCalculator = document.getElementById('nav-calculator');
    const navRecommendations = document.getElementById('nav-recommendations');
    const navApplicationChecklist = document.getElementById('nav-application-checklist');
    const navFaqs = document.getElementById('nav-faqs');
    const navImproveGrades = document.getElementById('nav-improve-grades');

    // Form Elements
    const subjectsContainer = document.getElementById('subjects-container');
    const addSubjectBtn = document.getElementById('add-subject-btn');
    const totalApsScoreSpan = document.getElementById('total-aps-score');
    const recommendationsBtn = document.getElementById('recommendations-btn');
    const recommendationsErrorMessage = document.getElementById('recommendations-error-message');
    const duplicateSubjectError = document.getElementById('duplicate-subject-error');

    // Recommendation Page Elements
    const summaryApsScore = document.getElementById('summary-aps-score');
    const summaryPerformanceLevel = document.getElementById('summary-performance-level');
    const summarySubjectsEntered = document.getElementById('summary-subjects-entered');
    const perfectMatchesContainer = document.getElementById('perfect-matches-container');
    const goodMatchesContainer = document.getElementById('good-matches-container');
    const otherMatchesContainer = document.getElementById('other-matches-container');
    const perfectMatchesCount = document.getElementById('perfect-matches-count');
    const goodMatchesCount = document.getElementById('good-matches-count');
    const otherMatchesCount = document.getElementById('other-matches-count');

    // Improve Grades Page Elements
    const summaryApsScoreImprove = document.getElementById('summary-aps-score-improve');
    const summaryPerformanceLevelImprove = document.getElementById('summary-performance-level-improve');
    const summarySubjectsEnteredImprove = document.getElementById('summary-subjects-entered-improve');

    // Data
    const levelPoints = {
        'Level 7': 7,
        'Level 6': 6,
        'Level 5': 5,
        'Level 4': 4,
        'Level 3': 3,
        'Level 2': 2,
        'Level 1': 1
    };

    const allMatricSubjects = [
        'Mathematics',
        'Mathematical Literacy',
        'Technical Mathematics',
        'Physical Sciences',
        'Life Sciences',
        'English Home Language',
        'English First Additional Language',
        'Afrikaans Home Language',
        'Afrikaans First Additional Language',
        'IsiZulu Home Language',
        'IsiXhosa Home Language',
        'SiSwati Home Language',
        'IsiNdebele Home Language',
        'Sepedi Home Language',
        'Sesotho Home Language',
        'Setswana Home Language',
        'Xitsonga Home Language',
        'Tshivenda Home Language',
        'South African Sign Language Home Language',
        'History',
        'Geography',
        'Accounting',
        'Business Studies',
        'Economics',
        'Computer Applications Technology',
        'Information Technology',
        'Dramatic Arts',
        'Visual Arts',
        'Music',
        'Consumer Studies',
        'Engineering Graphics and Design',
        'Agricultural Sciences',
        'Religion Studies',
        'Civil Technology',
        'Sport and Exercise Science',
        'Nautical Science',
        'Marine Sciences',
        'Electrical Technology',
        'Agricultural Management Practices',
        'Agricultural Technology',
        'Design',
        'Dance',
        'Hospitality Studies',
        'Tourism',
        'Mechanical Technology',
        'Maritime Economics',
        'Life orientation'
    ].sort();

    const homeLanguageSubjects = allMatricSubjects.filter(sub => sub.includes('Home Language'));
    const additionalLanguageSubjects = allMatricSubjects.filter(sub => sub.includes('First Additional Language') || sub.includes('Second Additional Language'));

    const mathSubjects = [
        'Mathematics',
        'Mathematical Literacy',
        'Technical Mathematics'
    ];

    // University Data (with all required commas)
    const universities = [
        {
            id: 'nwu',
            name: 'North-West University',
            location: 'Potchefstroom, North West',
            description: 'Multi-campus university with strong programs in business, education, and health sciences.',
            minAPS: 26,
            requiredSubjects: ['English Home Language', 'Mathematics', 'Accounting', 'Physical Sciences'],
            popularPrograms: ['Business', 'Education', 'Health Sciences'],
            ranking: 7
        },
        {
            id: 'ufs',
            name: 'University of the Free State',
            location: 'Bloemfontein, Free State',
            description: 'Comprehensive university with strong community engagement and diverse programs.',
            minAPS: 24,
            requiredSubjects: ['English Home Language', 'Life Sciences', 'Mathematics', 'Accounting'],
            popularPrograms: ['Health Sciences', 'Natural Sciences', 'Humanities'],
            ranking: 8
        },
        {
            id: 'dut',
            name: 'Durban University of Technology',
            location: 'Durban, KwaZulu-Natal',
            description: 'Technology university offering practical, industry-focused programs.',
            minAPS: 20,
            requiredSubjects: ['English Home Language', 'Physical Sciences', 'Mathematics', 'Life Sciences'],
            popularPrograms: ['Applied Sciences', 'Arts & Design', 'Engineering'],
            ranking: 10
        },
        {
            id: 'ru',
            name: 'Rhodes University',
            location: 'Makhanda, Eastern Cape',
            description: 'Small, prestigious university known for academic excellence and vibrant campus life.',
            minAPS: 30,
            requiredSubjects: ['English Home Language', 'Accounting', 'Mathematics', 'Life Sciences'],
            popularPrograms: ['Humanities', 'Science', 'Commerce'],
            ranking: 5
        },
        {
            id: 'ukzn',
            name: 'University of KwaZulu-Natal',
            location: 'Durban, KwaZulu-Natal',
            description: 'Major university with strong research focus and diverse academic offerings.',
            minAPS: 28,
            requiredSubjects: ['English Home Language', 'Physical Sciences', 'Accounting', 'Life Sciences'],
            popularPrograms: ['Medicine', 'Engineering', 'Law'],
            ranking: 6
        },
        {
            id: 'up',
            name: 'University of Pretoria',
            location: 'Pretoria, Gauteng',
            description: 'One of South Africa\'s leading research universities, offering a wide range of programs.',
            minAPS: 32,
            requiredSubjects: ['Mathematics', 'Physical Sciences', 'English Home Language', 'Life Sciences'],
            popularPrograms: ['Engineering', 'Law', 'Medicine', 'Veterinary Science'],
            ranking: 2
        },
        {
            id: 'uct',
            name: 'University of Cape Town',
            location: 'Cape Town, Western Cape',
            description: 'Internationally acclaimed university known for its academic excellence and research.',
            minAPS: 35,
            requiredSubjects: ['Mathematics', 'English Home Language', 'Accounting', 'Physical Sciences'],
            popularPrograms: ['Commerce', 'Engineering & Built Environment', 'Health Sciences'],
            ranking: 1
        },
        {
            id: 'wits',
            name: 'University of the Witwatersrand',
            location: 'Johannesburg, Gauteng',
            description: 'A leading research-intensive university, committed to academic excellence and social justice.',
            minAPS: 30,
            requiredSubjects: ['Mathematics', 'English Home Language', 'Life Sciences', 'Physical Sciences'],
            popularPrograms: ['Engineering', 'Health Sciences', 'Humanities', 'Science'],
            ranking: 3
        },
        {
            id: 'um',
            name: 'University of Mpumalanga',
            location: 'Mbombela, Mpumalanga',
            description: 'A new and growing university focused on agriculture, nature conservation, and hospitality.',
            minAPS: 22,
            requiredSubjects: ['English Home Language', 'Mathematics', 'Accounting', 'Life Sciences'],
            popularPrograms: ['Agriculture', 'Nature Conservation', 'Hospitality Management'],
            ranking: 15
        },
        {
            id: 'unisa',
            name: 'University of South Africa (UNISA)',
            location: 'Pretoria (Distance Learning)',
            description: 'Africa\'s largest open distance learning institution, offering a wide range of qualifications.',
            minAPS: 18,
            requiredSubjects: ['English Home Language', 'Physical Sciences', 'Mathematics', 'Accounting'],
            popularPrograms: ['Education', 'Business Administration', 'Law', 'Humanities'],
            ranking: 20
        },
        {
            id: 'uj',
            name: 'University of Johannesburg',
            location: 'Johannesburg, Gauteng',
            description: 'A vibrant and diverse university offering a comprehensive range of academic programs.',
            minAPS: 27,
            requiredSubjects: ['English Home Language', 'Life Sciences', 'Mathematics', 'Physical Sciences'],
            popularPrograms: ['Engineering', 'Law', 'Humanities', 'Management'],
            ranking: 4
        }
    ];

    let rowCount = 0;

    // Helper Functions
    function getSelectedSubjects(currentRowSubjectSelect = null) {
        const selected = new Set();
        subjectsContainer.querySelectorAll('.subject-select').forEach(select => {
            if (select !== currentRowSubjectSelect && select.value !== '') {
                selected.add(select.value);
            }
        });
        return selected;
    }

    function updateAllSubjectDropdowns() {
        const allSubjectSelects = subjectsContainer.querySelectorAll('.subject-select');
        const selectedSubjectsValues = Array.from(allSubjectSelects)
            .map(select => select.value)
            .filter(value => value !== '');

        let actualHomeLanguageSelected = selectedSubjectsValues.some(sub => homeLanguageSubjects.includes(sub));
        let actualAdditionalLanguageSelected = selectedSubjectsValues.some(sub => additionalLanguageSubjects.includes(sub));
        let actualMathSelected = selectedSubjectsValues.some(sub => mathSubjects.includes(sub));

        allSubjectSelects.forEach((currentSelect) => {
            const currentRow = currentSelect.closest('.subject-row');
            const currentRowIndex = Array.from(subjectsContainer.children).indexOf(currentRow);
            const currentSelectedValue = currentSelect.value;
            const selectedSubjectsInOtherDropdowns = getSelectedSubjects(currentSelect);

            let allowedSubjectsForThisRow = [];

            const isFirstRow = currentRowIndex === 0;
            const isSecondRow = currentRowIndex === 1;
            const isThirdRow = currentRowIndex === 2;
            const isFourthRowOrBeyond = currentRowIndex >= 3;

            if (isFirstRow) {
                allowedSubjectsForThisRow = homeLanguageSubjects;
            } else if (isSecondRow) {
                allowedSubjectsForThisRow = additionalLanguageSubjects;
            } else if (isThirdRow) {
                allowedSubjectsForThisRow = mathSubjects;
            } else {
                allowedSubjectsForThisRow = allMatricSubjects;
            }

            while (currentSelect.options.length > 0) {
                currentSelect.remove(0);
            }

            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.textContent = 'Select a subject';
            placeholderOption.disabled = true;
            placeholderOption.selected = (currentSelectedValue === '');
            currentSelect.appendChild(placeholderOption);

            allowedSubjectsForThisRow.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;

                let disableOption = false;

                if (selectedSubjectsInOtherDropdowns.has(subject)) {
                    disableOption = true;
                }

                const isCurrentSubjectHomeLanguage = homeLanguageSubjects.includes(subject);
                const isCurrentSubjectAdditionalLanguage = additionalLanguageSubjects.includes(subject);

                if (isFourthRowOrBeyond) {
                    if (actualHomeLanguageSelected && actualAdditionalLanguageSelected &&
                        (isCurrentSubjectHomeLanguage || isCurrentSubjectAdditionalLanguage)) {
                        disableOption = true;
                    }
                } else {
                    if (isFirstRow) {
                        if (isCurrentSubjectHomeLanguage && currentSelectedValue !== subject && actualHomeLanguageSelected) {
                            const selectedHomeLanguageInOtherRow = Array.from(allSubjectSelects).some(s => s !== currentSelect && homeLanguageSubjects.includes(s.value));
                            if (selectedHomeLanguageInOtherRow) disableOption = true;
                        }
                    } else if (isSecondRow) {
                        if (isCurrentSubjectAdditionalLanguage && currentSelectedValue !== subject && actualAdditionalLanguageSelected) {
                             const selectedAdditionalLanguageInOtherRow = Array.from(allSubjectSelects).some(s => s !== currentSelect && additionalLanguageSubjects.includes(s.value));
                            if (selectedAdditionalLanguageInOtherRow) disableOption = true;
                        }
                    } else if (isThirdRow) {
                        const isCurrentSubjectMath = mathSubjects.includes(subject);
                        if (isCurrentSubjectMath && currentSelectedValue !== subject && actualMathSelected) {
                            const selectedMathInOtherRow = Array.from(allSubjectSelects).some(s => s !== currentSelect && mathSubjects.includes(s.value));
                            if (selectedMathInOtherRow) disableOption = true;
                        }
                    }
                }

                option.disabled = disableOption;

                if (subject === currentSelectedValue) {
                    option.selected = true;
                    option.disabled = false;
                }
                currentSelect.appendChild(option);
            });
        });

        const subjectRows = subjectsContainer.querySelectorAll('.subject-row');
        const currentSelectionsForValidation = Array.from(subjectsContainer.querySelectorAll('.subject-select'))
                                                .map(select => select.value)
                                                .filter(val => val !== '');

        let hasOneHomeLanguage = currentSelectionsForValidation.some(sub => homeLanguageSubjects.includes(sub));
        let hasOneAdditionalLanguage = currentSelectionsForValidation.some(sub => additionalLanguageSubjects.includes(sub));
        let hasOneMath = currentSelectionsForValidation.some(sub => mathSubjects.includes(sub));
        let allRequiredSubjectsSelected = hasOneHomeLanguage && hasOneAdditionalLanguage && hasOneMath;

        subjectRows.forEach((row, index) => {
            const removeButton = row.querySelector('.delete-btn');
            const subjectSelect = row.querySelector('.subject-select');
            const selectedValue = subjectSelect.value;

            const isThisRowHomeLanguage = homeLanguageSubjects.includes(selectedValue);
            const isThisRowAdditionalLanguage = additionalLanguageSubjects.includes(selectedValue);
            const isThisRowMath = mathSubjects.includes(selectedValue);

            let shouldDisableRemove = false;

            if (isThisRowHomeLanguage && currentSelectionsForValidation.filter(s => homeLanguageSubjects.includes(s)).length === 1) {
                shouldDisableRemove = true;
            }
            if (isThisRowAdditionalLanguage && currentSelectionsForValidation.filter(s => additionalLanguageSubjects.includes(s)).length === 1) {
                shouldDisableRemove = true;
            }
            if (isThisRowMath && currentSelectionsForValidation.filter(s => mathSubjects.includes(s)).length === 1) {
                shouldDisableRemove = true;
            }

            removeButton.disabled = shouldDisableRemove;
        });

        const lastSubjectSelect = subjectsContainer.querySelector('.subject-row:last-child .subject-select');
        const lastLevelSelect = subjectsContainer.querySelector('.subject-row:last-child .level-select');
        const lastRowComplete = (lastSubjectSelect && lastSubjectSelect.value !== '' && lastLevelSelect && lastLevelSelect.value !== '');

        const maxSubjects = 10;
        const currentNumberOfRows = subjectsContainer.children.length;

        // Enable add button if last row is complete and less than max subjects
        addSubjectBtn.disabled = !(lastRowComplete && currentNumberOfRows < maxSubjects);
    }

    function calculateTotalApsScore() {
        let total = 0;
        document.querySelectorAll('.points-display').forEach(pointsElement => {
            total += parseInt(pointsElement.textContent || '0');
        });
        totalApsScoreSpan.textContent = total;
        return total;
    }

    function createSubjectRow() {
        rowCount++;
        const rowId = `subject-row-${rowCount}`;

        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'subject-row', 'g-2');
        rowDiv.id = rowId;

        const currentRowsInDOM = subjectsContainer.children.length;
        if (currentRowsInDOM === 0) rowDiv.classList.add('home-language-row');
        if (currentRowsInDOM === 1) rowDiv.classList.add('additional-language-row');
        if (currentRowsInDOM === 2) rowDiv.classList.add('math-row');

        let levelOptions = '<option value="" disabled selected>Select a Level</option>';
        for (let i = 7; i >= 1; i--) {
            levelOptions += `<option value="Level ${i}">Level ${i}</option>`;
        }

        rowDiv.innerHTML = `
            <div class="col-md-4 col-12">
                <select class="form-select subject-select" aria-label="Subject select">
                    <option value="" disabled selected>Select a subject</option>
                </select>
            </div>
            <div class="col-md-3 col-12">
                <select class="form-select level-select" aria-label="Level select">
                    ${levelOptions}
                </select>
            </div>
            <div class="col-md-2 col-6 d-flex justify-content-center align-items-center">
                <div class="points-display" data-row-id="${rowId}">0</div>
            </div>
            <div class="col-md-1 col-6 d-flex justify-content-end align-items-center">
                <button type="button" class="delete-btn" aria-label="Delete subject">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        subjectsContainer.appendChild(rowDiv);

        const subjectSelect = rowDiv.querySelector('.subject-select');
        const levelSelect = rowDiv.querySelector('.level-select');
        const pointsDisplay = rowDiv.querySelector('.points-display');
        const deleteButton = rowDiv.querySelector('.delete-btn');

        function updateRowPoints() {
            const selectedSubject = subjectSelect.value;
            const selectedLevel = levelSelect.value;

            if (selectedSubject === '' || selectedLevel === '') {
                pointsDisplay.textContent = 0;
            } else {
                pointsDisplay.textContent = levelPoints[selectedLevel] !== undefined ? levelPoints[selectedLevel] : 0;
            }
            calculateTotalApsScore();
            updateAllSubjectDropdowns();
            duplicateSubjectError.style.display = 'none';
        }

        subjectSelect.addEventListener('change', (event) => {
            const newlySelectedSubject = event.target.value;
            const selectedSubjectsExcludingCurrent = getSelectedSubjects(subjectSelect);

            if (newlySelectedSubject !== '' && selectedSubjectsExcludingCurrent.has(newlySelectedSubject)) {
                duplicateSubjectError.style.display = 'block';
                subjectSelect.value = '';
            } else {
                duplicateSubjectError.style.display = 'none';
            }
            updateRowPoints();
        });

        levelSelect.addEventListener('change', updateRowPoints);

        deleteButton.addEventListener('click', () => {
            rowDiv.remove();
            calculateTotalApsScore();
            updateAllSubjectDropdowns();
            duplicateSubjectError.style.display = 'none';
        });

        updateAllSubjectDropdowns();
        updateRowPoints();
    }

    function getPerformanceLevel(apsScore) {
        if (apsScore >= 35) return 'Excellent';
        if (apsScore >= 30) return 'Very Good';
        if (apsScore >= 25) return 'Good';
        if (apsScore >= 20) return 'Average';
        return 'Below Average';
    }

    function renderUniversityCards(universitiesToRender, container, matchTypeClass) {
        container.innerHTML = '';
        if (universitiesToRender.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">No universities found in this category.</p>';
            return;
        }

        universitiesToRender.forEach(uni => {
            const card = document.createElement('div');
            card.classList.add('university-card', `match-${matchTypeClass}`);
            const apsDifference = calculateTotalApsScore() - uni.minAPS;
            const apsDiffText = apsDifference >= 0 ? `+${apsDifference} above minimum` : `${apsDifference} below minimum`;
            const apsDiffClass = apsDifference >= 0 ? 'text-success' : 'text-danger';

            card.innerHTML = `
                <div class="card-header">
                    <span class="ranking"><i class="fas fa-star"></i> Ranking #${uni.ranking}</span>
                    <span class="match-badge">${matchTypeClass === 'perfect' ? 'Perfect Match' : (matchTypeClass === 'good' ? 'Good Match' : 'Other')}</span>
                </div>
                <h4>${uni.name}</h4>
                <div class="location"><i class="fas fa-map-marker-alt"></i> ${uni.location}</div>
                <p class="description">${uni.description}</p>
                <div class="aps-info">
                    <i class="fas fa-graduation-cap"></i> Minimum APS: <span class="aps-value">${uni.minAPS}</span>
                    <span class="aps-difference ${apsDiffClass}">${apsDiffText}</span>
                </div>
                <div class="subject-info">
                    <i class="fas fa-book"></i> Required Subjects: ${uni.requiredSubjects.join(', ')}
                </div>
                <div class="program-info">
                    <i class="fas fa-flask"></i> Popular Programs:
                    <div class="programs-list ms-2">
                        ${uni.popularPrograms.map(p => `<span>${p}</span>`).join('')}
                        ${uni.popularPrograms.length > 2 ? `<span>+${uni.popularPrograms.length - 2} more</span>` : ''}
                    </div>
                </div>
                <button class="btn btn-primary learn-more-btn">Learn More</button>
            `;
            container.appendChild(card);
        });
    }

    function hideAllPages() {
        formPage.style.display = 'none';
        recommendationsPage.style.display = 'none';
        improveGradesPage.style.display = 'none';
        applicationChecklistPage.style.display = 'none';
        faqsPage.style.display = 'none';
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    }

    function showPage(pageToShow, activeNavLink) {
        hideAllPages();
        pageToShow.style.display = 'block';
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    }

    // Initial Setup
    hideAllPages();
    formPage.style.display = 'block';
    navCalculator.classList.add('active');

    // Create initial subject row
    createSubjectRow();
    updateAllSubjectDropdowns();

    // Event Listeners
    addSubjectBtn.addEventListener('click', createSubjectRow);

    recommendationsBtn.addEventListener('click', () => {
        const subjectRows = subjectsContainer.querySelectorAll('.subject-row');
        let completeSubjectsCount = 0;
        const currentSelectedSubjects = new Set();
        let homeLanguageCount = 0;
        let additionalLanguageCount = 0;
        let mathSubjectCount = 0;
        let validationErrors = [];

        subjectRows.forEach(row => {
            const subjectSelect = row.querySelector('.subject-select');
            const levelSelect = row.querySelector('.level-select');
            if (subjectSelect.value !== '' && levelSelect.value !== '') {
                completeSubjectsCount++;
                const selectedSubject = subjectSelect.value;
                currentSelectedSubjects.add(selectedSubject);

                if (homeLanguageSubjects.includes(selectedSubject)) {
                    homeLanguageCount++;
                } else if (additionalLanguageSubjects.includes(selectedSubject)) {
                    additionalLanguageCount++;
                }

                if (mathSubjects.includes(selectedSubject)) {
                    mathSubjectCount++;
                }
            }
        });

        if (completeSubjectsCount < 7) {
            validationErrors.push('Please select at least 7 subjects with their levels.');
        }
        if (homeLanguageCount === 0) {
            validationErrors.push('You must select exactly one Home Language.');
        } else if (homeLanguageCount > 1) {
            validationErrors.push('You can only select one Home Language.');
        }
        if (additionalLanguageCount === 0) {
            validationErrors.push('You must select exactly one First Additional Language.');
        } else if (additionalLanguageCount > 1) {
            validationErrors.push('You can only select one First Additional Language.');
        }
        if (mathSubjectCount === 0) {
            validationErrors.push('You must select either Mathematics, Mathematical Literacy, or Technical Mathematics.');
        } else if (mathSubjectCount > 1) {
            validationErrors.push('You can only select one type of Mathematics subject.');
        }

        if (validationErrors.length > 0) {
            recommendationsErrorMessage.innerHTML = validationErrors.map(err => `<div><i class="fas fa-exclamation-circle me-2"></i>${err}</div>`).join('');
            recommendationsErrorMessage.style.display = 'block';
            formPage.scrollIntoView({ behavior: 'smooth' });
        } else {
            recommendationsErrorMessage.style.display = 'none';

            const totalAPS = calculateTotalApsScore();
            const performanceLevel = getPerformanceLevel(totalAPS);

            if (performanceLevel === 'Below Average') {
                summaryApsScoreImprove.textContent = totalAPS;
                summarySubjectsEnteredImprove.textContent = completeSubjectsCount;
                summaryPerformanceLevelImprove.textContent = performanceLevel;

                summaryApsScoreImprove.classList.add('text-danger');
                summarySubjectsEnteredImprove.classList.add('text-danger');
                summaryPerformanceLevelImprove.classList.add('text-danger');

                showPage(improveGradesPage, navImproveGrades);
                return;
            }

            summaryApsScore.textContent = totalAPS;
            summaryPerformanceLevel.textContent = performanceLevel;

            summaryPerformanceLevel.classList.remove(
                'performance-excellent',
                'performance-very-good',
                'performance-good',
                'performance-average',
                'performance-below-average',
                'text-danger'
            );

            if (performanceLevel === 'Excellent') {
                summaryPerformanceLevel.classList.add('performance-excellent');
            } else if (performanceLevel === 'Very Good') {
                summaryPerformanceLevel.classList.add('performance-very-good');
            } else if (performanceLevel === 'Good') {
                summaryPerformanceLevel.classList.add('performance-good');
            } else if (performanceLevel === 'Average') {
                summaryPerformanceLevel.classList.add('performance-average');
            }

            summarySubjectsEntered.textContent = completeSubjectsCount;


            const perfectMatches = [];
            const goodMatches = [];
            const otherMatches = [];

            universities.forEach(uni => {
                // Find selected subjects and their levels for this university
                const selectedSubjectsWithLevels = [];
                subjectRows.forEach(row => {
                    const subjectSelect = row.querySelector('.subject-select');
                    const levelSelect = row.querySelector('.level-select');
                    if (subjectSelect.value !== '' && levelSelect.value !== '') {
                        selectedSubjectsWithLevels.push({
                            subject: subjectSelect.value,
                            level: levelSelect.value
                        });
                    }
                });

                // Count how many selected subjects match the university's required subjects and have level >= 5
                let matchCount = 0;
                selectedSubjectsWithLevels.forEach(sel => {
                    if (uni.requiredSubjects.includes(sel.subject)) {
                        const levelNum = parseInt(sel.level.replace('Level ', ''));
                        if (levelNum >= 5) {
                            matchCount++;
                        }
                    }
                });

                // For all universities, require at least 3 required subjects at level 5+
                let isPerfectMatch = matchCount >= 3;

                const apsDifference = totalAPS - uni.minAPS;

                if (isPerfectMatch) {
                    if (apsDifference >= 5) {
                        perfectMatches.push(uni);
                    } else if (apsDifference >= 0) {
                        goodMatches.push(uni);
                    } else if (apsDifference >= -5) {
                        otherMatches.push(uni);
                    }
                } else if (matchCount > 0) {
                    if (apsDifference >= 5) {
                        goodMatches.push(uni);
                    } else if (apsDifference >= 0) {
                        otherMatches.push(uni);
                    }
                } else if (apsDifference >= 10) {
                    otherMatches.push(uni);
                }
            });

            perfectMatches.sort((a, b) => a.ranking - b.ranking);
            goodMatches.sort((a, b) => a.ranking - b.ranking);
            otherMatches.sort((a, b) => a.ranking - b.ranking);

            renderUniversityCards(perfectMatches, perfectMatchesContainer, 'perfect');
            renderUniversityCards(goodMatches, goodMatchesContainer, 'good');
            renderUniversityCards(otherMatches, otherMatchesContainer, 'other');

            perfectMatchesCount.textContent = `${perfectMatches.length} universities`;
            goodMatchesCount.textContent = `${goodMatches.length} universities`;
            otherMatchesCount.textContent = `${otherMatches.length} universities`;

            showPage(recommendationsPage, navRecommendations);
        }
    });

    // Navigation Event Listeners
    [backToFormBtnRecs, backToFormBtnImprove, backToFormBtnChecklist, backToFormBtnFaqs].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                showPage(formPage, navCalculator);
            });
        }
    });

    navCalculator.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(formPage, navCalculator);
    });

    navRecommendations.addEventListener('click', (e) => {
        e.preventDefault();
        recommendationsBtn.click();
    });

    navApplicationChecklist.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(applicationChecklistPage, navApplicationChecklist);
    });

navFaqs.addEventListener('click', (e) => {
    e.preventDefault();
    // Render new FAQ content dynamically
    faqsPage.innerHTML = [
        '<div class="faq-hero">',
        '  <i class="fas fa-graduation-cap fa-2x" style="color:var(--primary);"></i>',
        '  <h1>Frequently Asked Questions</h1>',
        '  <p>Find answers to common questions about university admissions, APS scores, and using this tool.</p>',
        '</div>',
        '<div class="faq-list">',
        '  <div class="faq-item">',
        '    <div class="faq-question"><span><i class="fas fa-question-circle me-2"></i>What is an APS score?</span><i class="fas fa-chevron-down"></i></div>',
        '    <div class="faq-answer"><i class="fas fa-info-circle me-2"></i>The Admission Point Score (APS) is a system used by South African universities to evaluate applicants. Your matric subject results are converted into points, and the total points determine your APS score. Each university and program will have a minimum APS requirement.</div>',
        '  </div>',
        '  <div class="faq-item">',
        '    <div class="faq-question"><span><i class="fas fa-calculator me-2"></i>How is my APS score calculated?</span><i class="fas fa-chevron-down"></i></div>',
        '    <div class="faq-answer"><i class="fas fa-equals me-2"></i>APS is calculated by assigning points to your matric subject levels (e.g., Level 7 = 7 points, Level 6 = 6 points, etc.). The total points from your best 6 or 7 subjects (excluding Life Orientation) are summed up to give your final APS. Specific calculations may vary per university.</div>',
        '  </div>',
        '  <div class="faq-item">',
        '    <div class="faq-question"><span><i class="fas fa-exclamation-triangle me-2"></i>What if my APS score is too low for my desired course?</span><i class="fas fa-chevron-down"></i></div>',
        '    <div class="faq-answer"><i class="fas fa-lightbulb me-2"></i>You can explore alternative options such as bridging courses, higher certificates, or diplomas. You may also rewrite certain matric subjects to improve your levels. This app provides study tips for improvement.</div>',
        '  </div>',
        '  <div class="faq-item">',
        '    <div class="faq-question"><span><i class="fas fa-calendar-alt me-2"></i>When should I apply to universities?</span><i class="fas fa-chevron-down"></i></div>',
        '    <div class="faq-answer"><i class="fas fa-clock me-2"></i>Application periods vary by university, but generally, applications open in April/May and close between June and September of the year preceding your desired enrollment. Always check specific deadlines for each institution and program.</div>',
        '  </div>',
        '  <div class="faq-item">',
        '    <div class="faq-question"><span><i class="fas fa-money-check-alt me-2"></i>Do I need to apply for financial aid separately?</span><i class="fas fa-chevron-down"></i></div>',
        '    <div class="faq-answer"><i class="fas fa-hand-holding-usd me-2"></i>Yes, financial aid (like NSFAS or university-specific bursaries) usually requires a separate application. Apply as early as possible, often concurrently with your university application.</div>',
        '  </div>',
        '  <div class="faq-item">',
        '    <div class="faq-question"><span><i class="fas fa-laptop-code me-2"></i>How do I use this tool?</span><i class="fas fa-chevron-down"></i></div>',
        '    <div class="faq-answer"><i class="fas fa-mouse-pointer me-2"></i>Enter your subjects and levels, then click "Get Recommendations" to see which universities you qualify for. The tool will also suggest ways to improve your APS score.</div>',
        '  </div>',
        '  <div class="faq-item">',
        '    <div class="faq-question"><span><i class="fas fa-user-graduate me-2"></i>What are popular programs at South African universities?</span><i class="fas fa-chevron-down"></i></div>',
        '    <div class="faq-answer"><i class="fas fa-university me-2"></i>Popular programs include Engineering, Medicine, Law, Commerce, Education, and Health Sciences. Each university has its own strengths and specialties.</div>',
        '  </div>',
        '  <div class="faq-item">',
        '    <div class="faq-question"><span><i class="fas fa-envelope-open-text me-2"></i>Who can I contact for more help?</span><i class="fas fa-chevron-down"></i></div>',
        '    <div class="faq-answer"><i class="fas fa-envelope me-2"></i>Contact the admissions office of your chosen university, or reach out to us via the contact form on the main page.</div>',
        '  </div>',
        '</div>'
    ].join('');
    showPage(faqsPage, navFaqs);
    // FAQ accordion logic
    faqsPage.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('show');
            faqsPage.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show'));
            faqsPage.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            if (!isOpen) {
                answer.classList.add('show');
                this.classList.add('active');
            }
        });
    });
    faqsPage.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('show');
            faqsPage.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show'));
            faqsPage.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            if (!isOpen) {
                answer.classList.add('show');
                this.classList.add('active');
            }
        });
    });
});

    if (navImproveGrades) {
        navImproveGrades.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(improveGradesPage, navImproveGrades);
        });
    }
});