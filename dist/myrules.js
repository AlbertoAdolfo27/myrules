/*
 * Created by Alberto on 31/08/2018.
 * MY RULES VALIDATION V2 UPDATED JULY/2019
 */
/*
 ATENÇÃO: Informação dos diretos autorais!!
 * My Rules Validation é propriedade de Alberto Jordane Adolfo.
 * Qualquer parte deste código pode ser usado, copiado, redistribuido ou produzido.
 * Para contribuir no projecto, em breve o código-fonte estará no repositório GIT HUB (https://github.com/albertoadolfo27).
 * 15/JULY/2019
 */


if (window.addEventListener)
{
    window.addEventListener('load', mrWindowLoad);
} else
{
    window.attachEvent('onload', mrWindowLoad);
}

function mrWindowLoad()
{
    mrResetForm();  //HIDE THE FEEDBACKS
    var mrForms = document.forms;   //GET THE FORMS ELEMENTS

    for(mrForm of mrForms)
    {
        //GET ALL ELEMENTS AND FEEDBACKS
        var mrElements = mrForm.querySelectorAll(".mr");
        var mrFeedbacks = mrForm.querySelectorAll(".mr-feedback");

        mrForm.setAttribute("novalidate","");

        if(mrElements.length == mrFeedbacks.length)
        {
            //EVENT HANDLER  TO VALIDATE
            for(mrElement of mrElements)
            {
                mrElement.onchange = function()
                {
                    mrValidateElement(this);
                }

                if(mrForm.classList.contains("mr-oninput"))
                {
                    mrElement.oninput = function()
                    {
                        mrValidateElement(this);
                    }
                }
            }

            mrForm.onsubmit = function (event)
            {
                if(!mrValidateForm(this))
                {
                    event.preventDefault();
                }
            }

            mrForm.onreset = function ()
            {
                mrResetForm(this);
            }
        }   else
        {
            console.error("MY RULES ERROR:\n" + "- The number of class .mr and number of class .mr-feedback is not iqual in form: ");
            console.error(mrForm);
        }
    }

    function mrResetForm(form = null)
    {
        var mrArrayFeedbacks = [];
        if (form == null)
        {
            //GET ALL FEEDBACKS COLLECTIONS OF DOCUMENT AND ADD IN AN ARRAY OF FEEDBACKS
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-feedback"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-required-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-max-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-min-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-maxlength-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-pattern-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-minlength-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-step-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-match-subject-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-password-good-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-password-strong-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-password-very-strong-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-username-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-alpha-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-alpha-space-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-alpha-numeric-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-alpha-numeric-space-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-latin-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-latin-space-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-latin-numeric-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-latin-numeric-space-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-number-int-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-numeric-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-maxselect-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-minselect-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-maxcheck-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-mincheck-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-valid-fb"));
            mrArrayFeedbacks.push(document.querySelectorAll(".mr-invalid-fb"));
        }   else
        {
            //GET ALL FEEDBACKS COLLECTIONS OF FORM AND ADD IN AN ARRAY OF FEEDBACKS
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-feedback"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-required-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-max-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-min-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-maxlength-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-pattern-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-minlength-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-step-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-match-subject-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-password-good-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-password-strong-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-password-very-strong-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-username-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-alpha-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-alpha-space-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-alpha-numeric-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-alpha-numeric-space-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-latin-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-latin-space-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-latin-numeric-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-latin-numeric-space-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-number-int-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-numeric-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-maxselect-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-minselect-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-maxcheck-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-mincheck-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-valid-fb"));
            mrArrayFeedbacks.push(form.querySelectorAll(".mr-invalid-fb"));

            var mrArrayElements = [];

            //GET ALL FORM ELEMENTS AND ADD IN ARRAY OF ELEMENTS
            mrElements = form.querySelectorAll(".mr");
            for(mrElement of mrElements)
            {
                if(mrElement.classList.contains("mr-checkbox") || mrElement.classList.contains("mr-radio"))
                {
                    var mrCheckBoxs = [];
                    var mrRadios = [];

                    if(mrElement.classList.contains("mr-checkbox"))
                    {
                        mrCheckBoxs = mrElement.querySelectorAll("input[type=checkbox]");
                    }   else
                    {
                        mrRadios = mrElement.querySelectorAll("input[type=radio]");
                    }

                    for (mrCheckBox of mrCheckBoxs)
                    {
                        mrArrayElements.push(mrCheckBox);
                    }

                    for(mrRadio of mrRadios)
                    {
                        mrArrayElements.push(mrRadio);
                    }
                }   else
                {
                    mrArrayElements.push(mrElement);
                }
            }

            //RESET THE CSS STYLE OF FORM ELEMENTS
            for(mrElement of mrArrayElements)
            {
                mrElement.style.borderColor = "";
                mrElement.style.boxShadow = "";
                mrElement.style.backgroundColor = "";
            }
        }

        //NON DISPLAY THE FEEDBACKS
        for(arrayFeedback of mrArrayFeedbacks)
        {
            for(feedback of arrayFeedback)
            {
                feedback.style.display = "none";
            }
        }
    }
}

