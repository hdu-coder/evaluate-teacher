(function() {
	'use strict';

	// 请不要问我为什么不用 jQuery 去获取代码，因为，因为，TMD正方的$选择器是自己手写的
	// 所以我也决定手写，用它的不如自己去手写，就这么简单
	var slice = Array.prototype.slice;
	var config = {
		A: 1,
		B: 2,
		C: 3,
		D: 4,
		save: 'Button1',
		submit: 'Button2',
		levels: 'BAAAAAAAAA'
	}

	// 当前科目，-1表示没有开始
	var currentSubject = -1;

	// 提示框，学过VB的一定很熟悉吧
	var msgbox = document.createElement('div');
	msgbox.style.cssText = "position:fixed; top: 0; left: 0;width: 100%;padding: 10px;margin: 0;background: grey;text-align:center;border: 1px solid #ccc;box-shadow: 0 0 10px black;z-index: 10000";
	document.body.appendChild(msgbox);

	var iframe = document.getElementsByTagName('iframe')[0];
	// 注册框架加载完成事件，这样可以保证无论加载多长时间，都可以正确的进行下一次处理
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

	/**
	 * 自动打分(score)函数
	 * @return {Boolean} 代表这次操作是否成功，失败的可能就是已经全部处理完成了
	 */
	function score() {
		var fdocument = iframe.contentDocument;
		var subject = fdocument.getElementsByTagName('select')[0];
		if (subject.selectedIndex === currentSubject) return false;
		msg('提交打分：' + subject.selectedOptions[0].innerText);
		currentSubject = subject.selectedIndex;
		var selects = slice.call(fdocument.getElementsByTagName('select'), 1)
		var column = parseInt(selects.length / 10);

		selects.forEach(function(select, index) {
			// 获取出来之后，顺序是以行，从左到右进行排列
			select.selectedIndex = config[config.levels[parseInt(index / column)]]
		})
		fdocument.getElementById(config.save).click();
		return true;
	}

	/**
	 * 获取打分等级分布
	 * 默认情况是第一个选择B，其余的选择A
	 * 用户在弹出的输入框中输入想要的打分顺序，那么将会按照每一个都这样打分
	 * @return {Boolean} false标识取消这次操作
	 */
	function level() {
		var levels;

		do {
			levels = prompt('请输入您想给老师打分的等级，一共10个字符，支持ABCD，其他均为不合法字符\n默认：第一个打B，其余9个打A\n不输入内容是选择【确定】使用默认值，选择【取消】取消此次操作');

			if (levels === null) return false;
		}while(!check(levels))

		config.levels = levels || config.levels;

		/**
		 * 检测这个是否合法
		 * @return {Boolean}
		 */
		function check(string) {
		  if (string === '') return true;
			if (string.length !== 10) return false;
			if (!/^[A-D]{10}$/.test(string)) return false;
			if (/^A{10}$/.test(string)) return false;
			return true;
		}

		return true;
	}

	// 提交函数
	function submit() {
		iframe.contentDocument.getElementById(config.submit).click();
	}

	// 消息现实函数
	function msg(string) {
		msgbox.innerText = string;
	}

	// 获取打分等级(level)分布
	if (!level()) {
		document.body.removeChild(msgbox);
		msgbox = null;
		alert('您取消了此次操作');
		return;
	}
	// 手动启动
	score();
})()
