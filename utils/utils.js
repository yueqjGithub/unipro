function _throttle (func, delay) { // 节流
	let run = true
	return function() {
		if (!run) {
			return // 如果开关关闭了，那就直接不执行下边的代码
		}
		run = false // 持续触发的话，run一直是false，就会停在上边的判断那里
		setTimeout(() => {
			func.apply(this, arguments)
			run = true // 定时器到时间之后，会把开关打开，我们的函数就会被执行
		}, delay)
	}
}

function _debounce(func, delay) { // 防抖
  let timeout
  return function() {
    clearTimeout(timeout) // 如果持续触发，那么就清除定时器，定时器的回调就不会执行。
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}

export {
	_throttle,
	_debounce
}