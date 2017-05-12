			function GroupAddEvent(obj ,classObj) {
				this.obj = obj;
				this.classObj = classObj;
			}

			GroupAddEvent.prototype =  {
				childNum: 0,
				// 插入时的动画添加 没写
				// event: function () {
				// 	var that = this;
				// 	this.obj.addEventListener('mousemove', function (e) {
				// 		if (e.target.nodeType === 1 && that.obj !== e.target) {
				// 			// if (!e.target.flag) {
				// 				var movebox = new that.classObj(e.target, '#0f0', 1);
				// 				movebox.init();
				// 				// e.target.flag = true;
				// 			// }
				// 		}

				// 	}, true);
				// },

				run: function () {
					var that = this;
					this.childNum = this.obj.childNodes.length;
					for (var i = 0; i < this.childNum; i++) {
						if(this.obj.childNodes[i].nodeType === 1) {
							
							var movebox = new that.classObj(this.obj.childNodes[i], '#0f0', 0.4);
								movebox.init();
						}
					}
				}
			}