/*
 * Created by Alberto on JULLY/2018 as validacao.js.
 * Created by Alberto on AUGUST/2018 as MY RULES VALIDATION.
 * Updated on JULY/2019 as MY RULES VALIDATION V2 and named My Rules
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
    mrResetForm(null);  //HIDE THE FEEDBACKS
    var mrForms = document.forms;   //GET THE FORMS ELEMENTS

    for(var i = 0; i < mrForms.length; i++)
    {
        var mrForm = mrForms[i];
        //GET ALL ELEMENTS AND FEEDBACKS
        var mrElements = mrForm.querySelectorAll(".mr");
        var mrFeedbacks = mrForm.querySelectorAll(".mr-feedback");

        //DISPLAY FEEBACK IN BLOCK IF IS AN DIV TAG
        for(var j = 0; j < mrFeedbacks.length; j++)
        {
            var mrFeedback = mrFeedbacks[j];
            if(mrFeedback.tagName==='DIV')
            {
                mrFeedback.style.display = "block";
            }
        }

        if((mrElements.length == mrFeedbacks.length) && (mrElements.length > 0))
        {
            mrForm.setAttribute("novalidate","");

            //EVENT HANDLER  TO VALIDATE
            for(var j = 0; j < mrElements.length; j++)
            {
                mrFeedbacks[j].classList.remove("mr-feedback");
                mrFeedbacks[j].classList.add("mr-feedback-element");

                var mrElement = mrElements[j];
                if(!mrForm.classList.contains("mr-validate-onsumit-only"))
                {
                    mrElement.onchange = function(e)
                    {
                        mrValidateElement(this);
                    }

                    if(mrForm.classList.contains("mr-validate-oninput"))
                    {
                        mrElement.oninput = function(e)
                        {
                            mrValidateElement(this);
                        }
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
        }   else if(!(mrElements.length == 0 && mrFeedbacks.length == 0))
        {
            console.error("MY RULES ERROR:\n" + "- The number of class .mr and number of class .mr-feedback is not iqual in form: ");
            console.error(mrForm);
        }
    }

    //FUCTION TO RESET FORM
    function mrResetForm(form)
    {
        // ALL FEEDBACKS CLASSES
        var mrFeedbackClasses = 
        [
            ".mr-feedback",
            ".mr-feedback-element",
            ".mr-required-fb",
            ".mr-min-fb",
            ".mr-max-fb",
            ".mr-minlength-fb",
            ".mr-maxlength-fb",
            ".mr-pattern-fb",
            ".mr-step-fb",
            ".mr-match-fb",
            ".mr-email-fb",
            ".mr-url-fb",
            ".mr-password-good-fb",
            ".mr-password-strong-fb",
            ".mr-password-very-strong-fb",
            ".mr-username-fb",
            ".mr-alpha-fb",
            ".mr-alpha-space-fb",
            ".mr-alpha-numeric-fb",
            ".mr-alpha-numeric-space-fb",
            ".mr-latin-fb",
            ".mr-latin-space-fb",
            ".mr-latin-numeric-fb",
            ".mr-latin-numeric-space-fb",
            ".mr-number-int-fb",
            ".mr-number-fb",
            ".mr-ip-address-fb",
            ".mr-minselect-fb",
            ".mr-maxselect-fb",
            ".mr-mincheck-fb",
            ".mr-maxcheck-fb",
            ".mr-date-fb",
            ".mr-accept-fb",
            ".mr-minsize-fb",
            ".mr-maxsize-fb",
            ".mr-width-fb",
            ".mr-height-fb",
            ".mr-minwidth-fb",
            ".mr-maxwidth-fb",
            ".mr-minheight-fb",
            ".mr-maxheight-fb",
            ".mr-resolution-fb",
            ".mr-ratio-fb",
            ".mr-valid-fb",
            ".mr-invalid-fb"
        ];
        
        var mrArrayFeedbacks = [];
        if (form == null)
        {
            //GET ALL FEEDBACKS COLLECTIONS OF DOCUMENT AND ADD IN AN ARRAY OF FEEDBACKS
            for (mrFeedbackClass of mrFeedbackClasses)
            {
                mrArrayFeedbacks.push(document.querySelectorAll(mrFeedbackClass));
            }
            var mrElements = document.querySelectorAll(".mr");

            // RESET THHE INPUT FILE WITH VALIDATION ATTRIBUTES OF IMAGES RESOLUTIONS WHEN PAGE LOAD/RELOAD
            for(mrElement of mrElements)
            {
                if
                (
                    mrElement.getAttribute("data-width") != null
                    || mrElement.getAttribute("data-height") != null
                    || mrElement.getAttribute("data-minwidth") != null
                    || mrElement.getAttribute("data-maxwidth") != null
                    || mrElement.getAttribute("data-minheight") != null
                    || mrElement.getAttribute("data-maxheight") != null
                    || mrElement.getAttribute("data-resolution") != null
                    || mrElement.getAttribute("data-ratio") != null
                    || mrElement.getAttribute("width") != null
                    || mrElement.getAttribute("height") != null
                    || mrElement.getAttribute("minwidth") != null
                    || mrElement.getAttribute("maxwidth") != null
                    || mrElement.getAttribute("minheight") != null
                    || mrElement.getAttribute("maxheight") != null
                    || mrElement.getAttribute("resolution") != null
                    || mrElement.getAttribute("ratio") != null
                )
                {
                    mrElement.value = "";

                    var id = "mr-image-element-test-id";
                    var newImageElementTest = document.getElementById(id);
                    var appendImageElementTest = false;
                    
                    if(newImageElementTest == null)
                    {
                        newImageElementTest = document.createElement("IMG");
                        appendImageElementTest =  true;
                    }

                    newImageElementTest.setAttribute("hidden","");
                    newImageElementTest.setAttribute("id", id);

                    if(appendImageElementTest == true)
                    {
                        document.body.appendChild(newImageElementTest);
                    }
                }
            }
        }   else
        {
            //GET ALL FEEDBACKS COLLECTIONS OF FORM AND ADD IN AN ARRAY OF FEEDBACKS
            for (mrFeedbackClass of mrFeedbackClasses)
            {
                mrArrayFeedbacks.push(form.querySelectorAll(mrFeedbackClass));
            }

            var mrArrayElements = [];

            //GET ALL FORM ELEMENTS AND ADD IN ARRAY OF ELEMENTS
            mrElements = form.querySelectorAll(".mr");
            for(var i = 0; i < mrElements.length; i++)
            {
                var mrElement = mrElements[i];
                if(mrElement.classList.contains("mr-checkbox") || mrElement.classList.contains("mr-radio"))
                {
                    var mrCheckboxs = [];
                    var mrRadios = [];

                    if(mrElement.classList.contains("mr-checkbox"))
                    {
                        mrCheckboxs = mrElement.querySelectorAll("input[type=checkbox]");
                    }   else
                    {
                        mrRadios = mrElement.querySelectorAll("input[type=radio]");
                    }

                    for(var j = 0; j < mrCheckboxs.length; j++)
                    {
                        var mrCheckbox = mrCheckboxs[j];
                        mrArrayElements.push(mrCheckbox);
                    }

                    for(var j = 0; j < mrRadios.length; j++)
                    {
                        var mrRadio = mrRadios[j];
                        mrArrayElements.push(mrRadio);
                    }
                }   else
                {
                    mrArrayElements.push(mrElement);
                }
            }

            //RESET THE CSS STYLE OF FORM ELEMENTS
            for(var i = 0; i < mrArrayElements.length; i++)
            {
                var mrElement = mrArrayElements[i];
                mrElement.style.borderColor = "";
                mrElement.style.boxShadow = "";
                mrElement.style.backgroundColor = "";
            }
        }

        //NON DISPLAY THE FEEDBACKS
        for(var i = 0; i < mrArrayFeedbacks.length; i++)
        {
            var arrayFeedback = mrArrayFeedbacks[i];
            for(var j = 0; j < arrayFeedback.length; j++)
            {
                var feedback = arrayFeedback[j];
                feedback.style.display = "none";
            }
        }
    }
}

//FUNCTION TO VALIDATE THE FORM
function mrValidateForm(mrForm)
{
    var mrIsValidForm = true;
    var mrElements = mrForm.querySelectorAll(".mr");
    
    for(var i = 0; i < mrElements.length; i++)
    {
        var mrElement = mrElements[i];

        if(!mrValidateElement(mrElement) || mrElement.classList.contains("mr-invalid"))
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

    for(var i = 0; i < mrElements.length; i++)
    {
        var element = mrElements[i];
        mrArrayElements.push(element);
    }
    var mrIndexOfElement = mrArrayElements.indexOf(mrElement);
    var mrFeedback = mrForm.querySelectorAll(".mr-feedback-element")[mrIndexOfElement];
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

    //VALIDATE IF THE ELEMENT HAS VALUE
    mrRequired(mrElement);
    function mrRequired(mrElement)
    {
        if(mrHasClass(mrElement,"mr-required") || mrHasAttribute(mrElement,"required"))
        {

            var mrElementValueIsEmpty = false;
            var mrIsValueMissing = false;

            if(mrElement.tagName == "SELECT")
            {
                if(!mrHasAttribute(mrElement,"required"))
                {
                    mrElement.setAttribute("required","");
                }

                if(mrElement.selectedOptions.length < 1 || mrIsEmptyElementValue(mrElement) || mrElement.validity.valueMissing)
                {
                    mrElementValueIsEmpty = true;
                    mrIsValueMissing = false;
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

                for(var i = 0; i < mrCheckElements.length; i++)
                {
                    var mrCheckElement = mrCheckElements[i];
                    if(mrCheckElement.checked && (!mrIsEmptyElementValue(mrCheckElement)))
                    {
                        mrElementValueIsEmpty = false;
                        mrIsValueMissing = false;
                    }
                }
            }   else
            {
                if(!mrHasAttribute(mrElement,"required"))
                {
                    mrElement.setAttribute("required","");
                }
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
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS LESS THAN ITS MIN ATTRIBUTE
    mrMin(mrElement);
    function mrMin(mrElement)
    {
        if(mrHasAttribute(mrElement,"min") && mrElement.getAttribute("min") != "")
        {
            if(!mrIsEmptyElementValue(mrElement))
            {
                if (mrHasInputType(mrElement, "date") || mrHasClass(mrElement, "mr-date"))  //IF INPUT TYPE IS DATE
                {
    
                    var mrDateFormat = "YYYY-MM-DD";
                    if(!mrHasInputType(mrElement, "date"))
                    {
                        mrDateFormat = mrElement.getAttribute("data-dateformat");
                        if(mrDateFormat == null)
                        {
                            mrDateFormat = mrElement.getAttribute("dateformat");
                        }
                    }

                    var mrMinDate = mrElement.getAttribute("min");
                    if(mrMinDate == "today")
                    {
                        mrMinDate = mrGetfullDate(mrDateFormat);
                    }

                    if(mrIsValidFullDate(mrMinDate, mrDateFormat))
                    {
                        if(mrIsValidFullDate(mrElement.value, mrDateFormat))
                        {
                            if(mrCompareDates(mrElement.value, mrMinDate, "<", mrDateFormat))
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
                    if((mrCompareValue(mrElement, "min", "<") || mrElement.validity.rangeUnderflow))
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
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS GREATER THAN ITS MAX ATTRIBUTE
    mrMax(mrElement);
    function mrMax(mrElement)
    {
        if(mrHasAttribute(mrElement,"max"))
        {
            if(!mrIsEmptyElementValue(mrElement) && mrElement.getAttribute("max") != "")
            {
                if (mrHasInputType(mrElement, "date") || mrHasClass(mrElement, "mr-date"))  //IF THE INPUT TYPE IS DATE
                {

                    var mrDateFormat = "YYYY-MM-DD";
                    if(!mrHasInputType(mrElement, "date"))
                    {
                        mrDateFormat = mrElement.getAttribute("data-dateformat");
                        if(mrDateFormat == null)
                        {
                            mrDateFormat = mrElement.getAttribute("dateformat");
                        }
                    }

                    var mrMaxDate = mrElement.getAttribute("max");
                    if(mrMaxDate == "today")
                    {
                        mrMaxDate = mrGetfullDate(mrDateFormat);
                    }
                    
                    if(mrIsValidFullDate(mrMaxDate, mrDateFormat))
                    {
                        if(mrIsValidFullDate(mrElement.value, mrDateFormat))
                        {
                            if(mrCompareDates(mrElement.value, mrMaxDate, ">", mrDateFormat))
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
                } else if(!isNaN(mrElement.getAttribute("max")))
                {
                    if((mrCompareValue(mrElement, "max", ">") || mrElement.validity.rangeOverflow))
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
                    mrInvalidElement("mr-max-fb");
                }
            }   else
            {
                mrValidElement("mr-max-fb");
            }
        }
    }


    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID DATE FORMAT
    mrDate(mrElement);
    function mrDate(mrElement)
    {
        if (mrHasInputType(mrElement, "date") || mrHasClass(mrElement,"mr-date"))  //IF INPUT TYPE IS DATE
        {
            var mrDateFormat = mrElement.getAttribute("data-dateformat");
            if(mrDateFormat == null)
            {
                mrDateFormat = mrElement.getAttribute("dateformat");
            }
            if(!mrIsValidFullDate(mrElement.value, mrDateFormat) && !mrIsEmptyElementValue(mrElement)){
                mrInvalidElement("mr-date-fb");
            } else{
                mrValidElement("mr-date-fb");
            } 
            
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS LESS THAN ITS MINLENGTH ATTRIBUTE
    mrMinlength(mrElement);
    function mrMinlength(mrElement)
    {
        if(mrHasAttribute(mrElement, "minlength") || mrHasAttribute(mrElement, "data-minlength"))
        {
            var minlength = mrElement.getAttribute("data-minlength");
            if(minlength == null)
            {
                minlength = mrElement.getAttribute("minlength");
            }

            if(minlength != "")
            {
                if (mrCompareValueLength(mrElement, minlength, "<") && !mrIsEmptyElementValue(mrElement))
                {
                    mrInvalidElement("mr-minlength-fb");
                }   else
                {
                    mrValidElement("mr-minlength-fb");
                }
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE EXCEEDS ITS MAXLENGTH ATTRIBUTE
    mrMaxlenght(mrElement);
    function mrMaxlenght(mrElement)
    {
        if(mrHasAttribute(mrElement,"maxlength"))
        {
            var maxlength = mrElement.getAttribute("maxlength");
            if(maxlength != "")
            {
                if ((mrCompareValueLength(mrElement, mrElement.getAttribute("maxlength"), ">") || mrElement.validity.tooLong) && !mrIsEmptyElementValue(mrElement))
                {
                    mrInvalidElement("mr-maxlength-fb");
                }   else
                {
                    mrValidElement("mr-maxlength-fb");
                }
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE DOES NOT MATCH ITS PATTERN ATTRIBUTE
    mrPattern(mrElement);
    function mrPattern(mrElement)
    {
        if(mrHasAttribute(mrElement,"pattern"))
        {
            var pattern = mrElement.getAttribute("pattern");
            if(pattern != "")
            {
                var regularExpression = new RegExp(pattern);
    
                if ((!regularExpression.test(mrElement.value) || mrElement.validity.patternMismatch) && !mrIsEmptyElementValue(mrElement))
                {
                    mrInvalidElement("mr-pattern-fb");
                }   else
                {
                    mrValidElement("mr-pattern-fb");
                }
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS NOT A VALID EMAIL
    mrEmail(mrElement);
    function mrEmail(mrElement)
    {
        if(mrHasClass(mrElement,"mr-email") || mrHasInputType(mrElement,"email"))
        {
            if(!mrHasInputType(mrElement,"email"))
            {
                mrElement.setAttribute("type","email");
            }

            let mrIsValidEmail = true;
            if(!mrIsEmptyElementValue(mrElement))
            {
                if(mrElement.validity.typeMismatch)
                {
                    mrIsValidEmail = false;
                }

                if(!mrHasClass(mrElement,"mr-email-browser") && mrIsValidEmail)
                {
                    let mrPrintableChars = mrGetPrintableChars(mrElement);
                    mrPrintableChars =  mrPrintableChars.replace(".","");
                    mrPrintableChars =  mrPrintableChars.replace("@","");
                    
                    let mrEmailRegularExpression = "^[A-Za-z0-9" + mrPrintableChars + "]+([.][A-Za-z0-9" + mrPrintableChars + "]+)*@(([A-Za-z0-9]+([\-]+[A-Za-z0-9]+)*([.][A-Za-z0-9]+([\-][A-Za-z0-9]+)*)+))$";
                    let mrEmailPattern = new RegExp(mrEmailRegularExpression, "i");

                    if(!mrEmailPattern.test(mrElement.value))
                    {
                        mrIsValidEmail = false;
                    }else if(mrIsValidEmail)
                    {
                        emailDotSplit = mrElement.value.split('.');
                        topLevelDomain = emailDotSplit[emailDotSplit.length-1];

                        if(mrIsInteger(topLevelDomain))
                        {
                            mrIsValidEmail = false
                        }
                    }
                }
            }

            if(mrIsValidEmail)
            {
                mrValidElement("mr-email-fb");
            }   else
            {
                mrInvalidElement("mr-email-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS NOT A VALID URL
    mrUrl(mrElement);
    function mrUrl(mrElement)
    {
        if(mrHasClass(mrElement,"mr-url") || mrHasInputType(mrElement,"url"))
        {   
            if(!mrHasInputType(mrElement,"url"))
            {
                mrElement.setAttribute("type","url");
            }

            let mrIsValidURL = true;
            let mrHasSchemeError = false;

            if(mrHasClass(mrElement, "mr-browser-url")  && !mrIsEmptyElementValue(mrElement))
            {
                if(mrElement.validity.typeMismatch)
                {
                    mrIsValidURL = false;
                }
            }   else if(!mrIsEmptyElementValue(mrElement))
            {
                let mrURLregularExpression = "^[A-Za-z][A-Za-z0-9+.\-]*[:]";

                if(mrHasAttribute(mrElement,"data-url-scheme") || mrHasAttribute(mrElement, "url-scheme")){
                    let mrScheme = mrElement.getAttribute("data-url-scheme");
                    if(mrScheme == null){
                        mrScheme = mrElement.getAttribute("url-scheme");
                    }

                    let mrSchemes  = mrScheme.split(",");
                    let mrSchemeRegularExpression = "^[A-Za-z]([A-Za-z0-9+.\-]*)$";
                    let mrSchemePattern = new RegExp(mrSchemeRegularExpression, "i");

                    if(mrSchemes.length > 1){
                        mrURLregularExpression = "^((";
                        let i = 0;
                        for(scheme of mrSchemes){
                            scheme = scheme.trim();
                            if(scheme != ""){
                                if(mrSchemePattern.test(scheme)){
                                    if(i == 0){
                                        mrURLregularExpression += scheme;
                                    }   else{
                                        mrURLregularExpression += "|" + scheme;
                                    }
                                } else{
                                    mrHasSchemeError = true;
                                    break;
                                }  
                            }
                            i++;
                        }
                        mrURLregularExpression += "):)";
                    }   else{
                        let scheme = mrSchemes[0];
                        scheme = scheme.trim();
                        if(mrSchemePattern.test(scheme)){
                            mrURLregularExpression = "^("+ scheme +":)";
                        } else{
                            mrHasSchemeError = true;
                        }
                    }   
                }

                if(!mrHasSchemeError){
                    let mrURLpattern = new RegExp(mrURLregularExpression, "i");
                
                    if(mrElement.validity.typeMismatch)
                    {
                        mrIsValidURL = false;
                    }else if(mrURLpattern.test(mrElement.value))
                    {
                        let mrURL = mrElement.value;
                        mrURL = mrURL.trim();
                        mrURL = mrURL.split(":");
                        if((mrURL[1].length == 0 || mrURL[1] == "/"|| mrURL[1] == "//"))
                        {
                            mrIsValidURL = false;
                        }
                    }   else
                    {
                        mrIsValidURL = false;
                    }
                }

            }

            if(!mrHasSchemeError){
                if(mrIsValidURL)
                {
                    mrValidElement("mr-url-fb");
                }   else
                {
                    mrInvalidElement("mr-url-fb");
                }
            }   else{
                console.error("MY RULES ERROR:\n" + "- Some invalid \""+ "" +"\" url-scheme on element:");
                console.error(mrElement);
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS NOT A VALID IP ADDRESS
    mrIPaddress(mrElement);
    function mrIPaddress(mrElement)
    {
        if(mrHasClass(mrElement,"mr-ip-address") || mrHasInputType(mrElement,"mr-ip-address"))
        { 

            let mrIsValidIPaddress = false;
            if(!mrIsEmptyElementValue(mrElement))
            {
                if
                (
                    !mrHasClass(mrElement,"mr-ipv4") &&
                    !mrHasClass(mrElement,"mr-ipv4-dot-decimal") &&
                    !mrHasClass(mrElement,"mr-ipv4-dot-binary") &&
                    !mrHasClass(mrElement,"mr-ipv4-dot-hexadecimal") &&
                    !mrHasClass(mrElement,"mr-ipv4-dot-octal-byte") &&
                    !mrHasClass(mrElement,"mr-ipv6") &&
                    !mrHasClass(mrElement,"mr-ipv6-hexadecimal") &&
                    !mrHasClass(mrElement,"mr-ipv6-binary")
                )
                {
                    if(mrIsIP(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                }   else
                {
                    if(mrHasClass(mrElement,"mr-ipv4") && mrIsIPv4(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                    if(mrHasClass(mrElement,"mr-ipv4-dot-decimal") && mrIsIPv4DotDecimalNotation(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                    if(mrHasClass(mrElement,"mr-ipv4-dot-binary") && mrIsIPv4DotBinaryNotation(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                    if(mrHasClass(mrElement,"mr-ipv4-dot-hexadecimal") && mrIsIPv4DotHexadecimalNotation(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                    if(mrHasClass(mrElement,"mr-ipv4-dot-octal-byte") && mrIsIPv4DotOctalByteNotation(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                    if(mrHasClass(mrElement,"mr-ipv6") && mrIsIPv6(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                    if(mrHasClass(mrElement,"mr-ipv6-hexadecimal") && mrIsIPv6HexadecimalNotation(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                    if(mrHasClass(mrElement,"mr-ipv6-binary") && mrIsIPv6BinaryNotation(mrElement.value))
                    {
                        mrIsValidIPaddress = true;
                    }
                }
            }

            if(mrIsValidIPaddress)
            {
                mrValidElement("mr-ip-address-fb");
            }   else
            {
                mrInvalidElement("mr-ip-address-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS INVALID PER ITS STEP ATTRIBUTE
    mrStep(mrElement);
    function mrStep(mrElement)
    {
        if(mrHasAttribute(mrElement,"step"))
        {
            var mrStepElement = mrElement.getAttribute("step");
            var mrIsvalidStep = false;
    
            if(mrStepElement != "")
            {
                if(!isNaN(mrStepElement))
                {
                    if(!isNaN(mrElement.value) && !mrIsEmptyElementValue(mrElement))
                    {
                        if(mrElement.value % Number(mrStepElement) == 0 || mrElement.validity.stepMismatch)
                        {
                            mrIsvalidStep = true;
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
                    // mrInvalidElement("mr-step-fb");
                }
            }
        }   
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS INVALID PASSWORD-GOOD (LOWERCASE OR/AND UPPERCASE AND NUMBER OR/AND SPECIAL CHAR)
    mrPasswordGood(mrElement);
    function mrPasswordGood(mrElement)
    {
        if(mrHasClass(mrElement,"mr-password-good"))
        {
            var mrPasswordGoodRegularExpression = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Za-z]).*$/;
            var mrWhiteSpaceRegularExpression  = /[\s ]/;
            var mrIsValidPasswordMinlength = true;
    
            //CHANGE THE REGULAR EXPRESSION IF THE ELEMENT HAVE ATTRIBUTE minlength
            if (mrHasAttribute(mrElement,"minlength") || mrHasAttribute(mrElement,"data-minlength"))
            {
                var minlength = mrElement.getAttribute("data-minlength");
                if(minlength == null)
                {
                    minlength = mrElement.getAttribute("minlength");
                }

                if(minlength != "" && minlength != null && mrIsInteger(minlength))
                {
                    var mrPasswordGoodPattern = "(?=^.{" + minlength + ",}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Za-z]).*$";
                    mrPasswordGoodRegularExpression = new RegExp(mrPasswordGoodPattern);
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of minlength attributte of element:");
                    console.error(mrElement);
                    console.error("is non a number");
                    mrIsValidPasswordMinlength = false;
                }
            }
    
            if(mrIsValidPasswordMinlength)
            {
                if (!mrPasswordGoodRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement) || mrWhiteSpaceRegularExpression.test(mrElement.value))
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
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS INVALID PASSWORD-STRONG (LOWERCASE, UPPERCASE AND NUMBER OR/AND SPECIAL CHAR)
    mrPasswordStrong(mrElement);
    function mrPasswordStrong(mrElement)
    {
        if(mrHasClass(mrElement,"mr-password-strong"))
        {
            var mrPasswordStrongRegularExpression = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            var mrWhiteSpaceRegularExpression  = /[\s ]/;
            var mrIsValidPasswordMinlength = true;
    
            //CHANGE THE REGULAR EXPRESSION IF THE ELEMENT HAVE ATTRIBUTE minlength
            if (mrHasAttribute(mrElement,"minlength") || mrHasAttribute(mrElement,"data-minlength"))
            {
                var minlength = mrElement.getAttribute("data-minlength");
                if(minlength == null)
                {
                    minlength = mrElement.getAttribute("minlength");
                }

                if(minlength != "" && minlength != null && mrIsInteger(minlength))
                {
                    var mrPasswordStrongPattern = "(?=^.{" + minlength + ",}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";
                    mrPasswordStrongRegularExpression = new RegExp(mrPasswordStrongPattern);
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of minlength attributte of element:");
                    console.error(mrElement);
                    console.error("is non a number");
                    mrIsValidPasswordMinlength = false;
                }
            }
    
            if(mrIsValidPasswordMinlength)
            {
                if (!mrPasswordStrongRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement) || mrWhiteSpaceRegularExpression.test(mrElement.value))
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
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS INVALID PASSWORD-VERY-STRONG (ALPHA LOWERCASE, ALPHA UPPERCASE, NUMBER AND SPECIAL CHAR)
    mrPasswordVeryStrong(mrElement);
    function mrPasswordVeryStrong(mrElement)
    {
        if(mrHasClass(mrElement,"mr-password-very-strong"))
        {
            var mrPasswordVeryStrongRegularExpression = /((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            var mrWhiteSpaceRegularExpression  = /[\s ]/;
            var mrIsValidPasswordMinlength = true;
    
            //CHANGE THE REGULAR EXPRESSION IF THE ELEMENT HAVE ATTRIBUTE minlength
            if (mrHasAttribute(mrElement,"minlength") || mrHasAttribute(mrElement,"data-minlength"))
            {
                var minlength = mrElement.getAttribute("data-minlength");
                if(minlength == null)
                {
                    minlength = mrElement.getAttribute("minlength");
                }

                if(minlength != "" && minlength != null && mrIsInteger(minlength))
                {
                    var mrPasswordVeryStrongPattern = "(?=^.{" + minlength + ",}$)((?=.*\\d)(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";
                    mrPasswordVeryStrongRegularExpression = new RegExp(mrPasswordVeryStrongPattern);
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of minlength attributte of element:");
                    console.error(mrElement);
                    console.error("is not a valid number");
                    mrIsValidPasswordMinlength = false;
                }
            }
    
            if(mrIsValidPasswordMinlength)
            {
                if (!mrPasswordVeryStrongRegularExpression.test(mrElement.value) && !mrIsEmptyElementValue(mrElement) || mrWhiteSpaceRegularExpression.test(mrElement.value))
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
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE MARTCHES THE OTHER ELEMENT'S VALUE
    mrMatchSubject(mrElement);
    function mrMatchSubject(mrElement)
    {
        if(mrHasClass(mrElement,"mr-match"))
        {
            var mrMatches = mrForm.querySelectorAll(".mr-match");
            var mrMatchSubjects = mrForm.querySelectorAll(".mr-match-subject");
    
            if(mrMatches.length == mrMatchSubjects.length)
            {
                var mrArrayMatches = [];
    
                for(var i = 0; i < mrMatches.length; i++)
                {
                    var mrMatchElement = mrMatches[i];
                    mrArrayMatches.push(mrMatchElement);
                }
                var mrIndexOfMatch = mrArrayMatches.indexOf(mrElement);
                var mrMatchSubject = mrMatchSubjects[mrIndexOfMatch];
                var mrPatternMatchSubject = new RegExp("^"+mrMatchSubject.value+"$");
    
                if(!mrPatternMatchSubject.test(mrElement.value) && !mrIsEmptyElementValue(mrMatchSubject))
                {
                    mrInvalidElement("mr-match-fb");
                }   else
                {
                    mrValidElement("mr-match-fb");
                }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The number of class .mr-macth and number of class .mr-match-subject must be iqual in form: ");
                console.error(mrForm);
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID USERNAME (UPERCASE, LOWERCASE, NUMBER, ALLOWED PRINTABLE SPECIAL CHARS)
    mrUsername(mrElement);
    function mrUsername(mrElement)
    {
        if(mrHasClass(mrElement, "mr-username"))
        {
            let mrPrintableChars = mrGetPrintableChars(mrElement, true);

            let mrUsernameRegularExpression = "^[A-Za-z]+([A-Za-z0-9]*([" +  mrPrintableChars + "](?![" + mrPrintableChars + "]))*([A-Za-z0-9]*([" +  mrPrintableChars + "](?![" + mrPrintableChars + "]))*)*)[A-Za-z0-9]+$"
            console.log(mrUsernameRegularExpression);
          
            let mrUsernamePattern = new RegExp(mrUsernameRegularExpression, "i");
            console.log(mrUsernamePattern);

            if(!mrUsernamePattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-username-fb");
            }   else
            {
                mrValidElement("mr-username-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID ALPHA
    mrAlpha(mrElement);
    function mrAlpha(mrElement)
    {
        if(mrHasClass(mrElement,"mr-alpha"))
        {
            var mrAlphaPattern = /^[a-zA-Z]+$/;
            if(!mrAlphaPattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-alpha-fb");
            }   else
            {
                mrValidElement("mr-alpha-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID ALPHA-SPACE
    mrAlphaSpace(mrElement);
    function mrAlphaSpace(mrElement)
    {
        if(mrHasClass(mrElement,"mr-alpha-space"))
        {
            var mrAlphaSpacePattern = /^[a-zA-Z ]+$/;
            if(!mrAlphaSpacePattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-alpha-space-fb");
            }   else
            {
                mrValidElement("mr-alpha-space-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID ALPHA-NUMERIC~
    mrAlphaNumeric(mrElement);
    function mrAlphaNumeric(mrElement)
    {
        if(mrHasClass(mrElement,"mr-alpha-numeric"))
        {
            var mrAlphaNumericPattern = /^[a-zA-Z0-9]+$/;
            if(!mrAlphaNumericPattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-alpha-numeric-fb");
            }   else
            {
                mrValidElement("mr-alpha-numeric-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID ALPHA-SPACE-NUMERIC-SPACE
    mrAlphaNumericSpace(mrElement);
    function mrAlphaNumericSpace(mrElement)
    {
        if(mrHasClass(mrElement,"mr-alpha-numeric-space")) {
            var mrAlphaNumericSpacePattern = /^[a-zA-Z0-9 ]+$/;
            if (!mrAlphaNumericSpacePattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement)) {
                mrInvalidElement("mr-alpha-numeric-space-fb");
            } else {
                mrValidElement("mr-alpha-numeric-space-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID LATIN
    mrLatin(mrElement);
    function mrLatin(mrElement)
    {
        if(mrHasClass(mrElement,"mr-latin"))
        {
            var mrLatinPattern = /^[a-zA-ZÀ-ÖØ-öø-ʯ]+$/i;
            if(!mrLatinPattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-latin-fb");
            }   else
            {
                mrValidElement("mr-latin-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID LATIN-SPACE
    mrLatinSpace(mrElement);
    function mrLatinSpace(mrElement)
    {
        if(mrHasClass(mrElement,"mr-latin-space"))
        {
            var mrLatinSpacePattern = /^[a-zA-ZÀ-ÖØ-öø-ʯ ]+$/i;
            if(!mrLatinSpacePattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-latin-space-fb");
            }   else
            {
                mrValidElement("mr-latin-space-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID LATIN-NUMERIC
    mrLatinNumeric(mrElement);
    function mrLatinNumeric(mrElement)
    {
        if(mrHasClass(mrElement,"mr-latin-numeric"))
        {
            var mrLatinNumericPattern = /^[a-zA-ZÀ-ÖØ-öø-ʯ0-9]+$/i;
            if(!mrLatinNumericPattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-latin-numeric-fb");
            }   else
            {
                mrValidElement("mr-latin-numeric-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID LATIN-NUMERIC-SPACE
    mrLatinNumericSpace(mrElement);
    function mrLatinNumericSpace(mrElement)
    {
        if(mrHasClass(mrElement,"mr-latin-numeric-space"))
        {
            var mrLatinNumericSpacePattern = /^[a-zA-ZÀ-ÖØ-öø-ʯ0-9 ]+$/i;
            if (!mrLatinNumericSpacePattern.test(mrElement.value) && !mrIsEmptyElementValue(mrElement))
            {
                mrInvalidElement("mr-latin-numeric-space-fb");
            }   else
            {
                mrValidElement("mr-latin-numeric-space-fb");
            }
        }
    }
    

    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID INTEGER NUMBER
    mrNumberInt(mrElement);
    function mrNumberInt(mrElement)
    {
        if(mrHasClass(mrElement,"mr-number-int"))
        {
            if(!mrIsEmptyElementValue(mrElement))
            {
                if(!isNaN(mrElement.value))
                {
                    if(!mrIsInteger(Number(mrElement.value)))
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
    }
    

    // VALIDATE IF THE ELEMENT VALUE HAS MINIMUM VALID FILE SIZE
    mrMinsize(mrElement);
    function mrMinsize(mrElement)
    {
        if(mrHasInputType(mrElement,"file") && (mrHasAttribute(mrElement, "minsize") || mrHasAttribute(mrElement, "data-minsize")))
        {
            
            var minFilesize = mrElement.getAttribute("data-minsize");
            if(minFilesize == null)
            {
                minFilesize = mrElement.getAttribute("minsize");
            }

            if(!mrIsEmptyElementValue(mrElement) && minFilesize != "")
            {
                var fileList = mrElement.files;
                var betySizes = {
                    byte: {description: "byte", size: 1},
                    kb: {description: "Kilobyte", size: 1024},
                    mb: {description: "Megabyte", size: 1048576},
                    gb: {description: "Gigabyte", size: 1073741824}
                }
    
                var formatfilesizePattern = /^\d+$|(^\d+)byte$|(^\d+)kb$|(^\d+)mb$|(^\d+)gb$/i;
                if(formatfilesizePattern.test(minFilesize))
                {
                    var formatfilesizePatterns =  {
                        byte: /^\d+$|(^\d+)byte$/i,
                        kb: /(^\d+)kb$/i,
                        mb: /(^\d+)mb$/i,
                        gb: /(^\d+)gb$/i
                    }
    
                    var countValidFilesize = 0;
                    var SumFilesizes = 0;
                    var minFilesizeBytes = 0;
    
                    for(var i = 0; i < fileList.length; i++)
                    {
                        var file = fileList[i];
                        var filesize = file.size;
                        SumFilesizes += filesize;
                        if(formatfilesizePatterns.byte.test(minFilesize))
                        {
                            minFilesize = minFilesize + "";
                            minFilesize = minFilesize.replace(/byte/i,"");
                            minFilesize = minFilesize * betySizes.byte.size;
                            if(filesize >= minFilesize)
                            {
                                countValidFilesize++;
                            }
                            minFilesizeBytes = minFilesize;
                        }   else if(formatfilesizePatterns.kb.test(minFilesize))
                        {
                            minFilesize = minFilesize + "";
                            minFilesize = minFilesize.replace(/kb/i,"");
                            minFilesize = minFilesize * betySizes.kb.size;
                            if(filesize >= minFilesize)
                            {
                                countValidFilesize++;
                            }
                            minFilesizeBytes = minFilesize;
                        }   else if(formatfilesizePatterns.mb.test(minFilesize))
                        {
                            minFilesize = minFilesize + "";
                            minFilesize = minFilesize.replace(/mb/i,"");
                            minFilesize = minFilesize * betySizes.mb.size;
                            if(filesize >= minFilesize)
                            {
                                countValidFilesize++;
                            }
                            minFilesizeBytes = minFilesize;
                        }   else if(formatfilesizePatterns.gb.test(minFilesize))
                        {
                            minFilesize = minFilesize + "";
                            minFilesize = minFilesize.replace(/gb/i,"");
                            minFilesize = minFilesize * betySizes.gb.size;
                            if(filesize >= minFilesize)
                            {
                                countValidFilesize++;
                            }
                            minFilesizeBytes = minFilesize;
                        }
                    }
    
                    var isValidFilesize = false;
                    if(mrHasClass(mrElement, "mr-sum-minsizes"))
                    {
                        if(SumFilesizes >= minFilesizeBytes)
                        {
                            isValidFilesize = true;
                        }
                    }   else
                    {
                        if(countValidFilesize >= fileList.length)
                        {
                            isValidFilesize = true;
                        }
                    }
                    
                    if(isValidFilesize)
                    {
                        mrValidElement("mr-minsize-fb");
                    }   else
                    {
                        mrInvalidElement("mr-minsize-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The file size \"" + file + "\" is invalid minimum format size at input element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-minsize-fb");
                }
            }
            // else
            // {
            //     mrValidElement("mr-minsize-fb");
            // }
        }
    }


    // VALIDATE IF THE ELEMENT VALUE HAS VALID MAX FILE SIZE
    mrMaxsize(mrElement);
    function mrMaxsize(mrElement)
    {
        if(mrHasInputType(mrElement,"file") && (mrHasAttribute(mrElement, "maxsize") || mrHasAttribute(mrElement, "data-maxsize")))
        {
            var maxFilesize = mrElement.getAttribute("data-maxsize");
            if(maxFilesize == null)
            {
                maxFilesize = mrElement.getAttribute("maxsize");
            }

            if(!mrIsEmptyElementValue(mrElement) && maxFilesize != "")
            {
                var fileList = mrElement.files;
                var betySizes = {
                    byte: {description: "byte", size: 1},
                    kb: {description: "Kilobyte", size: 1024},
                    mb: {description: "Megabyte", size: 1048576},
                    gb: {description: "Gigabyte", size: 1073741824}
                }
    
                var formatfilesizePattern = /^\d+$|(^\d+)byte$|(^\d+)kb$|(^\d+)mb$|(^\d+)gb$/i;
                if(formatfilesizePattern.test(maxFilesize))
                {
                    var formatfilesizePatterns =  {
                        byte: /^\d+$|(^\d+)byte$/i,
                        kb: /(^\d+)kb$/i,
                        mb: /(^\d+)mb$/i,
                        gb: /(^\d+)gb$/i
                    }
    
                    var countValidFilesize = 0;
                    var SumFilesizes = 0;
                    var maxFilesizeBytes = 0;
    
                    for(var i = 0; i < fileList.length; i++)
                    {
                        var file = fileList[i];
                        var filesize = file.size;
                        SumFilesizes += filesize;
                        if(formatfilesizePatterns.byte.test(maxFilesize))
                        {
                            maxFilesize = maxFilesize + "";
                            maxFilesize = maxFilesize.replace(/byte/i,"");
                            maxFilesize = maxFilesize * betySizes.byte.size;
                            if(filesize <= maxFilesize)
                            {
                                countValidFilesize++;
                            }
                            maxFilesizeBytes = maxFilesize;
                        }   else if(formatfilesizePatterns.kb.test(maxFilesize))
                        {
                            maxFilesize = maxFilesize + "";
                            maxFilesize = maxFilesize.replace(/kb/i,"");
                            maxFilesize = maxFilesize * betySizes.kb.size;
                            if(filesize <= maxFilesize)
                            {
                                countValidFilesize++;
                            }
                            maxFilesizeBytes = maxFilesize;
                        }   else if(formatfilesizePatterns.mb.test(maxFilesize))
                        {
                            maxFilesize = maxFilesize + "";
                            maxFilesize = maxFilesize.replace(/mb/i,"");
                            maxFilesize = maxFilesize * betySizes.mb.size;
                            if(filesize <= maxFilesize)
                            {
                                countValidFilesize++;
                            }
                            maxFilesizeBytes = maxFilesize;
                        }   else if(formatfilesizePatterns.gb.test(maxFilesize))
                        {
                            maxFilesize = maxFilesize + "";
                            maxFilesize = maxFilesize.replace(/gb/i,"");
                            maxFilesize = maxFilesize * betySizes.gb.size;
                            if(filesize <= maxFilesize)
                            {
                                countValidFilesize++;
                            }
                            maxFilesizeBytes = maxFilesize;
                        }
                    }
    
                    var isValidFilesize = false;
                    if(mrHasClass(mrElement, "mr-sum-maxsizes"))
                    {
                        if(SumFilesizes <= maxFilesizeBytes)
                        {
                            isValidFilesize = true;
                        }
                    }   else
                    {
                        if(countValidFilesize >= fileList.length)
                        {
                            isValidFilesize = true;
                        }
                    }
                    
                    if(isValidFilesize)
                    {
                        mrValidElement("mr-maxsize-fb");
                    }   else
                    {
                        mrInvalidElement("mr-maxsize-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The file size \"" + file + "\" is invalid maximum format size at input element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-maxsize-fb");
                }
            } 
            // else
            // {
            //     mrValidElement("mr-maxsize-fb");
            // }
        }
    }
    

    // VALIDATE IF THE ELEMENT VALUE IS A VALID MIME TYPE
    mrAccept(mrElement);
    function mrAccept(mrElement)
    {
        if(mrHasInputType(mrElement,"file") && mrHasAttribute(mrElement, "accept"))
        {
            if(!mrIsEmptyElementValue(mrElement) && mrElement.getAttribute("accept") != "")
            {
                var mimeTypes = mrGetMimeTypes(); 
                
                var acceptedFiles = mrElement.getAttribute("accept");
                acceptedFiles = acceptedFiles.replace(/[ ]/g,"");
                acceptedFiles = acceptedFiles.split(",");
                
                var selectedFiles = [];
                var fileList = mrElement.files;
                for(var i = 0; i < fileList.length; i++)
                {
                    var file = fileList[i];
                    var fileName = file.name;
                    fileName = fileName.split(".");
                    selectedFiles.push({mimeType: file.type, extension: "." + fileName[fileName.length -1]});
                }
                var acceptedFilesNormalized = [];
                for(var i = 0; i < acceptedFiles.length; i++)
                {
                    var acceptedFile = acceptedFiles[i];
                    if(acceptedFilesNormalized.indexOf(acceptedFile) < 0 && acceptedFiles != "")
                    {
                        acceptedFilesNormalized.push(acceptedFile);
                    };
                }
                acceptedFiles = acceptedFilesNormalized;
    
                
                for(var i = 0; i < acceptedFiles.length; i++)
                {
                    var acceptedFile = acceptedFiles[i];
                    if(mimeTypes[acceptedFile] != undefined)
                    {
                        if(acceptedFiles.indexOf(mimeTypes[acceptedFile].mimeType) < 0)
                        {
                            acceptedFiles[i] = mimeTypes[acceptedFile].mimeType;
                        }
                    };
                }
                
                acceptedFiles = acceptedFiles.toString();
    
                var mimeTypePatterns = {
                    video: {pattern: /video\/\*/, patternGlobal : /video\/[a-z0-9.-]+[a-z0-9]/g},
                    image: {pattern: /image\/\*/, patternGlobal : /image\/[a-z0-9.-]+[a-z0-9]/g},
                    audio: {pattern: /audio\/\*/, patternGlobal : /audio\/[a-z0-9.-]+[a-z0-9]/g},
                    application: {pattern: /application\/\*/,  patternGlobal : /application\/[a-z0-9.-]+[a-z0-9]/g},
                    defaultPattern: /^([a-z]+)\/(([a-z0-9. -]+)+([a-z0-9]+)$|\*$)/i
                };
    
                if(mimeTypePatterns.video.pattern.test(acceptedFiles))
                {
                    acceptedFiles = acceptedFiles.replace(mimeTypePatterns.video.patternGlobal,"");
                }
                if(mimeTypePatterns.image.pattern.test(acceptedFiles))
                {
                    acceptedFiles = acceptedFiles.replace(mimeTypePatterns.image.patternGlobal,"");
                }
                if(mimeTypePatterns.audio.pattern.test(acceptedFiles))
                {
                    acceptedFiles = acceptedFiles.replace(mimeTypePatterns.audio.patternGlobal,"");
                }
                if(mimeTypePatterns.application.pattern.test(acceptedFiles))
                {
                    acceptedFiles = acceptedFiles.replace(mimeTypePatterns.application.patternGlobal,"");
                }
    
                acceptedFilesSplit = acceptedFiles.split(",");
                acceptedFiles = [];
                var acceptedExtensions = [];
                var patternExtension = /(^(\.)(([a-z0-9]+))$)/;
                var acceptedFilesSintaxError = [];
                
                for(var i = 0; i < acceptedFilesSplit.length; i++)
                {
                    var acceptedFile = acceptedFilesSplit[i];
                    if(acceptedFile != "")
                    {
                        
                        if(mimeTypePatterns.defaultPattern.test(acceptedFile))
                        {
                            acceptedFiles.push(acceptedFile);
                        }   else
                        {
                            if(patternExtension.test(acceptedFile))
                            {
                                acceptedExtensions.push(acceptedFile);
                            }   else
                            {
                                acceptedFilesSintaxError.push(acceptedFile);
                            }
                        }
                    }
                }
    
                if(acceptedFilesSintaxError.length < 1)
                {
                    var countAcceptedFiles = 0;
                    for(var i = 0; i < selectedFiles.length; i++)
                    {
                        var selectedFile = selectedFiles[i];
                        var validAcceptedFile = false;

                        for(var j = 0; j < acceptedFiles.length; j++)
                        {
                            var acceptedFile = acceptedFiles[j];
                            var regularExpression = "" + acceptedFile + "";
                            var pattern = new RegExp(regularExpression);            
                            if(pattern.test(selectedFile.mimeType))
                            {
                                countAcceptedFiles++;
                                validAcceptedFile = true;
                                break;
                            }
                        }
                        if(!validAcceptedFile)
                        {
                            for(var j = 0; j < acceptedExtensions.length; j++)
                            {
                                if(acceptedExtensions.indexOf(selectedFile.extension) >= 0)
                                {
                                    countAcceptedFiles++;
                                    break;
                                }
                            }
                        }
                    }
                    
                    if(countAcceptedFiles >= fileList.length)
                    {
                        mrValidElement("mr-accept-fb");
                    }   else
                    {
                        mrInvalidElement("mr-accept-fb");
                    }   
                }   else
                {
                    acceptedFilesSintaxError = acceptedFilesSintaxError.toString();
                    console.error("MY RULES ERROR:\n" + "- The accepts type \"" + acceptedFilesSintaxError + "\" has SINTAX ERROR or kay not found at input element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-accept-fb");
                }
            }
            // else
            // {
            //     mrValidElement("mr-accept-fb");
            // }
        }
    }


    //VALIDATE IF THE ELEMENT'S VALUE IS A VALID NUMERIC
    mrNumber(mrElement);
    function mrNumber(mrElement)
    {
        if(mrHasClass(mrElement,"mr-number") || mrHasInputType(mrElement,"number"))
        {
            if(!mrIsEmptyElementValue(mrElement))
            {
                if(isNaN(mrElement.value))
                {
                    mrInvalidElement("mr-number-fb");
                }   else
                {
                    mrValidElement("mr-number-fb");
                }
            }   else
            {
                mrValidElement("mr-number-fb");
            }
        }
    }
    
   
    //VALIDATE THE MIN NUMBER OF SELECTED OPTIONS IN MULTIPLE SELECT AND MIN NUMBER OF SELECTED FILES IN INPUT TYPE FILE
    mrMinselect(mrElement);
    function mrMinselect(mrElement)
    {
        if(mrHasAttribute(mrElement, "minselect") || mrHasAttribute(mrElement, "data-minselect"))
        {
            if(mrElement.tagName == "SELECT" || mrHasInputType(mrElement, "file"))
            {
                if(!mrIsEmptyElementValue(mrElement))
                {
                    var minselect = mrElement.getAttribute("data-minselect");
                    if(minselect == null)
                    {
                        minselect = mrElement.getAttribute("minselect")
                    }

                    if(minselect != "")
                    {
                        if(mrIsInteger(minselect))
                        {
                            if(mrElement.tagName == "SELECT")
                            {
                                if(mrElement.selectedOptions.length < minselect)
                                {
                                    mrInvalidElement("mr-minselect-fb");
                                }   else
                                {
                                    mrValidElement("mr-minselect-fb");
                                }
                            }   else if(mrHasInputType(mrElement, "file"))
                            {
                                if(mrElement.files.length < minselect)
                                {
                                    mrInvalidElement("mr-minselect-fb");
                                }   else
                                {
                                    mrValidElement("mr-minselect-fb");
                                }
                            }
                        }   else
                        {
                            console.error("MY RULES ERROR:\n" + "- The attribute value of minselect is not a valid integer in element:");
                            console.error(mrElement);
                            mrInvalidElement("mr-minselect-fb");
                        }
                    }
                }
                // else
                // {
                //     mrValidElement("mr-minselect-fb");
                // }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The attribute minselect must be setted in multiple select element or input type file:");
                console.error(mrElement);
                mrInvalidElement("mr-minselect-fb");
            }
        }
    }
    

    //VALIDATE THE MAX NUMBER OF SELECTED OPTIONS IN MULTIPLE SELECT AND MAX NUMBER OF SELECTED FILES IN INPUT TYPE FILE
    mrMaxselect(mrElement);
    function mrMaxselect(mrElement)
    {
        if(mrHasAttribute(mrElement, "maxselect") || mrHasAttribute(mrElement, "data-maxselect"))
        {
            if(mrElement.tagName == "SELECT" || mrHasInputType(mrElement, "file"))
            {
                if(!mrIsEmptyElementValue(mrElement))
                {
                    var maxselect = mrElement.getAttribute("data-maxselect");
                    if(maxselect == null)
                    {
                        maxselect = mrElement.getAttribute("maxselect");
                    }

                    if(maxselect != "")
                    {
                        if(mrIsInteger(maxselect))
                        {
                            if(mrElement.tagName == "SELECT")
                            {
                                if(mrElement.selectedOptions.length > maxselect)
                                {
                                    mrInvalidElement("mr-maxselect-fb");
                                }   else
                                {
                                    mrValidElement("mr-maxselect-fb");
                                }
                            }   else if(mrHasInputType(mrElement, "file"))
                            {
                                if(mrElement.files.length > maxselect)
                                {
                                    mrInvalidElement("mr-maxselect-fb");
                                }   else
                                {
                                    mrValidElement("mr-maxselect-fb");
                                }
                            }
                        }   else
                        {
                            console.error("MY RULES ERROR:\n" + "- The value of attribute maxselect is not a valid integer in element:");
                            console.error(mrElement);
                            mrInvalidElement("mr-maxselect-fb");
                        }
                    }
                }   
                // else
                // {
                //     mrValidElement("mr-maxselect-fb");
                // }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The attribute maxselect must be setted in multiple select element or input type file:");
                console.error(mrElement);
                mrInvalidElement("mr-maxselect-fb");
            }
        }
    }


    //VALIDATE THE MIN NUMBER OF CHECKED CHECKBOX
    mrMincheck(mrElement);
    function mrMincheck(mrElement)
    {
        if(mrHasAttribute(mrElement, "mincheck") || mrHasAttribute(mrElement, "data-mincheck"))
        {
            if(mrElement.classList.contains("mr-checkbox"))
            {
                var mincheck = mrElement.getAttribute("data-mincheck");
                if(mincheck == null)
                {
                    mincheck = mrElement.getAttribute("mincheck");
                }

                if(mincheck != "")
                {
                    if(mrIsInteger(mincheck))
                    {
                        var mrChecked = 0;
                        var mrCheckboxs = mrElement.querySelectorAll("input[type=checkbox]");
        
                        for(var i = 0; i < mrCheckboxs.length; i++)
                        {
                            var mrCheckbox = mrCheckboxs[i];
                            if(mrCheckbox.checked && !mrIsEmptyElementValue(mrCheckbox))
                            {
                                mrChecked++;
                            }
                        }
        
                        if(mrChecked < mincheck)
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
                }
            }   else
            {
                console.error("MY RULES ERROR:\n" + "- The class .mr-checkbox is needed in element:");
                console.error(mrElement);
                mrInvalidElement("mr-mincheck-fb");
            }
        }
    }


    //VALIDATE THE MAX NUMBER OF CHECKED CHECKBOX
    mrMaxcheck(mrElement);
    function mrMaxcheck(mrElement)
    {
        if(mrHasAttribute(mrElement, "maxcheck") || mrHasAttribute(mrElement, "data-maxcheck"))
        {
            if(mrElement.classList.contains("mr-checkbox"))
            {
                var maxcheck = mrElement.getAttribute("data-maxcheck");
                if(maxcheck == null)
                {
                    maxcheck = mrElement.getAttribute("maxcheck");
                }
                if(maxcheck != "")
                {
                    if(mrIsInteger(maxcheck))
                    {
                        var mrChecked = 0;
                        var mrCheckboxs = mrElement.querySelectorAll("input[type=checkbox]");
        
                        for(var i = 0; i < mrCheckboxs.length; i++)
                        {
                            var mrCheckbox = mrCheckboxs[i];
                            if(mrCheckbox.checked && !mrIsEmptyElementValue(mrCheckbox))
                            {
                                mrChecked++;
                            }
                        }
        
                        if(mrChecked > maxcheck)
                        {
                            mrInvalidElement("mr-maxcheck-fb");
                        }   else
                        {
                            mrValidElement("mr-maxcheck-fb");
                        }
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
    }
    

    //VALIDATE THE WIDTH OF IMAGE INPUTED IN FILE INPUT
    mrWidth(mrElement);
    function mrWidth(mrElement)
    {
        if((mrHasAttribute(mrElement, "width") || mrHasAttribute(mrElement, "data-width")) && mrHasInputType(mrElement, "file"))
        {
            var acceptedWidth = mrElement.getAttribute("data-width");
            if(acceptedWidth == null)
            {
                acceptedWidth = mrElement.getAttribute("width");
            }

            if(acceptedWidth != "")
            {
                if(mrIsInteger(acceptedWidth) && acceptedWidth > 0)
                {
                    var fileList = mrElement.files;
                    var isValidImagesMimeTypes = true;
                    mrValidElement("mr-width-fb");
        
                    for(var i = 0; i < fileList.length; i++)
                    {  
                        var file = fileList[i];    
                        fileMimeType = file.type;
                        patternImageMimeType = /image\/[a-z0-9.-]+[a-z0-9]/;
        
                        if(!patternImageMimeType.test(fileMimeType))
                        {
                            isValidImagesMimeTypes = false;
                            break;
                        }
        
                        var fileReader = new FileReader;
                        fileReader.readAsDataURL(file);
        
                        fileReader.onload = function(e)
                        {
                            var result = e.target.result;
                            imageElementTest = newImageElementTest(result);
                            
                            var width = imageElementTest.naturalWidth;
    
                            if(width == 0)
                            {
                                return mrWidth(mrElement);
                            }
        
                            if(width != acceptedWidth)
                            {
                                mrInvalidElement("mr-width-fb");
                                mrForm.onsubmit = function (event)
                                {
                                    if(mrElement.classList.contains("mr-invalid"))
                                    {
                                        event.preventDefault();
                                    }
                                }
                            }
                        }
                    }
        
                    if(!isValidImagesMimeTypes)
                    {
                        mrInvalidElement("mr-width-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of attribute width is not a valid integer number or is less than 1 at the element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-width-fb");
                }
            }
        }
    }


    //VALIDATE THE IMAGE HEIGHT OF FILE INPUT
    mrHeight(mrElement);
    function mrHeight(mrElement)
    {
        if((mrHasAttribute(mrElement, "height") || mrHasAttribute(mrElement, "data-height")) && mrHasInputType(mrElement, "file"))
        {
            var acceptedHeight = mrElement.getAttribute("data-height");
            if(acceptedHeight == null)
            {
                acceptedHeight = mrElement.getAttribute("height");
            }

            if(acceptedHeight != "")
            {
                if(mrIsInteger(acceptedHeight) && acceptedHeight > 0)
                {
                    var fileList = mrElement.files;
                    var isValidImagesMimeTypes = true;
                    mrValidElement("mr-height-fb");
        
                    for(var i = 0; i < fileList.length; i++)
                    {  
                        var file = fileList[i];    
                        fileMimeType = file.type;
                        patternImageMimeType = /image\/[a-z0-9.-]+[a-z0-9]/;
        
                        if(!patternImageMimeType.test(fileMimeType))
                        {
                            isValidImagesMimeTypes = false;
                            break;
                        }
        
                        var fileReader = new FileReader;
                        fileReader.readAsDataURL(file);
        
                        fileReader.onload = function(e)
                        {
                            var result = e.target.result;
                            imageElementTest = newImageElementTest(result);
                            
                            var height = imageElementTest.naturalHeight;
    
                            if(height == 0)
                            {
                                return mrHeight(mrElement);
                            }
        
                            if(height != acceptedHeight)
                            {
                                mrInvalidElement("mr-height-fb");
                                mrForm.onsubmit = function (event)
                                {
                                    if(mrElement.classList.contains("mr-invalid"))
                                    {
                                        event.preventDefault();
                                    }
                                }
                            }
                        }
                    }
        
                    if(!isValidImagesMimeTypes)
                    {
                        mrInvalidElement("mr-height-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of attribute height is not a valid integer number or is less than 1 at the element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-height-fb");
                }
            }
        }
    }


    //VALIDATE THE MINIMUM WIDTH OF IMAGE INPUTED IN FILE INPUT
    mrMinwidth(mrElement);
    function mrMinwidth(mrElement)
    {
        if((mrHasAttribute(mrElement, "minwidth") || mrHasAttribute(mrElement, "data-minwidth")) && mrHasInputType(mrElement, "file"))
        {
            var acceptedMinWidth = mrElement.getAttribute("data-minwidth");
            if(acceptedMinWidth == null)
            {
                acceptedMinWidth = mrElement.getAttribute("minwidth");
            }

            if(acceptedMinWidth != "")
            {
                if(mrIsInteger(acceptedMinWidth) && acceptedMinWidth > 0)
                {
                    var fileList = mrElement.files;
                    var isValidImagesMimeTypes = true;
                    mrValidElement("mr-minwidth-fb");
        
                    for(var i = 0; i < fileList.length; i++)
                    {  
                        var file = fileList[i];    
                        fileMimeType = file.type;
                        patternImageMimeType = /image\/[a-z0-9.-]+[a-z0-9]/;
        
                        if(!patternImageMimeType.test(fileMimeType))
                        {
                            isValidImagesMimeTypes = false;
                            break;
                        }
        
                        var fileReader = new FileReader;
                        fileReader.readAsDataURL(file);
        
                        fileReader.onload = function(e)
                        {
                            var result = e.target.result;
                            imageElementTest = newImageElementTest(result);
                            
                            var width = imageElementTest.naturalWidth;
    
                            if(width == 0)
                            {
                                return mrMinwidth(mrElement);
                            }
    
                            if(width < acceptedMinWidth)
                            {
                                mrInvalidElement("mr-minwidth-fb");
                                mrForm.onsubmit = function (event)
                                {
                                    if(mrElement.classList.contains("mr-invalid"))
                                    {
                                        event.preventDefault();
                                    }
                                }
                            }
                        }
                    }
        
                    if(!isValidImagesMimeTypes)
                    {
                        mrInvalidElement("mr-minwidth-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of attribute minwidth is not a valid integer number or is less than 1 at the element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-minwidth-fb");
                }
            }
        }
    }


    //VALIDATE THE MAXIMUM WIDTH OF IMAGE INPUTED IN FILE INPUT 
    mrMaxwidth(mrElement);
    function mrMaxwidth(mrElement)
    {
        if((mrHasAttribute(mrElement, "maxwidth") || mrHasAttribute(mrElement, "data-maxwidth")) && mrHasInputType(mrElement, "file"))
        {
            var acceptedMaxWidth = mrElement.getAttribute("data-maxwidth");
            if(acceptedMaxWidth == null)
            {
                acceptedMaxWidth = mrElement.getAttribute("maxwidth");
            }

            if(acceptedMaxWidth != "")
            {
                if(mrIsInteger(acceptedMaxWidth) && acceptedMaxWidth > 0)
                {
                    var fileList = mrElement.files;
                    var isValidImagesMimeTypes = true;
                    mrValidElement("mr-maxwidth-fb");
        
                    for(var i = 0; i < fileList.length; i++)
                    { 
                        var file = fileList[i];     
                        fileMimeType = file.type;
                        patternImageMimeType = /image\/[a-z0-9.-]+[a-z0-9]/;
        
                        if(!patternImageMimeType.test(fileMimeType))
                        {
                            isValidImagesMimeTypes = false;
                            break;
                        }
        
                        var fileReader = new FileReader;
                        fileReader.readAsDataURL(file);
        
                        fileReader.onload = function(e)
                        {
                            var result = e.target.result;
                            imageElementTest = newImageElementTest(result);
                            
                            var width = imageElementTest.naturalWidth;
    
                            if(width == 0)
                            {
                                return mrMaxwidth(mrElement);
                            }
    
        
                            if(width > acceptedMaxWidth)
                            {
                                mrInvalidElement("mr-maxwidth-fb");
                                mrForm.onsubmit = function (event)
                                {
                                    if(mrElement.classList.contains("mr-invalid"))
                                    {
                                        event.preventDefault();
                                    }
                                }
                            }
                        }
                    }
        
                    if(!isValidImagesMimeTypes)
                    {
                        mrInvalidElement("mr-maxwidth-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of attribute maxwidth is not a valid integer number or is less than 1 at the element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-maxwidth-fb");
                }
            }
        }
    }


    //VALIDATE THE IMAGE MiNIMUM HEIGHT OF FILE INPUT
    mrMinheight(mrElement);
    function mrMinheight(mrElement)
    {
        if((mrHasAttribute(mrElement, "minheight") || mrHasAttribute(mrElement, "data-minheight")) && mrHasInputType(mrElement, "file"))
        {
            var acceptedMinHeight = mrElement.getAttribute("data-minheight");
            if(acceptedMinHeight == null)
            {
                acceptedMinHeight = mrElement.getAttribute("minheight");
            }

            if(acceptedMinHeight != "")
            {
                if(mrIsInteger(acceptedMinHeight) && acceptedMinHeight > 0)
                {
                    var fileList = mrElement.files;
                    var isValidImagesMimeTypes = true;
                    mrValidElement("mr-minheight-fb");
        
                    for(var i = 0; i < fileList.length; i++)
                    {    
                        var file = fileList[i];  
                        fileMimeType = file.type;
                        patternImageMimeType = /image\/[a-z0-9.-]+[a-z0-9]/;
        
                        if(!patternImageMimeType.test(fileMimeType))
                        {
                            isValidImagesMimeTypes = false;
                            break;
                        }
        
                        var fileReader = new FileReader;
                        fileReader.readAsDataURL(file);
        
                        fileReader.onload = function(e)
                        {
                            var result = e.target.result;
                            imageElementTest = newImageElementTest(result);
                            
                            var height = imageElementTest.naturalHeight;
    
                            if(height == 0)
                            {
                                return mrMinheight(mrElement);
                            }
    
                            if(height < acceptedMinHeight)
                            {
                                mrInvalidElement("mr-minheight-fb");
                                mrForm.onsubmit = function (event)
                                {
                                    if(mrElement.classList.contains("mr-invalid"))
                                    {
                                        event.preventDefault();
                                    }
                                }
                            }
                        }
                    }
        
                    if(!isValidImagesMimeTypes)
                    {
                        mrInvalidElement("mr-minheight-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of attribute minheight is not a valid integer number or is less than 1 at the element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-minheight-fb");
                }
            }
        }
    }


    //VALIDATE THE IMAGE MAXIMUM HEIGHT OF FILE INPUT
    mrMaxheight(mrElement);
    function mrMaxheight(mrElement)
    {
        if((mrHasAttribute(mrElement, "maxheight") || mrHasAttribute(mrElement, "data-maxheight")) && mrHasInputType(mrElement, "file"))
        {
            var acceptedMaxHeight = mrElement.getAttribute("data-maxheight");
            if(acceptedMaxHeight == null)
            {
                acceptedMaxHeight = mrElement.getAttribute("maxheight");
            }

            if(acceptedMaxHeight != "")
            {
                if(mrIsInteger(acceptedMaxHeight) && acceptedMaxHeight > 0)
                {
                    var fileList = mrElement.files;
                    var isValidImagesMimeTypes = true;
                    mrValidElement("mr-maxheight-fb");
        
                    for(var i = 0; i < fileList.length; i++)
                    {   
                        var file = fileList[i];   
                        fileMimeType = file.type;
                        patternImageMimeType = /image\/[a-z0-9.-]+[a-z0-9]/;
        
                        if(!patternImageMimeType.test(fileMimeType))
                        {
                            isValidImagesMimeTypes = false;
                            break;
                        }
        
                        var fileReader = new FileReader;
                        fileReader.readAsDataURL(file);
        
                        fileReader.onload = function(e)
                        {
                            var result = e.target.result;
                            imageElementTest =  newImageElementTest(result);
                            
                            var height = imageElementTest.naturalHeight;
    
                            if(height == 0)
                            {
                                return mrMaxheight(mrElement);
                            }
    
                            if(height > acceptedMaxHeight)
                            {
                                mrInvalidElement("mr-maxheight-fb");
                                mrForm.onsubmit = function (event)
                                {
                                    if(mrElement.classList.contains("mr-invalid"))
                                    {
                                        event.preventDefault();
                                    }
                                }
                            }
                        }
                    }
        
                    if(!isValidImagesMimeTypes)
                    {
                        mrInvalidElement("mr-maxheight-fb");
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- The value of attribute maxheight is not a valid integer number or is less than 1 at the element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-maxheight-fb");
                }
            }
        }
    }
    

    //VALIDATE THE IMAGE RESOLUTION OF FILE INPUT
    mrResolution(mrElement);
    function mrResolution(mrElement)
    {
        if((mrHasAttribute(mrElement, "resolution") || mrHasAttribute(mrElement, "data-resolution")) && mrHasInputType(mrElement, "file"))
        {
            var acceptedResolutions = mrElement.getAttribute("data-resolution");
            if(acceptedResolutions == null)
            {
                acceptedResolutions = mrElement.getAttribute("resolution");
            }

            if(acceptedResolutions != "")
            {
                var patternValidResolutions = /(^([\s]*[0-9]+)x([0-9]+[\s]*)$)|^([\s]*[0-9]+)x([0-9]+[\s]*)(,([\s]*[0-9]+)x([0-9]+)+[\s]*)*$/i;
                var isValidAcceptedResolutions = true;
        
                if(!patternValidResolutions.test(acceptedResolutions))
                {
                    isValidAcceptedResolutions = false;
                }   else
                {
                    acceptedResolutions = acceptedResolutions.replace(/[ ]/g, "");
                    acceptedResolutions = acceptedResolutions.replace(/[X]/g, "x");
                    acceptedResolutionsSplitted = acceptedResolutions.split(",");
        
                    for(var i = 0; i < acceptedResolutionsSplitted.length; i++)
                    {
                        var acceptedResolution = acceptedResolutionsSplitted[i];
                        acceptedResolution = acceptedResolution.split(/x/i);
                        if(!mrIsInteger(acceptedResolution[0]) && acceptedResolution[0] < 0)
                        {
                            isValidAcceptedResolutions = false;
                        }
                        if(!mrIsInteger(acceptedResolution[1]) && acceptedResolution[1] < 0)
                        {
                            isValidAcceptedResolutions = false;
                        }
                    }
                }
        
                if(isValidAcceptedResolutions)
                {
                    var fileList = mrElement.files;
                    if(fileList.length > 0)
                    {
                        var isValidImagesMimeTypes = true;
                        mrValidElement("mr-resolution-fb");
                        
                        for(var i = 0; i <= fileList.length; i++)
                        { 
    
                            var file = fileList[i];
                            if(i == fileList.length)
                            {
                                file = fileList[fileList.length-1];
                            }
            
                            fileMimeType = file.type;
                            patternImageMimeType = /image\/[a-z0-9.-]+[a-z0-9]/;
            
                            if(!patternImageMimeType.test(fileMimeType))
                            {
                                isValidImagesMimeTypes = false;
                                break;
                            }
            
                            var fileReader = new FileReader;
                            fileReader.readAsDataURL(file);
    
                            
                            fileReader.onload = function(e)
                            {
                                var result = e.target.result;
                                imageElementTest = newImageElementTest(result);
                            
                                var width = imageElementTest.naturalWidth;
                                var height = imageElementTest.naturalHeight;
                                var resolution = width + "x" + height;
    
                                if(width == 0 || height == 0)
                                {
                                    return mrResolution(mrElement);
                                }
            
                                var patternResolution = new RegExp(resolution)                            
                                if(!patternResolution.test(acceptedResolutions))
                                {
                                    mrInvalidElement("mr-resolution-fb");
                                    mrForm.onsubmit = function (event)
                                    {
                                        if(mrElement.classList.contains("mr-invalid"))
                                        {
                                            event.preventDefault();
                                        }
                                    }
                                }
                            }
                        }
            
                        if(!isValidImagesMimeTypes)
                        {
                            mrInvalidElement("mr-resolution-fb");
                        }
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- Is not a valid resolution valu at the element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-resolution-fb");
                }
            }
        }
    }
    

    //VALIDATE THE IMAGE ASPECT RATIO OF FILE INPUT
    mrRatio(mrElement);
    function mrRatio(mrElement)
    {
        if((mrHasAttribute(mrElement, "ratio") || mrHasAttribute(mrElement, "data-ratio")) && mrHasInputType(mrElement, "file"))
        {
            var acceptedRatios = mrElement.getAttribute("data-ratio");
            if(acceptedRatios == null)
            {
                acceptedRatios = mrElement.getAttribute("ratio");
            }
            
            if(acceptedRatios != "")
            {
                var patternValidRatios = /((^([\s]*[0-9]+)\.([0-9]+[\s]*)$)|(^([\s]*[0-9]+):([0-9]+[\s]*)$)|(^([\s]*(1)[\s]*)$))|((^([\s]*[0-9]+)\.([0-9]+[\s]*))|(^([\s]*[0-9]+):([0-9]+[\s]*))|(^([\s]*(1)[\s]*)))(,((([\s]*[0-9]+)\.([0-9]+[\s]*))|(([\s]*[0-9]+):([0-9]+[\s]*))|(([\s]*(1)[\s]*))))*$/;
                var isValidAcceptedRatios = true;
        
                if(!patternValidRatios.test(acceptedRatios))
                {
                    isValidAcceptedRatios = false;
                }   else
                {
                    acceptedRatios = acceptedRatios.replace(/[ ]/g, "");
                    acceptedRatios = acceptedRatios.split(",");
                    var patternDivisionRatio = /^([\s]*[0-9]+):([0-9]+[\s]*)$/;
    
                    var acceptedRatiosNormalized = [];
                    for(var i = 0; i < acceptedRatios.length; i++)
                    {
                        
                        if(patternDivisionRatio.test(acceptedRatios[i]))
                        {
                            var divisionRatioSplitted = acceptedRatios[i].split(":");
                            acceptedRatios[i] = divisionRatioSplitted[0]/divisionRatioSplitted[1];
                        }
    
                        acceptedRatios[i] = Number(acceptedRatios[i]);
                        acceptedRatios[i] = acceptedRatios[i].toFixed(3);
    
                        if(acceptedRatiosNormalized.indexOf(acceptedRatios[i]) < 0)
                        {
                            acceptedRatiosNormalized.push(acceptedRatios[i]);
                        }
                    }
    
                    acceptedRatios = acceptedRatiosNormalized;
                    acceptedRatios = acceptedRatios.toString();
                    acceptedRatiosNormalized = undefined;
                }
    
                if(isValidAcceptedRatios)
                {
                    var fileList = mrElement.files;
                    if(fileList.length > 0)
                    {
                        var isValidImagesMimeTypes = true;
                        mrValidElement("mr-ratio-fb");
    
                        for(var i = 0; i <= fileList.length; i++)
                        {  
                            var file = fileList[i];
                            if(i == fileList.length)
                            {
                                file = fileList[fileList.length-1];
                            }
            
                            fileMimeType = file.type;
                            patternImageMimeType = /image\/[a-z0-9.-]+[a-z0-9]/;
            
                            if(!patternImageMimeType.test(fileMimeType))
                            {
                                isValidImagesMimeTypes = false;
                                break;
                            }
            
                            var fileReader = new FileReader;
                            fileReader.readAsDataURL(file);
                            
                            fileReader.onload = function(e)
                            {
                                var result = e.target.result;
                                imageElementTest = newImageElementTest(result);
                            
                                var width = imageElementTest.naturalWidth;
                                var height = imageElementTest.naturalHeight;
                                var ratio = width/height;
                                ratio = ratio.toFixed(3);
    
                                if(width == 0 || height == 0)
                                {
                                    return mrRatio(mrElement);
                                }
            
                                var patternRatio = new RegExp(ratio);
    
                                if(!patternRatio.test(acceptedRatios))
                                {
                                    mrInvalidElement("mr-ratio-fb");
                                    mrForm.onsubmit = function (event)
                                    {
                                        if(mrElement.classList.contains("mr-invalid"))
                                        {
                                            event.preventDefault();
                                        }
                                    }
                                }
                            }
                        }
            
                        if(!isValidImagesMimeTypes)
                        {
                            mrInvalidElement("mr-ratio-fb");
                        }
                    }
                }   else
                {
                    console.error("MY RULES ERROR:\n" + "- Is not a valid ratio valu at the element:");
                    console.error(mrElement);
                    mrInvalidElement("mr-ratio-fb");
                }
            }
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

                for(var i = 0; i < mrCheckElements.length; i++)
                {
                    var mrCheckElement = mrCheckElements[i];
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

                for(var i = 0; i < mrCheckElements.length; i++)
                {
                    var mrCheckElement = mrCheckElements[i];
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
    function mrCompareValue(element, attributeName, typeOfComparation)
    {
        if(mrHasAttribute(element, attributeName))
        {
            switch (typeOfComparation)
            {
                case ">":  //COMPARE IF ELEMENT'S VALUE IS GREATER THAN ATTRIBUTE'S VALUE
                    return Number(element.value) > Number(element.getAttribute(attributeName));
                case "<": //COMPARE IF ELEMENT'S VALUE IS LESS THAN ATTRIBUTE'S VALUE
                    return Number(element.value) < Number(element.getAttribute(attributeName));
                case "=": //COMPARE IF ELEMENT'S VALUE IS IQUAL TO ATTRIBUTE'S VALUE
                    return Number(element.value) == Number(element.getAttribute(attributeName));
            }
        }
        return false;
    }

    //COMPARE TWO DATE'S VALUE
    function mrCompareDates(date1, date2, typeOfComparation, dateFormat)
    {
        date1 = mrConvertDateFormat(date1, dateFormat, "YYYY-MM-DD");
        date1 = date1.fullDate;

        date2 = mrConvertDateFormat(date2, dateFormat, "YYYY-MM-DD");
        date2 = date2.fullDate;

        switch (typeOfComparation)
        {
            case ">": //COMPARE IF DATE 1 IS GREATER THAN DATE 2
                return date1 > date2;
            case "<": //COMPARE IF DATE 1 IS LESS THAN DATE 2
                return date1 < date2;
            case "=": //COMPARE IF DATA 1 IS IQUAL TO DATE 2
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
    function mrGetfullDate(dateFormat)
    {
        if(dateFormat == null || dateFormat == "")
        {
            dateFormat = "YYYY-MM-DD";
        }
        if(!mrIsValidDateFormat(dateFormat))
        {
            return false;
        }

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

        var mrFullDate = mrConvertDateFormat(mrDateString, "YYYY-MM-DD", dateFormat);
        mrFulldate = mrFullDate.fullDate;

        return mrFullDate.fullDate;
    }

    // FUNCTION TO GET DATE FORMATS
    function mrGetdateFormats()
    { 
        const DATEFORMATS = [
            "YYYY-MM-DD",
            "YYYY/MM/DD", 
            "YYYY.MM.DD", 
            "YYYY,MM,DD",
            "DD-MM-YYYY",
            "DD/MM/YYYY",
            "DD.MM.YYYY",
            "DD,MM,YYYY",
            "MM-DD-YYYY",
            "MM/DD/YYYY",
            "MM.DD.YYYY",
            "MM,DD,YYYY"
        ];
        return DATEFORMATS;
    }

    // FUNCTION TO VERIFY IF IS VALID DATE FORMAT
    function mrIsValidDateFormat(dateFormat)
    {
        var dateFormats = mrGetdateFormats();
        
        var isValidDateFormat = false;
        for(var i = 0; i < dateFormats.length; i++)
        {
            var df = dateFormats[i];
            var dateFormatRegularExpression = "^" + df + "$";
            dateFormatRegularExpression = dateFormatRegularExpression.replace("YYYY", "(YYYY){1}");
            dateFormatRegularExpression = dateFormatRegularExpression.replace("MM", "(MM){1}");
            dateFormatRegularExpression = dateFormatRegularExpression.replace("DD", "(DD){1}");
            dateFormatRegularExpression = dateFormatRegularExpression.replace(/[-]/g, "[-]{1}");
            dateFormatRegularExpression = dateFormatRegularExpression.replace(/[/]/g, "[/]{1}");
            dateFormatRegularExpression = dateFormatRegularExpression.replace(/[.]/g, "[.]{1}");
            dateFormatRegularExpression = dateFormatRegularExpression.replace(/[,]/g, "[,]{1}");
            
            var dateFormatPattern = new RegExp(dateFormatRegularExpression);
            if(dateFormatPattern.test(dateFormat))
            {
                isValidDateFormat = true;
            }
        }
        return isValidDateFormat;
    }


    // FUNCTION TO CONVERT THE FORMAT OF DATE
    function mrConvertDateFormat(date , dateFormat, toDateFormat)
    {
        var dateFormats = mrGetdateFormats();

        if(dateFormat == "" || dateFormat == null)
        {
            dateFormat = dateFormats[0];
        }
        if(toDateFormat == "" || toDateFormat == null)
        {
            toDateFormat = dateFormats[0];
        }
      
        var mrYear;
        var mrMonth;
        var mrDay
        
        if(!mrIsValidDateFormat)
        {
            return false;
        }

        if(dateFormat == dateFormats[0] || dateFormat == dateFormats[1] || dateFormat == dateFormats[2])
        {
            mrYear = date.slice(0, 4);
            mrMonth = date.slice(5, 7);
            mrDay = date.slice(8, 10);
        } else if(dateFormat == dateFormats[3] || dateFormat == dateFormats[4] || dateFormat == dateFormats[5])
        {
            mrDay = date.slice(0, 2);
            mrMonth = date.slice(3, 5);
            mrYear = date.slice(6, 10);
        } else if(dateFormat == dateFormats[6] || dateFormat == dateFormats[7] || dateFormat == dateFormats[8])
        {
            mrmonth = date.slice(0, 2);
            mrDay = date.slice(3, 5);
            mrYear = date.slice(6, 10);
        }

        switch(toDateFormat) 
        {
            case dateFormats[0]:
                return {fullDate: mrYear + "-" + mrMonth + "-" + mrDay, year: mrYear, month: mrMonth, day: mrDay};
            
            case dateFormats[1]:
                return {fullDate: mrYear + "/" + mrMonth + "/" + mrDay, year: mrYear, month: mrMonth, day: mrDay};

            case dateFormats[2]:
                return {fullDate: mrYear + "." + mrMonth + "." + mrDay, year: mrYear, month: mrMonth, day: mrDay};
                
            case dateFormats[3]:
                return {fullDate: mrYear + "," + mrMonth + "," + mrDay, year: mrYear, month: mrMonth, day: mrDay};

            case dateFormats[4]:
                return {fullDate: mrDay + "-" + mrMonth + "-" + mrYear, year: mrYear, month: mrMonth, day: mrDay};
            
            case dateFormats[5]:
                return {fullDate: mrDay + "/" + mrMonth + "/" + mrYear, year: mrYear, month: mrMonth, day: mrDay};

            case dateFormats[6]:
                return {fullDate: mrDay + "." + mrMonth + "." + mrYear, year: mrYear, month: mrMonth, day: mrDay};

            case dateFormats[7]:
                return {fullDate: mrDay + "," + mrMonth + "," + mrYear, year: mrYear, month: mrMonth, day: mrDay};

            case dateFormats[8]:
                return {fullDate: mrMonth + "-" + mrDay + "-" + mrYear, year: mrYear, month: mrMonth, day: mrDay};
            
            case dateFormats[9]:
                return {fullDate: mrMonth + "/" + mrDay + "/" + mrYear, year: mrYear, month: mrMonth, day: mrDay};

            case dateFormats[10]:
                return {fullDate: mrMonth + "." + mrDay + "." + mrYear, year: mrYear, month: mrMonth, day: mrDay};

            case dateFormats[11]:
                return {fullDate: mrMonth + "," + mrDay + "," + mrYear, year: mrYear, month: mrMonth, day: mrDay};
        }

    }


    //VERIFY IF IS VALID FULL DATE
    function mrIsValidFullDate(date, dateFormat)
    {
        var dateFormats = mrGetdateFormats();

        if(dateFormat == "" || dateFormat == null)
        {
            dateFormat = dateFormats[0];
        }

        var isValidDateFormat = mrIsValidDateFormat(dateFormat);

        if(isValidDateFormat)
        {
            var standardDate = mrConvertDateFormat(date, dateFormat, "YYYY-MM-DD");
            var year = standardDate.year;
            var month = standardDate.month;
            var day = standardDate.day;
            
            var dateRegularExpression;
            switch(dateFormat) 
            {
                case dateFormats[0]:
                    dateRegularExpression = "(^[0-9]{4})[-]{1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[-]{1}([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})$";
                    break;
                case dateFormats[1]:
                    dateRegularExpression = "(^[0-9]{4})[/]{1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[/]{1}([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})$";
                    break;

                case dateFormats[2]:
                    dateRegularExpression = "(^[0-9]{4})[.]{1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[.]{1}([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})$";
                    break;
                    
                case dateFormats[3]:
                    dateRegularExpression = "(^[0-9]{4})[,]{1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[,]{1}([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})$";
                    break;

                case dateFormats[4]:
                    dateRegularExpression = "^([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})[-]{1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[-]{1}([0-9]{4})$";
                    break;
                
                case dateFormats[5]:
                    dateRegularExpression = "^([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})[/]{1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[/]{1}([0-9]{4})$";
                    break;

                case dateFormats[6]:
                    dateRegularExpression = "^([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})[.]{1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[.]{1}([0-9]{4})$";
                    break;

                case dateFormats[7]:
                    dateRegularExpression = "^([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})[,]{1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[,]{1}([0-9]{4})$";
                    break;

                case dateFormats[8]:
                    dateRegularExpression = "^([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[-]{1}([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})[-]{1}([0-9]{4})$";
                    break;
                
                    case dateFormats[9]:
                    dateRegularExpression = "^([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[/]{1}([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})[/]{1}([0-9]{4})$";
                    break;

                case dateFormats[10]:
                    dateRegularExpression = "^([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[.]{1}([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})[.]{1}([0-9]{4})$";
                    break;

                case dateFormats[11]:
                    dateRegularExpression = "^([0]{1}[1-9]{1}|[1]{1}[0-2]{1})[,]{1}([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[0-1]{1})[,]{1}([0-9]{4})$";
                    break;
            }

            var datePattern = new RegExp(dateRegularExpression);
            if(!datePattern.test(date))
            {
                return false;
            }
            if(year == "0000")
            {
                return false;
            }

            var dateObject = new Date(year + "-" + month + "-" + day);
            if(Number.isNaN(dateObject.getDate()))
            {
                return false;
            }
            return true;
        } else
        {
            console.error("MY RULES ERROR:\n" + "- Invalid date format \"" + dateFormat + "\" set at: ");
            
            var mrDateInputs = mrForm.querySelectorAll(".mr-date");
            
            for(var i = 0; i < mrDateInputs.length; i++)
            {
                var mrDateInput = mrDateInputs[i];
                if(mrDateInput.getAttribute("dateformat") == dateFormat)
                {
                    console.log(mrDateInput);
                }
            }
            return false;
        }
    }

    function mrGetMimeTypes()
    {
        var mimeTypes = {
            json: {extension: ".json", documentKind: "JSON format", mimeType: "application/json"},
            jsonld: {extension: ".jsonld", documentKind: "JSON-LD format", mimeType: "application/ld+json"},
            mid: {extension: ".mid", documentKind: "Musical Instrument Digital Interface (MIDI)", mimeType: "audio/midi"},
            midi: {extension: ".midi", documentKind: "Musical Instrument Digital Interface (MIDI)", mimeType: "audio/x-midi"},
            mjs: {extension: ".mjs", documentKind: "JavaScript module", mimeType: "text/javascript"},
            mp3: {extension: ".mp3", documentKind: "MP3 audio", mimeType: "audio/mpeg"},
            cda: {extension: ".cda", documentKind: "CD audio", mimeType: "application/x-cdf"},
            mp4: {extension: ".mp4", documentKind: "MP4 audio", mimeType: "video/mp4"},
            mpeg: {extension: ".mpeg", documentKind: "MPEG Video", mimeType: "video/mpeg"},
            doc: {extension: ".doc", documentKind: "Microsoft Word - Rich Test Format", mimeType: "application/msword"},
            docx: {extension: ".docx", documentKind: "Microsoft Word Document", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
            mpkg: {extension: ".mpkg", documentKind: "Apple Installer Package", mimeType: "application/vnd.apple.installer+xml"},
            odp: {extension: ".odp", documentKind: "OpenDocument presentation document", mimeType: "application/vnd.oasis.opendocument.presentation"},
            ods: {extension: ".ods", documentKind: "OpenDocument spreadsheet document", mimeType: "application/vnd.oasis.opendocument.spreadsheet"},
            odt: {extension: ".odt", documentKind: "OpenDocument text document", mimeType: "application/vnd.oasis.opendocument.text"},
            oga: {extension: ".oga", documentKind: "OGG audio", mimeType: "audio/ogg"},
            ogv: {extension: ".ogv", documentKind: "OGG video", mimeType: "video/ogg"},
            ogx: {extension: ".ogx", documentKind: "OGG", mimeType: "application/ogg"},
            opus: {extension: ".opus", documentKind: "Opus audio", mimeType: "audio/opus"},
            otf: {extension: ".otf", documentKind: "OpenType font", mimeType: "font/otf"},
            png: {extension: ".png", documentKind: "Portable Network Graphics", mimeType: "image/png"},
            jpeg: {extension: ".jpeg", documentKind: "JPGE Image", mimeType: "image/jpeg"},
            pdf: {extension: ".pdf", documentKind: "Adobe Portable Document Format(PDF)", mimeType: "application/pdf"},
            php: {extension: ".php", documentKind: "Hypertext Preprocessor (Personal Home Page)", mimeType: "application/x-httpd-php"},
            ppt: {extension: ".ppt", documentKind: "Microsoft PowerPoint", mimeType: "application/vnd.ms-powerpoint"},
            pptx: {extension: ".pptx", documentKind: "Microsoft PowerPoint (OpenXML)", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
            rar: {extension: ".rar", documentKind: "RAR archive", mimeType: "application/vnd.rar"},
            rtf: {extension: ".rtf", documentKind: "Rich Text Format (RTF)", mimeType: "application/rtf"},
            sh: {extension: ".sh", documentKind: "Bourne shell script", mimeType: "application/x-sh"},
            svg: {extension: ".svg", documentKind: "Scalable Vector Graphics (SVG)", mimeType: "image/svg+xml"},
            swf: {extension: ".swf", documentKind: "Small web format (SWF) or Adobe Flash document", mimeType: "application/x-shockwave-flash"},
            tar: {extension: ".tar", documentKind: "Tape Archive (TAR)", mimeType: "application/x-tar"},
            tif: {extension: ".tif", documentKind: "Tagged Image File Format (TIFF)", mimeType: "image/tiff"},
            tiff: {extension: ".tiff", documentKind: "Tagged Image File Format (TIFF)", mimeType: "image/tiff"},
            ts: {extension: ".ts", documentKind: "MPEG transport stream", mimeType: "video/mp2t"},
            ttf: {extension: ".ttf", documentKind: "TrueType Font", mimeType: "font/ttf"},
            txt: {extension: ".txt", documentKind: "Text, (generally ASCII or ISO 8859-n)", mimeType: "text/plain"},
            vsd: {extension: ".vsd", documentKind: "Microsoft Visio", mimeType: "application/vnd.visio"},
            wav: {extension: ".wav", documentKind: "Waveform Audio Format", mimeType: "audio/wav"},
            weba: {extension: ".weba", documentKind: "WEBM audio", mimeType: "audio/webm"},
            webm: {extension: ".webm", documentKind: "WEBM video", mimeType: "video/webm"},
            webp: {extension: ".webp", documentKind: "WEBP image", mimeType: "image/webp"},
            woff: {extension: ".woff", documentKind: "Web Open Font Format (WOFF)", mimeType: "font/woff"},
            woff2: {extension: ".woff2", documentKind: "Web Open Font Format (WOFF)", mimeType: "font/woff2"},
            xhtml: {extension: ".xhtml", documentKind: "XHTML", mimeType: "application/xhtml+xml"},
            xls: {extension: ".xls", documentKind: "Microsoft Excel", mimeType: "application/vnd.ms-excel"},
            xlsx: {extension: ".xlsx", documentKind: "Microsoft Excel (OpenXML)", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
            pub: {extension: ".pub", documentKind: "Microsoft Publisher", mimeType: "application/vnd.ms-publisher"},
            accdb: {extension: ".accdb", documentKind: "Microsoft Access", mimeType: "application/msaccess"},
            xml: {extension: ".xml", documentKind: "XML - (if not readable from casual users)", mimeType: "application/xml"},
            xmltext: {extension: ".xml", documentKind: "XML - (if readable from casual users)", mimeType: "text/xml"},
            xul: {extension: ".xul", documentKind: "XUL", mimeType: "application/vnd.mozilla.xul+xml"},
            zip: {extension: ".zip", documentKind: "ZIP archive", mimeType: "application/zip"},
            video3gp: {extension: ".3gp", documentKind: "3GPP - audio/video container (if it contains video)", mimeType: "video/3gpp"},
            audio3gp: {extension: ".3gp", documentKind: "3GPP - audio/video container (if it doesn't contain video)", mimeType: "audio/3gpp"},
            video3gp2: {extension: ".3gp2", documentKind: "3GPP - audio/video container (if it contains video)", mimeType: "video/3gpp2"},
            audio3gp2: {extension: ".3gp2", documentKind: "3GPP2 - audio/video container (if it doesn't contain video)", mimeType: "audio/3gpp2"},
            zip7z: {extension: ".7z", documentKind: "7-zip - archive", mimeType: "application/x-7z-compressed"}
        };

        return mimeTypes;
    }
    
    // FUNCTION TO VALIDATE AN IP
    function mrIsIP(ip)
    {
        if
        (
            mrIsIPv4DotDecimalNotation(ip) ||
            mrIsIPv4DotBinaryNotation(ip) ||
            mrIsIPv4DotHexadecimalNotation(ip) ||
            mrIsIPv4DotOctalByteNotation(ip) ||
            mrIsIPv6HexadecimalNotation(ip) ||
            mrIsIPv6BinaryNotation(ip)
        )
        {
            return true;
        }
        return false;
    }
    
    // FUNCTION TO VALIDATE AN IPv4
    function mrIsIPv4(ip)
    {
        if
        (
            mrIsIPv4DotDecimalNotation(ip) ||
            mrIsIPv4DotBinaryNotation(ip) ||
            mrIsIPv4DotHexadecimalNotation(ip) ||
            mrIsIPv4DotOctalByteNotation(ip)
        )
        {
            return true;
        }
        return false;
    }
    
    // FUNCTION TO VALIDATE AN IPv6
    function mrIsIPv6(ip)
    {
        if (mrIsIPv6HexadecimalNotation(ip) || mrIsIPv6BinaryNotation(ip))
        {
            return true;
        }
        return false;
    }

    
    // FUNCTION TO VALIDATE AN IPv4 DOT-DECIMAL NOTATION
    function mrIsIPv4DotDecimalNotation(ip)
    {
        var ipv4RegularExpression = "^([0-9]{1,3})(([.][0-9]{1,3}){3})$";
        var ipv4Pattern = new RegExp(ipv4RegularExpression);

        if(ipv4Pattern.test(ip))
        {
            var mrOctets = ip.split(".");
            
            for (var i = 0; i < mrOctets.length; i++)
            {
                var mrOctet = mrOctets[i];
                if(mrOctet < 0 || mrOctet > 255)
                {
                    return false
                }
            }
            return true;
        }
        return false;
    }

    
    // FUNCTION TO VALIDATE AN IPv4 DOT-BINARY NOTATION
    function mrIsIPv4DotBinaryNotation(ip)
    {
        var ipv4RegularExpression = "^(([0-1]){8})(([.][0-1]{8}){3})$";
        var ipv4Pattern = new RegExp(ipv4RegularExpression);

        if(ipv4Pattern.test(ip))
        {
            return true;
        }
        return false;
    }

    
    // FUNCTION TO VALIDATE AN IPv4 DOT-HEXADECIMAL NOTATION
    function mrIsIPv4DotHexadecimalNotation(ip)
    {
        var ipv4RegularExpression = "^([0][x][0-9A-Fa-f]{2})(([.][0][x][0-9A-Fa-f]{2}){3})$";
        var ipv4Pattern = new RegExp(ipv4RegularExpression);

        if(ipv4Pattern.test(ip))
        {
            ipWithoutPrefix =  ip.replace(/0x/g,"");
            ipWithoutPrefix = ipWithoutPrefix.toUpperCase();
            var mrOctets = ipWithoutPrefix.split(".");

            for (var i = 0; i < mrOctets.length; i++)
            {
                var mrOctet = mrOctets[i] + "";

                if(mrOctet > "FF")
                {
                    return false
                }
            }
            return true;
        }
        return false;
    }

    
    // FUNCTION TO VALIDATE AN IPv4 DOT-OCTAL BYTE NOTATION
    function mrIsIPv4DotOctalByteNotation(ip)
    {
        var ipv4RegularExpression = "^([0][0-7]{3})(([.][0][0-7]{3}){3})$";
        var ipv4Pattern = new RegExp(ipv4RegularExpression);

        if(ipv4Pattern.test(ip))
        {
            var mrOctets = ipWithoutPrefix.split(".");

            for (var i = 0; i < mrOctets.length; i++)
            {
                var mrOctet = mrOctets[i] + "";

                if(mrOctet > "0377")
                {
                    return false
                }
            }
            return true;
        }
        return false;
    }

    
    // FUNCTION TO VALIDATE AN IPv6 DOT-HEXADECIMAL NOTATION
    function mrIsIPv6HexadecimalNotation(ip)
    {
        let ipv6RegularExpression = "^([0-9A-Fa-f]{4}|[0-9]{1,4}|[:]{2}[0-9A-Fa-f]{4}|[:]{2}[0-9]{1,4})(([:][0-9A-Fa-f]{4}|[:][0-9]{1,4}|[:]{2}[0-9A-Fa-f]{4}|[:]{2}[0-9]{1,4}){0,7}([:]{2}){0,1})$";
        let ipv6Pattern = new RegExp(ipv6RegularExpression);

        let firstIndexOfAbbreviation = ip.indexOf("::");
        let lastIndexOfAbbreviation = ip.lastIndexOf("::");
        
        if(firstIndexOfAbbreviation != lastIndexOfAbbreviation)
        {
            return false;
        }

        if(ipv6Pattern.test(ip))
        {
            ip = ip.toUpperCase();
            let mr16Bits = ip.split(":");

            if(firstIndexOfAbbreviation < 0 && mr16Bits.length != 8)
            {
                return false;
            }

            for (let i = 0; i < mr16Bits.length; i++)
            {
                let mr16Bit = mr16Bits[i];
                if(mr16Bit != "")
                {
                    if(mr16Bit > "FFFF")
                    {
                        return false
                    }
                }
            }
            return true;
        }
        return false;
    }

    // FUNCTION TO VALIDATE AN IPv6 DOT-BINARY NOTATION
    function mrIsIPv6BinaryNotation(ip)
    {
        var ipv4RegularExpression = "^(([0-1]){16})(([.][0-1]{16}){7})$";
        var ipv4Pattern = new RegExp(ipv4RegularExpression);

        if(ipv4Pattern.test(ip))
        {
            return true;
        }
        return false;
    }

    // FUNCTION TO CREATE A NEW HIDDEN IMAGE TO MAKE TEST OF VALIDATIONS OF DIMENTIONS OF IMAGE
    function newImageElementTest(imgSrc)
    {
        
        var id = "mr-image-element-test-id";

        var newImageElementTest = document.getElementById(id);
        var appendImageElementTest = false;
        if(newImageElementTest == null)
        {
            appendImageElementTest =  true;
            newImageElementTest = document.createElement("IMG");
        }

        newImageElementTest.setAttribute("hidden","");
        newImageElementTest.setAttribute("id", id);

        if(imgSrc != null)
        {
            newImageElementTest.setAttribute("src", imgSrc);
        }

        if(appendImageElementTest == true)
        {
            document.body.appendChild(newImageElementTest);
        }

        return document.querySelector("#"+id);
    }


    // FUNCTION TO GET THE ACCEPTED PRINTABLE CHARS OF AN E-MAIL AND USERNAME
    function mrGetPrintableChars(mrElement, mrIsUsername = false)
    {
        let mrDataPrintableChars = mrElement.getAttribute("data-printablechars");
        if(mrDataPrintableChars == null)
        {
            mrDataPrintableChars = mrElement.getAttribute("printablechars");
        }

        let MR_ACCEPTED_PRINTABLE_SPECIAL_CHARS = "!#$%&'*+-/=?^_`{|}~.@";
        let mrDefaultUsernamePrintableChars = "-_."
       
        let mrPrintableChars;
        if(mrIsUsername)
        {
            mrPrintableChars  = mrDefaultUsernamePrintableChars;
        }   else
        {
            mrPrintableChars = MR_ACCEPTED_PRINTABLE_SPECIAL_CHARS;
        }

        if(mrDataPrintableChars != null && mrDataPrintableChars != "")
        {
            mrPrintableChars = "";
            mrDataPrintableChars = mrDataPrintableChars.split("");

            for(mrSpecialChar of mrDataPrintableChars)
            {
                if(MR_ACCEPTED_PRINTABLE_SPECIAL_CHARS.indexOf(mrSpecialChar) >= 0)
                {
                    if(mrPrintableChars.indexOf(mrSpecialChar < 0))
                    {
                        mrPrintableChars += mrSpecialChar;
                    }
                }
            }
            if(mrPrintableChars == "")
            {
                if(mrIsUsername)
                {
                    mrPrintableChars  = mrDefaultUsernamePrintableChars;
                }   else
                {
                    mrPrintableChars = MR_ACCEPTED_PRINTABLE_SPECIAL_CHARS;
                }
            }
        }
        mrPrintableChars = mrPrintableChars.replace("-","\\-");
        return mrPrintableChars;
    }



    //COMPARE THE ELEMENT'S VALUE LENGTH
    function mrCompareValueLength(element, comparationLength, typeOfComparation)
    {
        switch (typeOfComparation)
        {
            case ">": //COMPARE IF ELEMENT'S VALUE IS GREATER THAN THE COMPARATION LENGTH
                return element.value.length > comparationLength;
            case "<": //COMPARE IF ELEMENT'S VALUE IS LESS THAN THE COMPARATION LENGTH
                return element.value.length < comparationLength;
            case "=": //COMPARE IF ELEMENT'S VALUE IS IQUEL TO THE COMPARATION LENGTH
                return element.value.length == comparationLength;
        }
        return false;
    }

    //VERIFY IF THE VALUE IS INTEGER
    function mrIsInteger(value)
    {
        if(!isNaN(Number(value)) || value != "" || value != null)
        {
            try
            {
                return Number.isInteger(Number(value));
            } catch (error)
            {
                var patternDecimalNumber = /\.|(e-)/i;
                if(patternDecimalNumber.test(value))
                {
                    return false;
                }
                return true;
            }
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