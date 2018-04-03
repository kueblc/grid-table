/* draw.js
 * by kueblc 2018
 */

function DrawingContext( contentArea ){
	var element, x, y

	function getMouseRelative( element, event ){
		var bound = element.getBoundingClientRect()
		var x = event.clientX - bound.left + element.offsetLeft,
			y = event.clientY - bound.top + element.offsetTop
		return { x: x, y: y }
	}

	function snapTo( position, unit ){
		position.x = Math.round( position.x / unit ) * unit
		position.y = Math.round( position.y / unit ) * unit
	}

	function setRectangle( element, x1, y1, x2, y2 ){
		var x = Math.min( x1, x2 ),
			y = Math.min( y1, y2 ),
			w = Math.abs( x1 -x2 ),
			h = Math.abs( y1 -y2 )
		element.style.left = x + 'px'
		element.style.top = y + 'px'
		element.style.width = w + 'px'
		element.style.height = h + 'px'
	}

	function startDrawing( event ){
		element = document.createElement('div')
		element.classList.add('drawing')
		var mouse = getMouseRelative( contentArea, event )
		snapTo( mouse, 16 )
		x = mouse.x
		y = mouse.y
		setRectangle( element, x, y, x, y )
		contentArea.appendChild( element )
	}

	function updateDrawing( event ){
		if( !element ) return
		var mouse = getMouseRelative( contentArea, event )
		snapTo( mouse, 16 )
		var x2 = mouse.x,
			y2 = mouse.y
		setRectangle( element, x, y, x2, y2 )
	}

	function stopDrawing( event ){
		element = null
	}

	contentArea.addEventListener( 'mousedown', startDrawing )
	contentArea.addEventListener( 'mousemove', updateDrawing )
	contentArea.addEventListener( 'mouseup', stopDrawing )
	contentArea.addEventListener( 'mouseleave', stopDrawing )
}

window.onload = function setup() {
	var contentArea = document.querySelector('.content'),
		context = new DrawingContext( contentArea )
}

