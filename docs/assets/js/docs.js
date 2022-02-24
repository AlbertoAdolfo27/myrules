window.addEventListener("load", function() { 

	// DIPLAY MODAL WHEN THE FORM IS VALID
	let innerHTMLModal = 
		"<div class='modal fade' id='div-modal'>"
			+"<div class='modal-dialog modal-sm'>"
				+"<div class='modal-content'>"
					+"<div class='modal-header'>"
						+"<h4 class='modal-title  mx-auto'><i class='text-success far fa-check-circle'></i> Form validated</h4>"
					+"</div>"
					+"<div class='modal-body'>"
						+"The form will be submitted"
					+"</div>"
					+"<div class='modal-footer'>"
						+"<button type='button' class='btn default-bg-color' data-dismiss='modal'>Close</button>"
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>";
	$("#main-container").append(innerHTMLModal);

	let forms = document.forms;
	for(var i = 0; i < forms.length; i++){
		let form = forms[i];
		form.addEventListener("submit", function (event){
			if(mrValidateForm(this))
			{
				$("#div-modal").modal({show: true});
				event.preventDefault();
				form.reset();
			}
		});
	}
	// END DIPLAY MODAL WHEN THE FORM IS VALID
	
	
	// COPY CODE TO CLIPBOARD
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();   
	});
            
	let buttonsCopyClipboard = document.querySelectorAll(".btn-copy-clipboard");

	for(button of buttonsCopyClipboard)
	{
		button.onclick =  function(){

			//GET PARENT NODE .code-panel
			function getCodePanel(element)
			{
				if(element.tagName != "BODY" && element.tagName != "HTML")
				{
					if(!element.classList.contains("code-panel"))
					{
						return getCodePanel(element.parentNode);
					}
					return element;
				}
				return undefined;
			}
			let codePanel = getCodePanel(this);

			if(codePanel != undefined){
				let code = codePanel.getElementsByTagName("PRE")[0].textContent;
				if(copyClipboard(code)){
					this.setAttribute("data-original-title", "Copied!")
					$(this).tooltip('show');
				}	else{	
					this.setAttribute("data-original-title", "Unable to Copy!")
					$(this).tooltip('show');
				}			
			}   else
			{
				this.setAttribute("data-original-title", "Unable to Copy!")
				$(this).tooltip('show');
			}
		}

		button.onmouseout = function(){
			$(this).tooltip('hide');
			this.setAttribute("data-original-title", "Copy to clipboard");
		}
	}

	// FUNCTION TO COPY TEXT TO THE CLIPBOARD
	function copyClipboard(text){
		try {
			navigator.clipboard.writeText(text);
			return true;
		} catch (error) {
			try {
				let textareaClipboad = document.createElement("TEXTAREA");
				textareaClipboad.setAttribute("id","textarea-clipboad");
				textareaClipboad.setAttribute("id","textarea-clipboad");
				let textareaClipboadValue = document.createTextNode(text);
				textareaClipboad.appendChild(textareaClipboadValue);
				document.body.appendChild(textareaClipboad);

				textareaClipboad = document.getElementById("textarea-clipboad");
				textareaClipboad.select();
				document.execCommand("copy");
				document.body.removeChild(textareaClipboad);
				return true;
			} catch (error) {
				return false;
			}
		}
	}
	// END COPY TEXT TO CLIPBOARD
	
});