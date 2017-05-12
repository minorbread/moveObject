function Movebox(obj, bgc, opa) {
				this.obj = obj;
				this.style = obj.getBoundingClientRect();
				if (bgc && opa) {
						this.opa = opa;
						this.bgc = bgc;
				} else {
						this.opa = 0.9;
						this.bgc = '#f00';
				}
				this.bgc = bgc;
				this.opa = opa;
			}

			Movebox.prototype = {
				shadow: null,
				width: 0,
				height: 0,

				$:function(obj) {
					if(typeof(obj)=="string") {
						if(obj.indexOf("#")>=0) {
							obj=obj.replace("#","");
							if(document.getElementById(obj)) {
								return document.getElementById(obj);
							} else {
								alert("没有容器" + obj);
								return null;
							}	
						} else {
							return document.createElement(obj);
						}
					} else {
						return obj;
					}
				},

				init: function () {
					this.width = parseInt(this.getStyle(this.obj, 'width'));
					this.height = parseInt(this.getStyle(this.obj, 'height'));
					this.createShadow();
					this.mousemove(this.obj, this.width, this.height);
				},

				createShadow: function () {
					this.shadow = document.createElement('div');
					var shaDow = this.shadow;
					shaDow.className = 'shadow';
					shaDow.innerHTML = 'hiaaaaaaaaaaaaaaaaaaaa';
					shaDow.style.top = '0px';
					shaDow.style.left = '0px';
					shaDow.style.zIndex = '100';
					shaDow.style.position = 'absolute';
					shaDow.style.display = 'none';
					shaDow.style.backgroundColor = this.bgc;
					shaDow.style.opacity = this.opa;
					shaDow.style.width = this.width + 'px';
					shaDow.style.height = this.height + 'px';
					this.obj.appendChild(shaDow);
				},

				getStyle: function (obj, name) {
					if(obj.currentStyle) {
						return obj.currentStyle[name];
					} else {
						return getComputedStyle(obj, false)[name];
					}
				},

				startMove: function (obj, json, fnEnd) {
					var that = this;
					clearInterval(obj.timer);
					obj.timer = setInterval(function (){
						var bStop = true;		//假设：所有值都已经到了
						
						for(var attr in json) {
							var cur = 0;
							
							if(attr == 'opacity') {
								cur = Math.round(parseFloat(that.getStyle(obj, attr))*100);
							} else {
								cur = parseInt(that.getStyle(obj, attr));
							}
							
							var speed = (json[attr]-cur)/6;
							speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
							
							if(cur != json[attr]) {
								bStop = false;
							}
							
							if(attr == 'opacity') {
								obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
								obj.style.opacity = (cur + speed) / 100;
							} else {
								obj.style[attr] = cur + speed + 'px';
							}
						}
						
						if(bStop) {
							clearInterval(obj.timer);
							if(fnEnd) fnEnd();
						}
					}, 30);
			  },

			  mousemove: function (obj, width, height) {
			  	var that = this;
			  	obj.addEventListener('mouseenter', function (event) {
			  		event.stopPropagation();
			  		var way
			  			 ,way1
			  			 ,way2
			  			 ,w
			  			 ,h;
			  		var target = event.target;
			  		var sha = event.currentTarget.childNodes[1];
			  		var X = event.layerX;
			  		var Y = event.layerY;
			  		way = width - height;
			  		way1 = X - Y;
			  		way2 = Y + X;
			  		if (sha.style.display == 'block') {
			  			return;
			  		}
			  		sha.style.top = '0px';
			  		sha.style.left = '0px';
			  		if (way1 < 0 && way2 < height) {
			  			if ((way1 < 0 && way1 > -200) && (way2 > 100 && way2 < 300)) {
			  				if (way1 > - 100) {
				  			sha.style.left = width + 'px';
				  			} else {
				  			sha.style.left = '-' + width + 'px';
			  				}
			  			} else {
				  			sha.style.left = '-' + width + 'px';
			  			}
			  		} else if (way1 > way && way2 > width) {
			  			// console.log('hi');
			  			sha.style.left = width + 'px';
			  		} else if (way1 < way && way2 > height) {
			  			if ((way1 > height && way1 < way) && (way2 > height && way2 < way)) {
			  				sha.style.top = '-' + height + 'px';
							} else {
				  			sha.style.top = height + 'px';
							}
			  		} else {
			  				sha.style.top = '-' + height + 'px';
			  		}
			  		sha.style.display = 'block';
			  		that.startMove(sha, { top: 0, left: 0 });
			  	}, true);

			  	obj.addEventListener('mouseleave', function (event) {
			  		var sha = event.currentTarget.childNodes[1];
			  		sha.style.display = 'none';
			  	}, true);
			  }
			}
			// 实例测试
			// var movebox = new Movebox(box, '#0f0', 1);
			// movebox.init();
			// var movebox2 = new Movebox(box2, '#0f0', 0.5);
			// movebox2.init();