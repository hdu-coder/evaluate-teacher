(function() {
	'use strict';
	var slice = Array.prototype.slice;
	var currentSubject = -1;
	var msgbox = document.createElement('div');
	msgbox.style.cssText = "position:fixed; top: 0; left: 0;width: 100%;padding: 10px;margin: 0;background: grey;text-align:center;border: 1px solid #ccc;box-shadow: 0 0 10px black";
	document.body.appendChild(msgbox);
	
	var iframe = document.getElementsByTagName('iframe')[0];
	iframe.addEventListener('load', function listener() {
		setTimeout(function() {
			if (!score()) {
				msg('保存完成，提交打分，2秒后自动消失');
				iframe.removeEventListener('load', listener);
				submit();
				setTimeout(function() {
					document.body.removeChild(msgbox);
					msgbox = null;
				}, 2000);
				return;
			}
		}, 1000)
	})
	
	function score() {
		var fdocument = iframe.contentDocument;
		var fform = fdocument.forms[0];
		var subject = fdocument.getElementsByTagName('select')[0];
		if (subject.selectedIndex === currentSubject) return false;
		msg('提交打分：' + subject.selectedOptions[0].innerText);
		currentSubject = subject.selectedIndex;
		var selects = slice.call(fdocument.getElementsByTagName('select'), 1)
		selects.forEach(function(select, index) {
			// 这个是保证第一个选择的是B，其余选择的是A
			if (index < selects.length/10) {
				select.selectedIndex = 2;
			} else {
				select.selectedIndex = 1;
			}
		})
		fdocument.getElementById('Button1').click();
		return true;
	}
	
	function submit() {
		iframe.contentDocument.getElementById('Button2').click();
	}
	
	function msg(string) {
		msgbox.innerText = string;
	}
	
	score();
})()
