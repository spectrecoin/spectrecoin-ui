$(function () {
    !function ($) {
        var ScrollSpy = function () {
            this.FrameworkcrollElement = "html, body";
            this.$body = $("body");
            this.setUserOS();
            this.setUserAgent();
        };
        ScrollSpy.prototype.setUserOS = function () {
            var os = "";
            if (navigator.appVersion.indexOf("Win") != -1) {
                os = "windows";
            }
            if (navigator.appVersion.indexOf("Mac") != -1) {
                os = "mac";
            }
            if (navigator.appVersion.indexOf("X11") != -1) {
                os = "unix";
            }
            if (navigator.appVersion.indexOf("Linux") != -1) {
                os = "linux";
            }
            this.$body.addClass(os);
        };
        ScrollSpy.prototype.setUserAgent = function () {
            if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
                this.$body.addClass("mobile");
            } else {
                this.$body.addClass("desktop");
                if (navigator.userAgent.match(/MSIE 9.0/)) {
                    this.$body.addClass("ie9");
                }
            }
        };
        ScrollSpy.prototype.isVisibleXs = function () {
            return !$("#pg-visible-xs").length && this.$body.append('<div id="pg-visible-xs" class="visible-xs" />'), $("#pg-visible-xs").is(":visible");
        };
        ScrollSpy.prototype.isVisibleSm = function () {
            return !$("#pg-visible-sm").length && this.$body.append('<div id="pg-visible-sm" class="visible-sm" />'), $("#pg-visible-sm").is(":visible");
        };
        ScrollSpy.prototype.isVisibleMd = function () {
            return !$("#pg-visible-md").length && this.$body.append('<div id="pg-visible-md" class="visible-md" />'), $("#pg-visible-md").is(":visible");
        };
        ScrollSpy.prototype.isVisibleLg = function () {
            return !$("#pg-visible-lg").length && this.$body.append('<div id="pg-visible-lg" class="visible-lg" />'), $("#pg-visible-lg").is(":visible");
        };
        ScrollSpy.prototype.getUserAgent = function () {
            return $("body").hasClass("mobile") ? "mobile" : "desktop";
        };
        ScrollSpy.prototype.getColor = function (color, v) {
            v = parseFloat(v) || 1;
            var $parent = $(".pg-colors").length ? $(".pg-colors") : $('<div class="pg-colors"></div>').appendTo("body");
            var body = $parent.find('[data-color="' + color + '"]').length ? $parent.find('[data-color="' + color + '"]') : $('<div class="bg-' + color + '" data-color="' + color + '"></div>').appendTo($parent);
            color = body.css("background-color");
            var o = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            var getColor = "rgba(" + o[1] + ", " + o[2] + ", " + o[3] + ", " + v + ")";
            return getColor;
        };
        ScrollSpy.prototype.initSidebar = function () {
            $('[data-framework="sidebar"]').each(function () {
                var $menu = $(this);
                $menu.sidebar($menu.data());
            });
        };
        ScrollSpy.prototype.initDropDown = function () {
            $(".dropdown-default").each(function () {
                var context = $(this).find(".dropdown-menu").siblings(".dropdown-toggle");
                var offset = 0;
                var width = (context.actual("innerWidth") - context.actual("width"), $(this).find(".dropdown-menu").actual("outerWidth"));
                if (context.actual("outerWidth") < width) {
                    context.width(width - offset);
                    $(this).find(".dropdown-menu").width(context.actual("outerWidth"));
                } else {
                    $(this).find(".dropdown-menu").width(context.actual("outerWidth"));
                }
            });
        };
        ScrollSpy.prototype.initFormGroupDefault = function () {
            $(".form-group.form-group-default").click(function () {
                $(this).find("input").focus();
            });
            $("body").on("focus", ".form-group.form-group-default :input", function () {
                $(".form-group.form-group-default").removeClass("focused");
                $(this).parents(".form-group").addClass("focused");
            });
            $("body").on("blur", ".form-group.form-group-default :input", function () {
                $(this).parents(".form-group").removeClass("focused");
                if ($(this).val()) {
                    $(this).closest(".form-group").find("label").addClass("fade");
                } else {
                    $(this).closest(".form-group").find("label").removeClass("fade");
                }
            });
            $(".form-group.form-group-default .checkbox, .form-group.form-group-default .radio").hover(function () {
                $(this).parents(".form-group").addClass("focused");
            }, function () {
                $(this).parents(".form-group").removeClass("focused");
            });
        };
        ScrollSpy.prototype.initView = function () {
            $('[data-navigate="view"]').on("click", function (types) {
                types.preventDefault();
                var el = $(this).attr("data-view-port");
                return null != $(this).attr("data-toggle-view") && ($(el).children().last().children(".view").hide(), $($(this).attr("data-toggle-view")).show()), $(el).toggleClass($(this).attr("data-view-animation")), false;
            });
        };
        ScrollSpy.prototype.initScrollBarPlugin = function () {
            if ($.fn.scrollbar) {
                $(".scrollable").scrollbar({
                    ignoreOverlay: false
                });
            }
        };
        ScrollSpy.prototype.init = function () {
            this.initSidebar();
            this.initDropDown();
            this.initFormGroupDefault();
            this.initScrollBarPlugin();
            this.initView();
        };
        $.Framework = new ScrollSpy;
        $.Framework.Constructor = ScrollSpy;
    }(window.jQuery), function ($window) {
        function fn(event, root) {
            if (!event) {
                return false;
            }
            var node = event.target || (event.srcElement || (event || false));
            for (; node && node != root;) {
                node = node.parentNode || false;
            }
            return node !== false;
        }

        function extend(a, b) {
            var i;
            for (i in b) {
                if (b.hasOwnProperty(i)) {
                    a[i] = b[i];
                }
            }
            return a;
        }

        function Plugin(el, options) {
            this.el = el;
            this.options = extend({}, this.options);
            extend(this.options, options);
            this._init();
        }

        function matches(element, elements) {
            var $swipe = element.matches || (element.webkitMatchesSelector || (element.mozMatchesSelector || element.msMatchesSelector));
            for (; element;) {
                if ($swipe.bind(element)(elements)) {
                    return element;
                }
                element = element.parentElement;
            }
            return false;
        }

        function _getDimensions(el) {
            return {
                left: el.getBoundingClientRect().left + $window.pageXOffset - el.ownerDocument.documentElement.clientLeft,
                top: el.getBoundingClientRect().top + $window.pageYOffset - el.ownerDocument.documentElement.clientTop
            };
        }

        function runTest(style, element) {
            element.parentNode.insertBefore(style, element.nextSibling);
        }

        Plugin.prototype.options = {
            newTab: true,
            stickyPlaceholder: true,
            container: "body",
            onChange: function (field) {
                console.log(field);
                var event = document.createEvent("HTMLEvents");
                event.initEvent("change", true, false);
                field.dispatchEvent(event);
            }
        };
        Plugin.prototype._init = function () {
            var cur = this.el.querySelector("option[selected]");
            this.hasDefaultPlaceholder = cur && cur.disabled;
            this.selectedOpt = cur || this.el.querySelector("option");
            this._createSelectEl();
            this.selOpts = [].slice.call(this.selEl.querySelectorAll("li[data-option]"));
            this.selOptsCount = this.selOpts.length;
            this.current = this.selOpts.indexOf(this.selEl.querySelector("li.cs-selected")) || -1;
            this.selPlaceholder = this.selEl.querySelector("span.cs-placeholder");
            this._initEvents();
            this.el.onchange = function () {
                var i = this.selectedIndex;
                var fmt = this.children[i].innerHTML.trim();
                console.log(fmt);
            };
        };
        Plugin.prototype._createSelectEl = function () {
            var ret = "";
            var parseNode = function (node) {
                var s = "";
                var paramString = "";
                var inner = "";
                return !node.selectedOpt || (this.foundSelected || (this.hasDefaultPlaceholder || (paramString += "cs-selected ", this.foundSelected = true))), node.getAttribute("data-class") && (paramString += node.getAttribute("data-class")), node.getAttribute("data-link") && (inner = "data-link=" + node.getAttribute("data-link")), "" !== paramString && (s = 'class="' + paramString + '" '), "<li " + s + inner + ' data-option data-value="' + node.value + '"><span>' + node.textContent + "</span></li>";
            };
            [].slice.call(this.el.children).forEach(function (node) {
                if (!node.disabled) {
                    var quick = node.tagName.toLowerCase();
                    if ("option" === quick) {
                        ret += parseNode(node);
                    } else {
                        if ("optgroup" === quick) {
                            ret += '<li class="cs-optgroup"><span>' + node.label + "</span><ul>";
                            [].slice.call(node.children).forEach(function (node) {
                                ret += parseNode(node);
                            });
                            ret += "</ul></li>";
                        }
                    }
                }
            });
            var fail = '<div class="cs-options"><ul>' + ret + "</ul></div>";
            this.selEl = document.createElement("div");
            this.selEl.className = this.el.className;
            this.selEl.tabIndex = this.el.tabIndex;
            this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + "</span>" + fail;
            this.el.parentNode.appendChild(this.selEl);
            this.selEl.appendChild(this.el);
            var div3 = document.createElement("div");
            div3.className = "cs-backdrop";
            this.selEl.appendChild(div3);
        };
        Plugin.prototype._initEvents = function () {
            var self = this;
            this.selPlaceholder.addEventListener("click", function () {
                self._toggleSelect();
            });
            this.selOpts.forEach(function (m1, task) {
                m1.addEventListener("click", function () {
                    self.current = task;
                    self._changeOption();
                    self._toggleSelect();
                });
            });
            document.addEventListener("click", function (e) {
                var el = e.target;
                if (self._isOpen()) {
                    if (el !== self.selEl) {
                        if (!fn(el, self.selEl)) {
                            self._toggleSelect();
                        }
                    }
                }
            });
            this.selEl.addEventListener("keydown", function (event) {
                var i = event.keyCode || event.which;
                switch (i) {
                    case 38:
                        event.preventDefault();
                        self._navigateOpts("prev");
                        break;
                    case 40:
                        event.preventDefault();
                        self._navigateOpts("next");
                        break;
                    case 32:
                        event.preventDefault();
                        if (self._isOpen()) {
                            if ("undefined" != typeof self.preSelCurrent) {
                                if (self.preSelCurrent !== -1) {
                                    self._changeOption();
                                }
                            }
                        }
                        self._toggleSelect();
                        break;
                    case 13:
                        event.preventDefault();
                        if (self._isOpen()) {
                            if ("undefined" != typeof self.preSelCurrent) {
                                if (self.preSelCurrent !== -1) {
                                    self._changeOption();
                                    self._toggleSelect();
                                }
                            }
                        }
                        break;
                    case 27:
                        event.preventDefault();
                        if (self._isOpen()) {
                            self._toggleSelect();
                        }
                        ;
                }
            });
        };
        Plugin.prototype._navigateOpts = function (number) {
            if (!this._isOpen()) {
                this._toggleSelect();
            }
            var value = "undefined" != typeof this.preSelCurrent && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;
            if ("prev" === number && value > 0 || "next" === number && value < this.selOptsCount - 1) {
                this.preSelCurrent = "next" === number ? value + 1 : value - 1;
                this._removeFocus();
                classie.add(this.selOpts[this.preSelCurrent], "cs-focus");
            }
        };
        Plugin.prototype._toggleSelect = function () {
            var div = this.selEl.querySelector(".cs-backdrop");
            var container = document.querySelector(this.options.container);
            var modal = container.querySelector(".dropdown-mask");
            var target = this.selEl.querySelector(".cs-options");
            var item = this.selEl.querySelector(".cs-placeholder");
            var x = item.offsetWidth;
            var value = item.offsetHeight;
            var y = target.scrollWidth;
            if (this._isOpen()) {
                if (this.current !== -1) {
                    this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
                }
                var html = this.selEl.data;
                var tbody = html.parentNode;
                runTest(this.selEl, html);
                this.selEl.removeAttribute("style");
                tbody.removeChild(html);
                this.selEl.clientHeight;
                div.style.transform = div.style.webkitTransform = div.style.MozTransform = div.style.msTransform = div.style.OTransform = "scale3d(1,1,1)";
                classie.remove(this.selEl, "cs-active");
                modal.style.display = "none";
                target.style.overflowY = "hidden";
                target.style.width = "auto";
                var activeClassName = matches(this.selEl, ".form-group");
                if (activeClassName) {
                    classie.removeClass(activeClassName, "focused");
                }
            } else {
                if (this.hasDefaultPlaceholder) {
                    if (this.options.stickyPlaceholder) {
                        this.selPlaceholder.textContent = this.selectedOpt.textContent;
                    }
                }
                if (this.selEl.parentNode.querySelector(".dropdown-placeholder")) {
                    html = this.selEl.parentNode.querySelector(".dropdown-placeholder");
                } else {
                    html = document.createElement("div");
                    classie.add(html, "dropdown-placeholder");
                    runTest(html, this.selEl);
                }
                html.style.height = value + "px";
                html.style.width = this.selEl.offsetWidth + "px";
                this.selEl.data = html;
                this.selEl.style.position = "absolute";
                var box = _getDimensions(this.selEl);
                this.selEl.style.left = box.left + "px";
                this.selEl.style.top = box.top + "px";
                container.appendChild(this.selEl);
                var maxHeight = target.offsetHeight;
                var iHeight = item.offsetHeight;
                var b = (target.offsetWidth, item.offsetWidth, maxHeight / iHeight);
                div.style.transform = div.style.webkitTransform = div.style.MozTransform = div.style.msTransform = div.style.OTransform = "scale3d(1, " + b + ", 1)";
                if (!modal) {
                    modal = document.createElement("div");
                    classie.add(modal, "dropdown-mask");
                    container.appendChild(modal);
                }
                modal.style.display = "block";
                classie.add(this.selEl, "cs-active");
                var attr = x < y ? y : x;
                this.selEl.style.width = attr + "px";
                this.selEl.style.height = iHeight + "px";
                target.style.width = "100%";
                setTimeout(function () {
                    target.style.overflowY = "auto";
                }, 300);
            }
        };
        Plugin.prototype._changeOption = function () {
            if ("undefined" != typeof this.preSelCurrent) {
                if (this.preSelCurrent !== -1) {
                    this.current = this.preSelCurrent;
                    this.preSelCurrent = -1;
                }
            }
            var item = this.selOpts[this.current];
            this.selPlaceholder.textContent = item.textContent;
            this.el.value = item.getAttribute("data-value");
            var modal = this.selEl.querySelector("li.cs-selected");
            if (modal) {
                classie.remove(modal, "cs-selected");
            }
            classie.add(item, "cs-selected");
            if (item.getAttribute("data-link")) {
                if (this.options.newTab) {
                    $window.open(item.getAttribute("data-link"), "_blank");
                } else {
                    $window.location = item.getAttribute("data-link");
                }
            }
            this.options.onChange(this.el);
        };
        Plugin.prototype._isOpen = function (dataAndEvents) {
            return classie.has(this.selEl, "cs-active");
        };
        Plugin.prototype._removeFocus = function (dataAndEvents) {
            var modal = this.selEl.querySelector("li.cs-focus");
            if (modal) {
                classie.remove(modal, "cs-focus");
            }
        };
        $window.SelectFx = Plugin;
    }(window), function ($) {
        function initialize(arg) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data("pg.quickview");
                var encoding = "object" == typeof arg && arg;
                if (!data) {
                    $this.data("pg.quickview", data = new postLink(this, encoding));
                }
                if ("string" == typeof arg) {
                    data[arg]();
                }
            });
        }

        var postLink = function (element, options) {
            this.$element = $(element);
            this.options = $.extend(true, {}, $.fn.quickview.defaults, options);
            this.bezierEasing = [0.05, 0.74, 0.27, 0.99];
            var connection = this;
            $(this.options.notes).on("click", ".list > ul > li", function (dataAndEvents) {
                var yearCont = $(this).find(".note-preview");
                yearCont = $(this).find(".note-preview");
                $(connection.options.noteEditor).html(yearCont.html());
                $(connection.options.notes).toggleClass("push");
            });
            $(this.options.notes).on("click", ".list > ul > li .checkbox", function (event) {
                event.stopPropagation();
            });
            $(this.options.notes).on("click", connection.options.backButton, function (dataAndEvents) {
                $(connection.options.notes).find(".toolbar > li > a").removeClass("active");
                $(connection.options.notes).toggleClass("push");
            });
            $(this.options.deleteNoteButton).click(function (types) {
                types.preventDefault();
                $(this).toggleClass("selected");
                $(connection.options.notes).find(".list > ul > li .checkbox").fadeToggle("fast");
                $(connection.options.deleteNoteConfirmButton).fadeToggle("fast").removeClass("hide");
            });
            $(this.options.newNoteButton).click(function (types) {
                types.preventDefault();
                $(connection.options.noteEditor).html("");
            });
            $(this.options.deleteNoteConfirmButton).click(function () {
                var cursor = $(connection.options.notes).find("input[type=checkbox]:checked");
                cursor.each(function () {
                    $(this).parents("li").remove();
                });
            });
            $(this.options.notes).on("click", ".toolbar > li > a", function (dataAndEvents) {
                var action = $(this).attr("data-action");
                document.execCommand(action, false, null);
                $(this).toggleClass("active");
            });
        };
        postLink.VERSION = "1.0.0";
        var quickview = $.fn.quickview;
        $.fn.quickview = initialize;
        $.fn.quickview.Constructor = postLink;
        $.fn.quickview.defaults = {
            notes: "#note-views",
            alerts: "#alerts",
            notesList: ".list",
            noteEditor: ".quick-note-editor",
            deleteNoteButton: ".delete-note-link",
            deleteNoteConfirmButton: ".btn-remove-notes",
            newNoteButton: ".new-note-link",
            backButton: ".close-note-link"
        };
        $.fn.quickview.noConflict = function () {
            return $.fn.quickview = quickview, this;
        };
        $(window).on("load", function () {
            $('[data-framework="quickview"]').each(function () {
                var $spy = $(this);
                $spy.quickview($spy.data());
            });
        });
        $(document).on("click.pg.quickview.data-api touchstart", '[data-toggle="quickview"]', function (types) {
            var item = $(this).attr("data-toggle-element");
            if (Modernizr.csstransitions) {
                var onComplete = this.click.bind(this);
                var finish = function (e) {
                    return e = e || event, !!$.contains($(item)[0], e.target) || ($(document).off(e), void onComplete());
                };
                if ($(item).toggleClass("open").hasClass("open")) {
                    $(document).on("click.pg.quickview.hide", finish);
                } else {
                    $(document).off("click.pg.quickview.hide");
                }
            } else {
                var gu = $(item).width();
                if ($(item).hasClass("open-ie")) {
                    $(item).stop().animate({
                        right: 0
                    }, 400, $.bez([0.05, 0.74, 0.27, 0.99]), function () {
                        $(item).removeClass("open-ie");
                    });
                } else {
                    $(item).stop().animate({
                        right: -1 * gu
                    }, 400, $.bez([0.05, 0.74, 0.27, 0.99]), function () {
                        $(item).addClass("open-ie");
                    });
                }
            }
            types.preventDefault();
        });
    }(window.jQuery), function ($) {
        function initialize(arg) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data("pg.sidebar");
                var encoding = "object" == typeof arg && arg;
                if (!data) {
                    $this.data("pg.sidebar", data = new init(this, encoding));
                }
                if ("string" == typeof arg) {
                    data[arg]();
                }
            });
        }

        var waitForFinalEvent = function () {
            var b = {};
            return function (c, d, a) {
                a || (a = "I am a banana!");
                b[a] && clearTimeout(b[a]);
                b[a] = setTimeout(c, d)
            }
        }();
        $(window).load(function() {
            var fullDateString = new Date();
            $(window).resize(function () {
                if (!document.hidden) {
                    waitForFinalEvent(function () {
                        if ($.Framework.isVisibleLg()) {
                            $('body').addClass("menu-pin");
                            $("#sidebar-header").removeClass("sidebar-header-hidden");
                            $("#sidebar-header-collapsed").removeClass("sidebar-header-collapsed-visible");
                        } else {
                            $('body').removeClass("menu-pin");
                            if (!$("body").hasClass("sidebar-visible")) {
                                $("#sidebar-header").addClass("sidebar-header-hidden");
                                $("#sidebar-header-collapsed").addClass("sidebar-header-collapsed-visible");
                            }
                        }
                        ;
                    }, 200, fullDateString.getTime());
                }
            });
        });



        var init = function (element, options) {
            function showSidebar(ui) {
                return (void ($(".close-sidebar").data("clicked") || (that.$body.hasClass("menu-pin") || (that.cssAnimation ? (that.$element.css({
                    transform: that.menuOpenCSS
                }), that.$body.addClass("sidebar-visible"), $("#sidebar-header-collapsed").removeClass("sidebar-header-collapsed-visible"), $("#sidebar-header").removeClass("sidebar-header-hidden")) : that.$element.stop().animate({
                    left: "0px"
                }, 400, $.bez(that.bezierEasing), function () {
                    that.$body.addClass("sidebar-visible");
                    $("#sidebar-header").removeClass("sidebar-header-hidden");
                    $("#sidebar-header-collapsed").removeClass("sidebar-header-collapsed-visible");
                })))));
            }

            window.fixArticleShownMenuItemTimeout = undefined;
            function hideSidebar(ev) {
                if ("undefined" != typeof ev) {
                    var $tabsLinks = $(ev.target);
                    if ($tabsLinks.parent(".page-sidebar").length) {
                        return;
                    }
                }
                // Make sure that the menu item which corresponds to the shown article is shown
                clearTimeout(window.fixArticleShownMenuItemTimeout);
                window.fixArticleShownMenuItemTimeout = setTimeout(function () {
                    let visibleArticle = $("article:visible").attr('id');
                    let $menuitem = $(".sidebar-menu a[href$='" + visibleArticle + "']");
                    let $menugroup = $menuitem.parent().parent(".sub-menu");

                    if (!$menuitem.parent().hasClass('open')) {
                        $menuitem.trigger("click");
                    }
                    else if($menugroup.length > 0 && !$menugroup.parent().hasClass('open')) {
                        $menugroup.prev().trigger("click")
                    }
                }, 10);
                if (!that.$body.hasClass("menu-pin")) {
                    if ($(".sidebar-overlay-slide").hasClass("show")) {
                        $(".sidebar-overlay-slide").removeClass("show");
                        $("[data-framework-toggle']").removeClass("active");
                    }
                    if (that.cssAnimation) {
                        that.$element.css({
                            transform: that.menuClosedCSS
                        });
                        that.$body.removeClass("sidebar-visible");
                        $("#sidebar-header").addClass("sidebar-header-hidden");
                        $("#sidebar-header-collapsed").addClass("sidebar-header-collapsed-visible");
                    } else {
                        that.$element.stop().animate({
                            left: "-" + that.sideBarWidthCondensed + "px"
                        }, 400, $.bez(that.bezierEasing), function () {
                            that.$body.removeClass("sidebar-visible");
                            $("#sidebar-header").addClass("sidebar-header-hidden");
                            $("#sidebar-header-collapsed").addClass("sidebar-header-collapsed-visible");
                            setTimeout(function () {
                                $(".close-sidebar").data({
                                    clicked: false
                                });
                            }, 100);
                        });
                    }
                }
            }

            if (this.$element = $(element), this.options = $.extend(true, {}, $.fn.sidebar.defaults, options), this.bezierEasing = [0.05, 0.74, 0.27, 0.99], this.cssAnimation = true, this.menuClosedCSS, this.menuOpenCSS, this.css3d = true, this.sideBarWidth = 280, this.sideBarWidthCondensed = 210, this.$sidebarMenu = this.$element.find(".sidebar-menu > ul"), this.$pageContainer = $(this.options.pageContainer), this.$body = $("body"), this.$sidebarHeader = $(".sidebar-header"), this.$sidebarHeaderCollapsed = $(".sidebar-header-collapsed"), this.$sidebarMenu.length) {
                if ("desktop" == $.Framework.getUserAgent()) {
                    this.$sidebarMenu.scrollbar({
                        ignoreOverlay: false
                    });
                }
                if (!Modernizr.csstransitions) {
                    this.cssAnimation = false;
                }
                if (!Modernizr.csstransforms3d) {
                    this.css3d = false;
                }
                this.menuOpenCSS = 1 == this.css3d ? "translate3d(" + this.sideBarWidthCondensed + "px, 0,0)" : "translate(" + this.sideBarWidthCondensed + "px, 0)";
                this.menuClosedCSS = 1 == this.css3d ? "translate3d(0, 0,0)" : "translate(0, 0)";
                $("body").on("click", ".sidebar-menu a", function (dataAndEvents) {
                    var target = $(this).parent().children(".sub-menu");
                    // Case submenu group clicked
                    if ($(this).parent().children(".sub-menu").length > 0) {
                        if (target.is(":visible")) {
                            // Close the cicked submenu
                            $(".arrow", $(this)).removeClass("open");
                            $(this).parent().removeClass("open");
                            target.slideUp(200, function () {
                                $(this).parent().removeClass("active");
                            });
                        } else {
                            // Close other opened submenus
                            let $otherOpenMenu = $(this).parent().siblings("li.open");
                            $otherOpenMenu.children("a").children(".arrow").removeClass("open active");
                            $otherOpenMenu.removeClass("open");
                            $otherOpenMenu.children(".sub-menu").slideUp(200, function () {
                                $(this).removeClass("active");
                            });
                            // Open the clicked submenu
                            $(".arrow", $(this)).addClass("open");
                            $(this).parent().addClass("open");
                            target.slideDown(200, function () {
                            });
                        }
                    }
                    // Case action clicked
                    else {
                        // get submenu of this action if available
                        let $submenu = $(this).parent().parent('.sub-menu');
                        let $otherMenus;
                        // this action is nested in a submenu
                        if ($submenu.length > 0) {
                            $otherMenus = $(this).parent().parent().parent().siblings("li");
                            // close other menu items in this submenu
                            $(this).parent().siblings("li.open").removeClass('open active');
                            // make sure the corresponding submenu is opened
                            $submenu.parent().addClass("open");
                            if (!$submenu.is(":visible")) {
                                $submenu.slideDown(200, function () {
                                });
                            }
                        }
                        else {
                            $otherMenus = $(this).parent().siblings("li");
                        }
                        // close all other menus and remove selected items in it
                        $($otherMenus).filter('.open').children(".sub-menu").slideUp(200, function () {
                            $(this).removeClass("active");
                        });
                        $('.open', $otherMenus).removeClass('open selected');
                        $otherMenus.removeClass('open selected active');

                        // make this item opened
                        $(this).parent().addClass("open");
                    }
                });
                $(".sidebar-slide-toggle").on("click touchend", function (types) {
                    types.preventDefault();
                    $(this).toggleClass("active");
                    var disclosure = $(this).attr("data-framework-toggle");
                    if (null != disclosure) {
                        $(disclosure).toggleClass("show");
                    }
                });
                var that = this;
                this.$element.bind("mouseenter", showSidebar);
                this.$element.bind("mouseleave", hideSidebar);
                this.$pageContainer.bind("mouseenter", hideSidebar);
                this.$sidebarHeaderCollapsed.bind("click", showSidebar);
                this.$sidebarHeader.bind("click", hideSidebar);
            }
        };
        init.prototype.toggleSidebar = function (e) {
            var tref;
            var light_color = $("body").css("background-color");
            $(".page-container").css("background-color", light_color);
            if (this.$body.hasClass("sidebar-open")) {
                this.$body.removeClass("sidebar-open");
                tref = setTimeout(function () {
                    this.$element.removeClass("visible");
                }.bind(this), 400);
            } else {
                clearTimeout(tref);
                this.$element.addClass("visible");
                setTimeout(function () {
                    this.$body.addClass("sidebar-open");
                }.bind(this), 10);
                setTimeout(function () {
                    $(".page-container").css({
                        "background-color": ""
                    });
                }, 1E3);
            }
        };
        init.prototype.togglePinSidebar = function (date) {
            if ("hide" == date) {
                this.$body.removeClass("menu-pin");
            } else {
                if ("show" == date) {
                    this.$body.addClass("menu-pin");
                } else {
                    this.$body.toggleClass("menu-pin");
                }
            }
        };
        var sidebar = $.fn.sidebar;
        $.fn.sidebar = initialize;
        $.fn.sidebar.Constructor = init;
        $.fn.sidebar.defaults = {
            pageContainer: ".page-container"
        };
        $.fn.sidebar.noConflict = function () {
            return $.fn.sidebar = sidebar, this;
        };
        $(document).on("click.pg.sidebar.data-api", '[data-toggle-pin="sidebar"]', function (types) {
            types.preventDefault();
            var browserEvent = ($(this), $('[data-framework="sidebar"]'));
            return browserEvent.data("pg.sidebar").togglePinSidebar(), false;
        });
        $(document).on("click.pg.sidebar.data-api touchstart", '[data-toggle="sidebar"]', function (types) {
            types.preventDefault();
            var browserEvent = ($(this), $('[data-framework="sidebar"]'));
            return browserEvent.data("pg.sidebar").toggleSidebar(), false;
        });
    }(window.jQuery), function ($window) {
        if ("undefined" == typeof angular) {
            $window.Framework.init();
        }
    }(window.jQuery);
});