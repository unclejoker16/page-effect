(function () {
	var Sidebar = function (eId, closeBarId) {
		this.state = 'opened';
		this.el = document.getElementById(eId || 'sideBar');
		this.closeBarEl = document.getElementById(closeBarId || 'closeBar');
		this.menubar = new Menubar();
		var self = this;
		this.el.addEventListener('click', function (event) {
			if(event.target !== self.el){
				self.triggerSwitch();
			}
		})
	}
	Sidebar.prototype.close = function () {
		console.log('关闭sidebar');
		this.state = 'closed';
		this.el.style.left = '0';
		this.closeBarEl.style.left = '0';
		this.el.className = 'sidebar-move-left';
		this.closeBarEl.className = 'closebar-move-right';
		
		this.menubar.currentOpenedMemuContent.style.left = '35px';
		this.menubar.currentOpenedMemuContent.style.top = '0';
		this.menubar.currentOpenedMemuContent.className = 'nav-content';
		this.menubar.currentOpenedMemuContent.classList.add('menuContent-move-left');
	}
	Sidebar.prototype.open = function () {
		console.log('打开sidebar');	
		this.state = 'opened';
		this.el.style.left = '-35px';
		this.closeBarEl.style.left = '70px';
		this.el.className = 'sidebar-move-right';
		this.closeBarEl.className = 'closebar-move-left';
	}
	Sidebar.prototype.triggerSwitch = function () {
		if (this.state === 'opened') {
			this.close();
		} else {
			this.open();
		}
	}
	
	var Menubar = function () {
		this.el = document.querySelector('#sideBar ul');
		this.state = 'allClosed';
		this.el.addEventListener('click', function (event) {
			//阻止事件冒泡
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}

		});
		this.currentOpenedMemuContent = null;
		var self = this;
		this.menuList = document.querySelectorAll('#sideBar ul > li');
		for (var i = 0; i < this.menuList.length; i++) {
			this.menuList[i].addEventListener('click', function (event) {
				var menuContentEl = document.getElementById(event.currentTarget.id + "-content");
				//？？？
				if (self.state == 'allClosed') {
					console.log('打开' + menuContentEl.id);
					menuContentEl.style.left = '-100px';
					menuContentEl.style.top = '0';
					menuContentEl.classList.className = 'nav-content';
					menuContentEl.classList.add('menuContent-move-right');
					self.state = 'hasOpened';
					self.currentOpenedMemuContent = menuContentEl;
				} else {
					console.log('关闭' + self.currentOpenedMemuContent.id);
					console.log('打开' + menuContentEl.id);
					self.currentOpenedMemuContent.style.left = '35px';
					self.currentOpenedMemuContent.style.top = '0';
					self.currentOpenedMemuContent.className = 'nav-content';
					self.currentOpenedMemuContent.classList.add('menuContent-move-left');
					menuContentEl.className = 'nav-content';
					menuContentEl.style.left = '35px';
					menuContentEl.style.top = '250px';
					menuContentEl.classList.add('menuContent-move-up');
					self.state = 'hasOpened';
					self.currentOpenedMemuContent = menuContentEl;
				}
			});
		}
		this.menuCloseList = document.querySelectorAll('.nav-content div.nav-con-close');
		for (var i = 0; i < this.menuCloseList.length; i++) {
			this.menuCloseList[i].addEventListener('click', function (event) {
				var menuContent = event.currentTarget.parentNode;
				menuContent.style.left = '35px';
				menuContent.style.top = '0';
				menuContent.className = 'nav-content';
				menuContent.classList.add('menuContent-move-left');
				this.state = 'allClosed';
			})
		}
	}

	var sidebar = new Sidebar();

})();