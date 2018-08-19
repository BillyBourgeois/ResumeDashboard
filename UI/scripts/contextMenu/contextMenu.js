angular.module('contextMenu', []);

angular.module('contextMenu').directive('contextMenu', ['$document', '$window', function ($document, $window) {
    // Runs during compile
    return {
        restrict: 'A',
        scope: {
            disabled: '=',
            menuItems: '=',
            trigger: '=',
            ngDisabled: '=',
            removeContextMenu: '='
        },
        link: function (scope, $element, $attr) {

            var contextMenuElm,
                $contextMenuElm,
                windowWidth = window.innerWidth,
                windowHeight = window.innerHeight,
                contextMenuWidth,
                contextMenuHeight,
                contextMenuLeftPos = 0,
                contextMenuTopPos = 0,
                $w = $($window),
                caretClass = {
                    topRight: 'context-caret-top-right',
                    topLeft: 'context-caret-top-left',
                    bottomRight: 'context-caret-bottom-right',
                    bottomLeft: 'context-caret-bottom-left'
                },
                menuItems = scope.menuItems;
            function createContextMenu() {
                var fragment = document.createDocumentFragment();

                contextMenuElm = document.createElement('ul');
                $contextMenuElm = $(contextMenuElm);
                contextMenuElm.setAttribute('id', 'context-menu');
                contextMenuElm.setAttribute('class', 'custom-context-menu');

                mountContextMenu(scope.menuItems, fragment);

                contextMenuElm.appendChild(fragment);
                $contextMenuElm.on('contextmenu', function (evt) {
                    evt.preventDefault();
                });
                $contextMenuElm.on('click', function (evt) {
                    removeContextMenu();
                });
                document.body.appendChild(contextMenuElm);
                contextMenuWidth = $contextMenuElm.outerWidth(true);
                contextMenuHeight = $contextMenuElm.outerHeight(true);
            }

            function mountContextMenu(menuItems, fragment) {
                menuItems.forEach(function (_item) {
                    var li = document.createElement('li');

                    li.innerHTML = '<a>' + _item.label + ' <span class="right-caret"></span></a>';
                    if (_item.divider) {
                        addContextMenuDivider(fragment);
                    }
                    else {
                        if (_item.action && _item.active) {
                            li.addEventListener('click', function () {
                                _item.action
                                if (typeof _item.action !== 'function') return false;
                                _item.action($attr, scope, _item.data);
                                removeContextMenu();
                            }, false);
                        }
                        if (!_item.active) {
                            li.setAttribute('class', 'disabled');
                        }

                        if (_item.subItems) {
                            addSubmenuItems(_item.subItems, li)
                        }
                        fragment.appendChild(li);
                    }
                });
            }

            function addSubmenuItems(subItems, parentLi) {
                var origClass = parentLi.getAttribute('class');
                var updatedClass = origClass + ' ' + 'dropdown-submenu';
                parentLi.setAttribute('class', updatedClass)
                var ul = document.createElement('ul');
                ul.setAttribute("class", "dropdown-menu")
                mountContextMenu(subItems, ul)
                parentLi.appendChild(ul)
            }

            function addContextMenuDivider(fragment) {
                var divider = document.createElement('li');
                divider.className = 'divider'
                fragment.appendChild(divider);
            }

            /**
             * Removing context menu DOM from page.
             * @return {[type]} [description]
             */
            function removeContextMenu() {
                $('.custom-context-menu').remove();
            }
            scope.removeContextMenu = removeContextMenu;
            /**
             * Apply new css class for right positioning.
             * @param  {[type]} cssClass [description]
             * @return {[type]}          [description]
             */
            function updateCssClass(cssClass) {
                $contextMenuElm.attr('class', 'custom-context-menu dropdown-menu');
                $contextMenuElm.addClass(cssClass);
            }

            /**
             * [setMenuPosition description]
             * @param {[type]} e       [event arg for finding clicked position]
             * @param {[type]} leftPos [if menu has to be pointed to any pre-fixed element like caret or corner of box.]
             * @param {[type]} topPos  [as above but top]
             */
            function setMenuPosition(e, leftPos, topPos) {
                contextMenuLeftPos = leftPos || e.pageX;
                contextMenuTopPos = topPos - $w.scrollTop() || e.pageY - $w.scrollTop();

                if (window.innerWidth - contextMenuLeftPos < contextMenuWidth && window.innerHeight - contextMenuTopPos > contextMenuHeight) {
                    contextMenuLeftPos -= contextMenuWidth;
                    updateCssClass(caretClass.topRight);

                } else if (window.innerWidth - contextMenuLeftPos > contextMenuWidth && window.innerHeight - contextMenuTopPos > contextMenuHeight) {
                    updateCssClass(caretClass.topLeft);
                } else if (windowHeight - contextMenuTopPos < contextMenuHeight && windowWidth - contextMenuLeftPos > contextMenuWidth) {
                    contextMenuTopPos -= contextMenuHeight;
                    updateCssClass(caretClass.bottomLeft);

                } else if (windowHeight - contextMenuTopPos < contextMenuHeight && windowWidth - contextMenuLeftPos < contextMenuWidth) {
                    contextMenuTopPos -= contextMenuHeight;
                    contextMenuLeftPos -= contextMenuWidth;
                    updateCssClass(caretClass.bottomRight);
                }

                $contextMenuElm.css({
                    left: contextMenuLeftPos,
                    top: contextMenuTopPos
                }).addClass('context-caret shown');
            }

            /**
             * CONTEXT MENU
             * @param  {[type]} evt [description]
             * @return {[type]}     [description]
             */
            //$element.on('click', function (evt) {
            //    removeContextMenu();
            //    //createContextMenu();
            //});

            scope.$watch('trigger', function (evt, oldVal) {
                if (angular.isDefined(evt) && oldVal != evt && !scope.ngDisabled) {

                    removeContextMenu();
                    createContextMenu();
                    setMenuPosition(evt);

                    $w.on('click', function (e) {
                        //if (e.keyCode === 27) {
                         //   removeContextMenu();
                        
                    });

                    $w.on('keydown.dirContextMenu', function (e) {
                        if (e.keyCode === 27) {
                            removeContextMenu();
                        }
                    });
                    $window.onkeyup = function (e) {
                        if (e.keyCode === 27) {
                            removeContextMenu();
                        }
                    };
                }               
            });

            $w.on('click', function (e) {
                    removeContextMenu();                
            });

            $w.on('scroll', function (event) {
                removeContextMenu();
            });

            $w.on('resize', function () {
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;
                removeContextMenu();
            });

        }
    };
}]);