//FUNCTION TO VALIDATE THE FORM
function mrValidateForm(mrForm)
{
    var mrElements = mrForm.querySelectorAll(".mr");
    var mrIsValidForm = true;

    for(mrElement of mrElements)
    {
        if(!mrValidateElement(mrElement))
        {
            mrIsValidForm = false;
        }
    }
    return mrIsValidForm;
}

//FUNCTION TO VALIDATE THE ELEMENT
function mrValidateElement(mrElement)
{
    var mrIsvalidElement = true;

    var mrForm;
    if(mrElement.form != undefined)
    {
        mrForm = mrElement.form;
    }   else
    {
        mrForm = mrGetForm(mrElement);
    }

    //GET .mr-feedback OF ELEMENT
    var mrElements = mrForm.querySelectorAll(".mr");
    var mrArrayElements = [];

    for(element of mrElements)
    {
        mrArrayElements.push(element);
    }
    var mrIndexOfElement = mrArrayElements.indexOf(mrElement);
    var mrFeedback = mrForm.querySelectorAll(".mr-feedback")[mrIndexOfElement];
    //END OF GET mr-feedback OF ELEMENT

    //GET FEEDBACK MESSAGE .mr-valid-fb OF ELEMENT
    var mrValid;
    if(mrFeedback.classList.contains("mr-valid-fb"))
    {
        mrValid = mrFeedback;
    }   else
    {
        mrValid = mrFeedback.querySelector(".mr-valid-fb");
    }
    //END OF GET FEEDBACK MESSAGE .mr-valid-fb OF ELEMENT

    //GET FEEDBACK MESSAGE .mr-invalid-fb OF ELEMENT
    var mrInvalid;
    if(mrFeedback.classList.contains("mr-invalid-fb"))
    {
        mrInvalid = mrFeedback;
    }   else
    {
        mrInvalid = mrFeedback.querySelector(".mr-invalid-fb");
    }
    //END OF GET FEEDBACK MESSAGE .mr-invalid-fb OF ELEMENT

    //CUSTOM .mr-valid-fb AND .mr-invalid-fb IF THE FORM CONTAIN .mr-colors CLASS
    if(mrForm.classList.contains("mr-colors"))
    {
        if(mrValid != null)
        {
            mrValid.style.color = "rgb(22, 160, 133)";
        }
        if(mrInvalid != null)
        {
            mrInvalid.style.color = "rgb(225, 104, 104)";
        }
    }

    //START ELEMENT VALIDATION

    //VALIDATE IF THE ELEMENT HAS NO VALUE
    if(mrHasClass(mrElement,"mr-required") || mrHasAttribute(mrElement,"required"))
    {

        var mrElementValueIsEmpty = false;
        var mrIsValueMissing = false;

        if(mrElement.tagName == "SELECT")
        {
            if(mrElement.selectedOptions.length < 1)
            {
                mrElementValueIsEmpty = true;
            }
        }   else if(mrElement.classList.contains("mr-checkbox") || mrElement.classList.contains("mr-radio"))
        {
            var mrElementValueIsEmpty = true;
            var mrCheckElements;

            if(mrElement.classList.contains("mr-checkbox"))
            {
                mrCheckElements = mrElement.querySelectorAll("input[type=checkbox]");
            }   else
            {
                mrCheckElements = mrElement.querySelectorAll("input[type=radio]");
            }

            for (mrCheckElement of mrCheckElements)
            {
                if(mrCheckElement.checked)
                {
                    mrElementValueIsEmpty = false;
                }
            }
        }   else
        {
            mrElementValueIsEmpty = mrIsEmptyElementValue(mrElement);
            mrIsValueMissing = mrElement.validity.valueMissing;
        }

        if(mrElementValueIsEmpty || mrIsValueMissing)
        {
            mrInvalidElement("mr-required-fb");
        }   else
        {
            mrValidElement("mr-required-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS GREATER THAN ITS MAX ATTRIBUTE
    if(mrHasAttribute(mrElement,"max"))
    {
        if(!mrIsEmptyElementValue(mrElement))
        {
            if (mrHasInputType(mrElement, "date"))  //IF THE INPUT TYPE IS DATE
            {
                var mrMaxDate = mrElement.getAttribute("max");
                if(mrElement.getAttribute("max") == "today")
                {
                    mrMaxDate = mrGetDateString();
                }

                if(mrIsValidFullDate(mrMaxDate))
                {
                    if(mrIsValidFullDate(mrElement.value))
                    {
                        if(mrCompareDates(mrElement.value,mrMaxDate,1))
                        {
                            mrInvalidElement("mr-max-fb");
                        }   else
                        {
                            mrValidElement("mr-max-fb");
                        }
                    }   else
                    {
                        mrInvalidElement("mr-max-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The max attributte of element:");
                    console.error(mrElement);
                    console.error("is not a valid full date");
                    mrInvalidElement("mr-max-fb");
                }
            }
            else if(!isNaN(mrElement.getAttribute("max")))
            {
                if((mrCompareElemValueAttrValue(mrElement,"max",1) || mrElement.validity.rangeUnderflow))
                {
                    mrInvalidElement("mr-max-fb");
                }   else
                {
                    mrValidElement("mr-max-fb");
                }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The max attributte of element:");
                console.error(mrElement);
                console.error("is not a valid number");
                mrInvalidElement("mr-min-fb");
            }
        }   else
        {
            mrValidElement("mr-max-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS LESS THAN ITS MIN ATTRIBUTE
    if(mrHasAttribute(mrElement,"min")) {
        if(!mrIsEmptyElementValue(mrElement))
        {
            if (mrHasInputType(mrElement, "date"))  //IF INPUT TYPE IS DATE
            {
                var mrMinDate = mrElement.getAttribute("min");
                if(mrElement.getAttribute("min") == "today")
                {
                    mrMinDate = mrGetDateString();
                }

                if(mrIsValidFullDate(mrMinDate))
                {
                    if(mrIsValidFullDate(mrElement.value))
                    {
                        if(mrCompareDates(mrElement.value,mrMinDate,2))
                        {
                            mrInvalidElement("mr-min-fb");
                        }   else
                        {
                            mrValidElement("mr-min-fb");
                        }
                    }   else
                    {
                        mrInvalidElement("mr-min-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The min attributte of element:");
                    console.error(mrElement);
                    console.error("is not a valid full date");
                    mrInvalidElement("mr-min-fb");
                }
            }
            else if(!isNaN(mrElement.getAttribute("min")))
            {
                if((mrCompareElemValueAttrValue(mrElement,"min",2) || mrElement.validity.rangeUnderflow))
                {
                    mrInvalidElement("mr-min-fb");
                }   else
                {
                    mrValidElement("mr-min-fb");
                }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The min attributte of element:");
                console.error(mrElement);
                console.error("is not a valid number");
                mrInvalidElement("mr-min-fb");
            }
        }   else
        {
            mrValidElement("mr-min-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE EXCEEDS ITS MAXLENGTH ATTRIBUTE
    if(mrHasAttribute(mrElement,"maxlength"))
    {
        if ((mrCompareEleValueLength(mrElement, mrElement.getAttribute("maxlength"),1) || mrElement.validity.tooLong) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-maxlength-fb");
        }   else
        {
            mrValidElement("mr-maxlength-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS LESS THAN ITS MAXLENGTH ATTRIBUTE
    if(mrHasAttribute(mrElement,"minlength"))
    {
        if ((mrCompareEleValueLength(mrElement, mrElement.getAttribute("minlength"),2) || mrElement.validity.tooShort) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-minlength-fb");
        }   else
        {
            mrValidElement("mr-minlength-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE DOES NOT MATCH ITS PATTERN ATTRIBUTE
    if(mrHasAttribute(mrElement,"pattern"))
    {
        var pattern = mrElement.getAttribute("pattern");
        var regularExpression = new RegExp(pattern);

        if ((!regularExpression.test(mrElement.value) || mrElement.validity.patternMismatch) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-pattern-fb");
        }   else
        {
            mrValidElement("mr-pattern-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS NOT A VALID EMAIL
    if(mrHasClass(mrElement,"mr-email") || mrElement.getAttribute("type")=="email")
    {
        var mrEmailRegularExpression = /(^[A-Za-z]((([A-Za-z0-9]([-_.]))*)+([A-Za-z0-9]))*)+([A-Za-z0-9]*)+@+(([A-Za-z0-9]{2,})+([.]))+([A-Za-z]{2,}$)/;

        if(!mrEmailRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-email-fb");
        }   else
        {
            mrValidElement("mr-email-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS INVALID PER ITS STEP ATTRIBUTE
    if(mrHasAttribute(mrElement,"step"))
    {
        var mrStep = mrElement.getAttribute("step");
        var mrIsvalidStep;

        if(!isNaN(mrStep))
        {
            if(!isNaN(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                if(mrElement.value % Number(mrStep) == 0 || mrElement.validity.stepMismatch)
                {
                    mrIsvalidStep = true;
                }   else
                {
                    mrIsvalidStep = false;
                }

                if(!mrIsvalidStep)
                {
                    mrInvalidElement("mr-step-fb");
                }   else
                {
                    mrValidElement("mr-step-fb");
                }
            }
        }   else
        {
            console.error("MY RULES ERROR:\n" + "- The value of step attributte of element:");
            console.error(mrElement);
            console.error("is not a valid number");
            mrInvalidElement("mr-step-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS INVALID PASSWORD-GOOD (LOWERCASE OR/AND UPPERCASE AND NUMBER OR/AND SPECIAL CHAR)
    if(mrHasClass(mrElement,"mr-password-good"))
    {
        var mrPasswordGoodRegularExpression = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Za-z]).*$/;
        var mrIsValidPasswordMinlength = true;

        //CHANGE THE REGULAR EXPRESSION IF THE ELEMENT HAVE ATTRIBUTE password-minlength
        if (mrHasAttribute(mrElement,"password-minlength"))
        {
            if(mrElement.getAttribute("password-minlength") != "" && mrElement.getAttribute("password-minlength") != null && !Number.isInteger(mrElement.getAttribute("password-minlength")))
            {
                var mrPasswordGoodPattern = "(?=^.{" + mrElement.getAttribute("password-minlength") + ",}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Za-z]).*$";
                mrPasswordGoodRegularExpression = new RegExp(mrPasswordGoodPattern);
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The value of password-minlength attributte of element:");
                console.error(mrElement);
                console.error("is non a number");
                mrIsValidPasswordMinlength = false;
            }
        }

        if(mrIsValidPasswordMinlength)
        {
            if (!mrPasswordGoodRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-password-good-fb");
            }   else
            {
                mrValidElement("mr-password-good-fb");
            }
        }   else
        {
            mrInvalidElement("mr-password-good-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS INVALID PASSWORD-STRONG (LOWERCASE, UPPERCASE AND NUMBER OR/AND SPECIAL CHAR)
    if(mrHasClass(mrElement,"mr-password-strong"))
    {
        var mrPasswordStrongRegularExpression = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        var mrIsValidPasswordMinlength = true;

        //CHANGE THE REGULAR EXPRESSION IF THE ELEMENT HAVE ATTRIBUTE password-minlength
        if (mrHasAttribute(mrElement,"password-minlength"))
        {
            if(mrElement.getAttribute("password-minlength") != "" && mrElement.getAttribute("password-minlength") != null && !Number.isInteger(mrElement.getAttribute("password-minlength")))
            {
                var mrPasswordStrongPattern = "(?=^.{" + mrElement.getAttribute("password-minlength") + ",}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";
                mrPasswordStrongRegularExpression = new RegExp(mrPasswordStrongPattern);
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The value of password-minlength attributte of element:");
                console.error(mrElement);
                console.error("is non a number");
                mrIsValidPasswordMinlength = false;
            }
        }

        if(mrIsValidPasswordMinlength)
        {
            if (!mrPasswordStrongRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-password-strong-fb");
            }   else
            {
                mrValidElement("mr-password-strong-fb");
            }
        }   else
        {
            mrInvalidElement("mr-password-strong-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS INVALID PASSWORD-VERY-STRONG (ALPHA LOWERCASE, ALPHA UPPERCASE, NUMBER AND SPECIAL CHAR)
    if(mrHasClass(mrElement,"mr-password-very-strong"))
    {
        var mrPasswordVeryStrongRegularExpression = /((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        var mrIsValidPasswordMinlength = true;

        //CHANGE THE REGULAR EXPRESSION IF THE ELEMENT HAVE ATTRIBUTE password-minlength
        if (mrHasAttribute(mrElement,"password-minlength"))
        {
            if(mrElement.getAttribute("password-minlength") != "" && mrElement.getAttribute("password-minlength") != null && !Number.isInteger(mrElement.getAttribute("password-minlength")))
            {
                var mrPasswordVeryStrongPattern = "(?=^.{" + mrElement.getAttribute("password-minlength") + ",}$)((?=.*\\d)(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";
                mrPasswordVeryStrongRegularExpression = new RegExp(mrPasswordVeryStrongPattern);
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The value of password-minlength attributte of element:");
                console.error(mrElement);
                console.error("is not a valid number");
                mrIsValidPasswordMinlength = false;
            }
        }

        if(mrIsValidPasswordMinlength)
        {
            if (!mrPasswordVeryStrongRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-password-very-strong-fb");
            }   else
            {
                mrValidElement("mr-password-very-strong-fb");
            }
        }   else
        {
            mrInvalidElement("mr-password-very-strong-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE MARTCHES THE OTHER ELEMENT'S VALUE
    if(mrHasClass(mrElement,"mr-match-subject"))
    {
        var mrMatches = mrForm.querySelectorAll(".mr-match");
        var mrMatchSubjects = mrForm.querySelectorAll(".mr-match-subject");

        if(mrMatches.length == mrMatchSubjects.length)
        {
            var mrArrayMatchSubjects = [];

            for(mrMatchSubject of mrMatchSubjects)
            {
                mrArrayMatchSubjects.push(mrMatchSubject);
            }
            var mrIndexOfMatchSubject = mrArrayMatchSubjects.indexOf(mrElement);
            var mrMatch = mrForm.querySelectorAll(".mr-match")[mrIndexOfMatchSubject];

            if(mrMatch.value != mrElement.value && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-match-subject-fb");
            }   else
            {
                mrValidElement("mr-match-subject-fb");
            }
        }   else
        {
            console.error("MY RULES ERROR:\n" + "- The number of class .mr-macth and number of class .mr-match-subject must be iqual in form: ");
            console.error(mrForm);
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID USERNAME (UPERCASE, LOWERCASE, NUMBER, DOT, MINUS, LOW LINE)
    if(mrHasClass(mrElement, "mr-username"))
    {
        var mrUsernameRegularExpression = /^[a-zA-Z](([a-zA-Z0-9-_\.])*[a-zA-Z0-9-_])$/
        if(!mrUsernameRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-username-fb");
        }   else
        {
            var mrDuplicatedDotRegularExpression = /\.\./;
            if(mrDuplicatedDotRegularExpression.test(mrElement.value))
            {
                mrInvalidElement("mr-username-fb");
            }   else
            {
                mrValidElement("mr-username-fb");
            }
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID ALPHA
    if(mrHasClass(mrElement,"mr-alpha"))
    {
        var mrAlphaRegularExpression = /^[a-zA-Z]+$/;
        if(!mrAlphaRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-alpha-fb");
        }   else
        {
            mrValidElement("mr-alpha-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID ALPHA-SPACE
    if(mrHasClass(mrElement,"mr-alpha-space"))
    {
        var mrAlphaRegularExpression = /^[a-zA-Z ]+$/;
        if(!mrAlphaRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-alpha-space-fb");
        }   else
        {
            mrValidElement("mr-alpha-space-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID ALPHA-NUMERIC
    if(mrHasClass(mrElement,"mr-alpha-numeric"))
    {
        var mrAlphaRegularExpression = /^[a-zA-Z0-9]+$/;
        if(!mrAlphaRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-alpha-numeric-fb");
        }   else
        {
            mrValidElement("mr-alpha-numeric-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID ALPHA-SPACE
    if(mrHasClass(mrElement,"mr-alpha-numeric-space")) {
        var mrAlphaRegularExpression = /^[a-zA-Z0-9 ]+$/;
        if (!mrAlphaRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement)) {
            mrInvalidElement("mr-alpha-numeric-space-fb");
        } else {
            mrValidElement("mr-alpha-numeric-space-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID LATIN
    if(mrHasClass(mrElement,"mr-latin"))
    {
        var mrAlphaRegularExpression = /^[a-zA-ZÀ-ÖØ-öø-ʯ]+$/;
        if(!mrAlphaRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-latin-fb");
        }   else
        {
            mrValidElement("mr-latin-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID LATIN-SPACE
    if(mrHasClass(mrElement,"mr-latin-space"))
    {
        var mrAlphaRegularExpression = /^[a-zA-ZÀ-ÖØ-öø-ʯ ]+$/;
        if(!mrAlphaRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-latin-space-fb");
        }   else
        {
            mrValidElement("mr-latin-space-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID LATIN-NUMERIC
    if(mrHasClass(mrElement,"mr-latin-numeric"))
    {
        var mrAlphaRegularExpression = /^[a-zA-ZÀ-ÖØ-öø-ʯ0-9]+$/;
        if(!mrAlphaRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-latin-numeric-fb");
        }   else
        {
            mrValidElement("mr-latin-numeric-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID LATIN-SPACE
    if(mrHasClass(mrElement,"mr-latin-numeric-space"))
    {
        var mrAlphaRegularExpression = /^[a-zA-ZÀ-ÖØ-öø-ʯ0-9 ]+$/;
        if (!mrAlphaRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
        {
            mrInvalidElement("mr-latin-numeric-space-fb");
        }   else
        {
            mrValidElement("mr-latin-numeric-space-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID INTEGER
    if(mrHasClass(mrElement,"mr-number-int"))
    {
        if(!mrIsEmptyElementValue(mrElement))
        {
            if(!isNaN(mrElement.value))
            {
                if(!Number.isInteger(Number(mrElement.value)))
                {
                    mrInvalidElement("mr-number-int-fb");
                }   else
                {
                    mrValidElement("mr-number-int-fb");
                }
            }   else
            {
                mrInvalidElement("mr-number-int-fb");
            }
        }   else
        {
            mrValidElement("mr-number-int-fb");
        }
    }

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID NUMERIC
    if(mrHasClass(mrElement,"mr-numeric") || mrHasInputType(mrElement,"number"))
    {
        if(!mrIsEmptyElementValue(mrElement))
        {
            if(isNaN(mrElement.value))
            {
                mrInvalidElement("mr-numeric-fb");
            }   else
            {
                mrValidElement("mr-numeric-fb");
            }
        }   else
        {
            mrValidElement("mr-numeric-fb");
        }
    }

    //VALIDATE THE MAX NUMBER OF SELECTED OPTIONS IN MULTIPLE SELECT
    if(mrHasAttribute(mrElement, "maxselect"))
    {
        if(mrElement.tagName == "SELECT")
        {
            if(!mrIsEmptyElementValue(mrElement))
            {
                if(mrIsNumberInt(mrElement.getAttribute("maxselect")))
                {
                    if(mrElement.selectedOptions.length > mrElement.getAttribute("maxselect"))
                    {
                        mrInvalidElement("mr-maxselect-fb");
                    }   else
                    {
                        mrValidElement("mr-maxselect-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The attribute maxselect's value is not a valid integer in element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-maxselect-fb");
                }
            }   else
            {
                mrValidElement("mr-maxselect-fb");
            }
        }   else
        {
            console.error("MY RULES ERROR:\n" + "- The attribute maxselect must be setted in multiple select element:");
            console.error(mrElement);
            mrInvalidElement("mr-maxselect-fb");
        }
    }


    //VALIDATE THE MIN NUMBER OF SELECTED OPTIONS IN MULTIPLE SELECT
    if(mrHasAttribute(mrElement, "minselect"))
    {
        if(mrElement.tagName == "SELECT")
        {
            if(mrIsNumberInt(mrElement.getAttribute("minselect")))
            {
                if(mrElement.selectedOptions.length < mrElement.getAttribute("minselect"))
                {
                    mrInvalidElement("mr-minselect-fb");
                }   else
                {
                    mrValidElement("mr-minselect-fb");
                }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The attribute minselect's value is not a valid integer in element:");
                console.error(mrElement);
                mrInvalidElement("mr-minselect-fb");
            }
        }   else
        {
            console.error("MY RULES ERROR:\n" + "- The attribute minselect must be setted in multiple select element:");
            console.error(mrElement);
            mrInvalidElement("mr-minselect-fb");
        }
    }

    //VALIDATE THE MAX NUMBER OF CHECKED CHECKBOX
    if(mrHasAttribute(mrElement,"maxcheck"))
    {
        if(mrElement.classList.contains("mr-checkbox"))
        {
            if(mrIsNumberInt(mrElement.getAttribute("maxcheck")))
            {
                var mrChecked = 0;
                var mrCheckboxs = mrElement.querySelectorAll("input[type=checkbox]");

                for (mrCheckbox of mrCheckboxs)
                {
                    if(mrCheckbox.checked)
                    {
                        mrChecked++;
                    }
                }

                if(mrChecked > mrElement.getAttribute("maxcheck"))
                {
                    mrInvalidElement("mr-maxcheck-fb");
                }   else
                {
                    mrValidElement("mr-maxcheck-fb");
                }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The attribute maxcheck's value is not a valid integer in element:");
                console.error(mrElement);
                mrInvalidElement("mr-maxcheck-fb");
            }
        }   else
        {
            console.error("MY RULES ERROR:\n" + "- The class .mr-checkbox is needed in element:");
            console.error(mrElement);
            mrInvalidElement("mr-maxcheck-fb");
        }
    }

    //VALIDATE THE MIN NUMBER OF CHECKED CHECKBOX
    if(mrHasAttribute(mrElement,"mincheck"))
    {
        if(mrElement.classList.contains("mr-checkbox"))
        {
            if(mrIsNumberInt(mrElement.getAttribute("mincheck")))
            {
                var mrChecked = 0;
                var mrCheckboxs = mrElement.querySelectorAll("input[type=checkbox]");

                for (mrCheckbox of mrCheckboxs)
                {
                    if(mrCheckbox.checked)
                    {
                        mrChecked++;
                    }
                }

                if(mrChecked < mrElement.getAttribute("mincheck"))
                {
                    mrInvalidElement("mr-mincheck-fb");
                }   else
                {
                    mrValidElement("mr-mincheck-fb");
                }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The attribute mincheck's value is not a valid integer in element:");
                console.error(mrElement);
                mrInvalidElement("mr-mincheck-fb");
            }
        }   else
        {
            console.error("MY RULES ERROR:\n" + "- The class .mr-checkbox is needed in element:");
            console.error(mrElement);
            mrInvalidElement("mr-mincheck-fb");
        }
    }
    //END OF ELEMENT VALIDATION

    //NON DISPLAY ELEMENT .mrFeedback IF THE ELEMENT HAS VALID
    if(mrIsvalidElement)
    {
        if(mrHasClass(mrFeedback,"mr-valid-fb") || mrHasClass(mrFeedback,"mr-invalid-fb"))
        {
            if (mrHasClass(mrFeedback,"mr-valid-fb"))
            {
                mrFeedback.style.display = "";
            }   else
            {
                mrFeedback.style.display = "none";
            }
        }   else
        {
            if(mrInvalid != null)
            {
                mrInvalid.style.display = "none";
            }
            if(mrValid != null)
            {
                mrValid.style.display = "";
                mrFeedback.style.display = "";
            }   else
            {
                mrFeedback.style.display = "none";
            }
        }

    }   else //DISPLAY ELEMENT mrFeedback IF THE ELEMENT HAS INVALID
    {
        if(mrHasClass(mrFeedback,"mr-valid-fb") || mrHasClass(mrFeedback,"mr-invalid-fb"))
        {
            if(mrHasClass(mrFeedback,"mr-invalid-fb"))
            {
                mrFeedback.style.display = "";
            }   else
            {
                mrFeedback.style.display = "none";
            }
        }   else
        {
            if(mrValid != null)
            {
                mrValid.style.display = "none";
            }
            if(mrInvalid != null)
            {
                mrInvalid.style.display = "";
            }
        }
    }

    //RETURN ELEMENT VALIDATION STATUS
    return mrIsvalidElement;

    //NORMALIZE ELEMENT WHEN ITS VALID
    function mrValidElement(feedbackClass)
    {
        mrAddClass(mrElement,"mr-valid");
        mrRemoveClass(mrElement,"mr-invalid");

        //CUSTUM ELEMENT WHEN HAS VALID
        if(mrForm != undefined && mrForm.classList.contains("mr-colors") && mrIsvalidElement)
        {
            if(mrElement.classList.contains("mr-checkbox") || mrElement.classList.contains("mr-radio"))
            {
                var mrCheckElements;
                if(mrElement.classList.contains("mr-checkbox"))
                {
                    mrCheckElements = mrElement.querySelectorAll("input[type=checkbox]");
                }   else
                {
                    mrCheckElements = mrElement.querySelectorAll("input[type=radio]");
                }

                for (mrCheckElement of mrCheckElements)
                {
                    mrCheckElement.style.borderColor = "rgb(22, 160, 133)";
                    mrCheckElement.style.boxShadow = "0 0 0 2px rgb(22, 160, 133, 0.5)";
                    mrCheckElement.style.backgroundColor = "rgba(22, 160, 133, 0.5)";
                }
            }   else
            {
                mrElement.style.borderColor = "rgb(22, 160, 133)";
                mrElement.style.boxShadow = "0 0 0 1px rgb(22, 160, 133, 0.24)";
                mrElement.style.backgroundColor = "rgba(22, 160, 133, 0.02)";
            }
        }

        //NON DISPLAY FEEDBACK MESSAGE WHEN ELEMENT HAS VALID
        var mrFeedbackMessage;
        if(mrFeedback.classList.contains(feedbackClass))
        {
            mrFeedbackMessage = mrFeedback;
        }   else
        {
            mrFeedbackMessage  = mrFeedback.querySelector("." + feedbackClass);
        }

        if(mrFeedbackMessage != null)
        {
            mrFeedbackMessage.style.display = "none";
            if(mrForm != undefined && mrForm.classList.contains("mr-colors"))
            {
                mrFeedbackMessage.style.color = "rgb(22, 160, 133)";
            }
        }
    }

    //NORMALIZE ELEMENT WHEN ITS INVALID
    function mrInvalidElement(feedbackClass)
    {
        mrIsvalidElement = false;
        mrAddClass(mrElement,"mr-invalid");
        mrRemoveClass(mrElement,"mr-valid");

        //CUSTUM ELEMENT WHEN HAS INVALID
        if(mrForm != undefined && mrForm.classList.contains("mr-colors"))
        {
            if(mrElement.classList.contains("mr-checkbox") || mrElement.classList.contains("mr-radio"))
            {
                var mrCheckElements;
                if(mrElement.classList.contains("mr-checkbox"))
                {
                    mrCheckElements = mrElement.querySelectorAll("input[type=checkbox]");
                }   else
                {
                    mrCheckElements = mrElement.querySelectorAll("input[type=radio]");
                }

                for (mrCheckElement of mrCheckElements)
                {
                    mrCheckElement.style.borderColor = "rgb(242, 127, 127)";
                    mrCheckElement.style.boxShadow = "0 0 0 2px rgb(239, 105, 92, 0.5)";
                }
            }   else
            {
                mrElement.style.borderColor = "rgb(242, 127, 127)";
                mrElement.style.boxShadow = "0 0 0 2px rgb(239, 105, 92, 0.24)";
                mrElement.style.backgroundColor = "rgba(255, 221, 221, 0.27)";
            }
        }

        //DISPLAY FEEDBACK MESSAGE WHEN THE ELEMENT HAS INVALID
        var mrFeedbackMessage;
        if(mrFeedback.classList.contains(feedbackClass))
        {
            mrFeedbackMessage = mrFeedback;
        }   else
        {
            mrFeedbackMessage  = mrFeedback.querySelector("." + feedbackClass);
        }

        if(mrFeedbackMessage != null)
        {
            mrFeedback.style.display = "";
            mrFeedbackMessage.style.display = "";

            if(mrForm != undefined && mrForm.classList.contains("mr-colors"))
            {
                mrFeedbackMessage.style.color = "rgb(225, 104, 104)";
            }
        }
    }

    //VERIFY IF AN ELEMENT HAS SOME CLASS
    function mrHasClass(element, className)
    {
        return element.classList.contains(className);
    }

    //VERIFY IF AN ELEMENT VALUE IS EMPTY OR NULL
    function mrIsEmptyElementValue(element)
    {
        return element.value == "" || element.value == null;
    }

    //VERIFY IF AN ELEMENT HAS SOME ATTRIBUTE
    function mrHasAttribute(element, attributeName)
    {
        if(element.getAttribute(attributeName) != null)
        {
            return true;
        }
        return false;
    }

    //VERIFY AN INPUT ELEMENT HAS SOME ATTRIBUTE TYPE
    function mrHasInputType(inputELement, typeAttributeValue)
    {
        if(mrHasAttribute(inputELement,"type"))
        {
            return inputELement.getAttribute("type") == typeAttributeValue;
        }   else
        {
            return false;
        }
    }

    //COMPARE AN ELEMENT VALUE WITH THERE ATTRIBUTE VALUE
    function mrCompareElemValueAttrValue(element, attributeName, typeOfComparation)
    {
        if(mrHasAttribute(element, attributeName))
        {
            switch (typeOfComparation)
            {
                case 1:  //COMPARE IF ELEMENT'S VALUE IS GREATER THAN ATTRIBUTE'S VALUE
                    return Number(element.value) > Number(element.getAttribute(attributeName));
                case 2: //COMPARE IF ELEMENT'S VALUE IS LESS THAN ATTRIBUTE'S VALUE
                    return Number(element.value) < Number(element.getAttribute(attributeName));
                case 3: //COMPARE IF ELEMENT'S VALUE IS IQUAL TO ATTRIBUTE'S VALUE
                    return Number(element.value) == Number(element.getAttribute(attributeName));
            }
        }
        return false;
    }

    //COMPARE TWO DATE'S VALUE
    function mrCompareDates(date1, date2, typeOfComparation)
    {
        switch (typeOfComparation)
        {
            case 1: //COMPARE IF DATE 1 IS GREATER THAN DATE 2
                return date1 > date2;
            case 2: //COMPARE IF DATE 1 IS LESS THAN DATE 2
                return date1 < date2;
            case 3: //COMPARE IF DATA 1 IS IQUAL TO DATE 2
                return date1 == date2;
        }
        return false;
    }

    //GET THE FORM BY PARENT NODE
    function mrGetForm(element)
    {
        if(element.tagName != "BODY" && element.tagName != "HTML")
        {
            if(element.tagName != "FORM")
            {
                return mrGetForm(element.parentNode);
            }
            return element;
        }
        return undefined;
    }

    //GET DATE OBJECT HAS STRING
    function mrGetDateString()
    {
        var mrDateObject = new Date();
        var mrYear = mrDateObject.getFullYear();

        var mrMonth = (mrDateObject.getMonth() + 1).toString();
        if(mrMonth.length < 2)
        {
            mrMonth = "0" + mrMonth;
        }

        var mrDay = (mrDateObject.getDate()).toString();
        if (mrDay.length < 2)
        {
            mrDay = "0" + mrDay;
        }

        var mrDateString = mrYear + "-" + mrMonth + "-" + mrDay;

        return mrDateString;
    }

    //VERIFY IF IS VALID FULL DATE
    function mrIsValidFullDate(date)
    {
        var mrFullDateRegularExpression = /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/;
        return mrFullDateRegularExpression.test(date);
    }

    //COMPARE THE ELEMENT'S VALUE LENGTH
    function mrCompareEleValueLength(element, comparationLength, typeOfComparation)
    {
        switch (typeOfComparation)
        {
            case 1: //COMPARE IF ELEMENT'S VALUE IS GREATER THAN THE COMPARATION LENGTH
                return element.value.length > comparationLength;
            case 2: //COMPARE IF ELEMENT'S VALUE IS LESS THAN THE COMPARATION LENGTH
                return element.value.length < comparationLength;
            case 3: //COMPARE IF ELEMENT'S VALUE IS IQUEL TO THE COMPARATION LENGTH
                return element.value.length == comparationLength;
        }
        return false;
    }

    //VERIFY IF THE VALUE IS INTEGER
    function mrIsNumberInt(value)
    {
        if(!isNaN(value))
        {
            var mrNumberIntRegularExpression = /^[0-9]+$/;
            return Number.isInteger(Number(value)) || mrNumberIntRegularExpression.test(value);
        }
        return false;
    }

    //ADD CLASS TO AN ELEMENT
    function mrAddClass(element, className)
    {
        element.classList.add(className);
    }

    //REMOVE CLASS OF AN ELEMENT
    function mrRemoveClass(element, className)
    {
        if(element.classList.contains(className))
        {
            element.classList.remove(className);
        }
    }
}